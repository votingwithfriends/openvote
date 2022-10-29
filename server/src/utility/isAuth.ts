import { MiddlewareFn } from "type-graphql";
import { Context } from "../types/Context";
import { verify } from "jsonwebtoken";

// Auth middleware that will require users to have a valid access token
export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("Authentication Error: Not authenticated");
  }

  // Check token
  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (error) {
    throw new Error("Access token invalid");
  }

  return next();
};
