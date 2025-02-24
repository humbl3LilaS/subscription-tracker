import type { NextFunction, Request, Response } from "express";

export type ErrorMiddleWare = (
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
) => void;
