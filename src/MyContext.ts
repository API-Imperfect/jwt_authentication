import { Request, Response } from "express";

export interface MyContext {
    req: Request;
    res: Response;
    payload?: {
        userId: string;
        firstName: string;
        lastName: string;
        email: string;
    };
}
