import "reflect-metadata";
import "dotenv/config";
import { AppDataSource } from "./db/connection";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import path from "path";
import { verify } from "jsonwebtoken";
import { User } from "./entities/User";
import { sendRefreshToken } from "./utility/sendRefreshToken";
import { createAccessToken, createRefreshToken } from "./auth";
import cookieParser from "cookie-parser";
import cors from "cors";

// Load environmental variables
const PORT = process.env.SERVER_PORT;

(async () => {
  // Create Express application
  const app = express();
  app.use(
    cors({
      origin: ["http://localhost:5173", "https://studio.apollographql.com"],
      credentials: true,
    })
  );
  app.use(cookieParser());

  // Unique route to request a new refresh token
  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.vwfOV;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }
    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (error) {
      console.log(error);
      return res.send({ ok: false, accessToken: "" });
    }

    const user = await User.findOne({ where: { id: payload.userId } });
    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, createRefreshToken(user));
    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  // Connect to database
  try {
    await AppDataSource.initialize();
    console.log("Connected to MySQL Database");
  } catch (error) {
    console.log("Error with database connection");
    throw new Error(error);
  }

  // Create Apollo server
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [path.join(__dirname, "./resolvers/**/*.ts")],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  // Start Apollo server
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  // Start Express server
  app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
    console.log(`GraphQL server running on: http://localhost:${PORT}/graphql`);
  });
})();
