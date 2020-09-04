import jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { Response } from "express";

export const createAccessToken = (user: User) => {
    return jwt.sign(
        {
            userId: user.id,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email
        },
        process.env.ACCESS_TOKEN!, // process.env.JWT_TOKEN || ""
        { expiresIn: "15m" }
    );
};

export const createRefreshToken = (user: User) => {
    return jwt.sign(
        {
            userId: user.id,
            email:user.email,
            firstName:user.firstName,
            lastName:user.lastName,
            tokenVersion:user.tokenVersion
        },
        process.env.REFRESH_TOKEN!, // process.env.JWT_TOKEN || ""
        { expiresIn: "7d" }
    );
};

export const sendRefreshToken = (res: Response, token: string) => {
    res.cookie("jid", token, {
        httpOnly: true,
        path: "/refresh_token",
        secure: process.env.NODE_ENV !== "development"
    });
};
