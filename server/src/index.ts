import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { AppDataSource } from "./db/connection";
import path from "path";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { User } from "./entities/User";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "./auth";
import cors from "cors";

(async () => {
  const PORT = 3001;
  const app = express();
  app.use(
    cors({
      origin: ["http://localhost:5173", "https://studio.apollographql.com"],
      credentials: true,
    })
  );
  app.use(cookieParser());

  try {
    await AppDataSource.initialize();
  } catch (error) {
    throw new Error(error);
  }

  // Handle refreshing token
  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.vwf_ov;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }
    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (error) {
      console.log(error);
      res.send({ ok: false, accessToken: "" });
    }
    const user = await User.findOne({ where: { id: payload.userId } });
    if (!user) {
      res.send({ ok: false, accessToken: "" });
    }
    sendRefreshToken(res, createRefreshToken(user!));
    return res.send({ ok: true, accessToken: createAccessToken(user!) });
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [path.join(__dirname, "./resolvers/*.ts")],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`GraphQL playground: http://localhost:${PORT}/graphql`);
  });
})();
