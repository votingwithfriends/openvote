import { User } from "./entities/User";
import { sign } from "jsonwebtoken";
import { Response } from "express";

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "5m",
  });
};

export const createRefreshToken = (user: User) => {
  return sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "1d",
  });
};

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("vwf_ov", token, {
    httpOnly: true,
    path: "/refresh_token",
  });
};
