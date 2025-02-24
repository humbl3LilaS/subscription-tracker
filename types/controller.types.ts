import type { NextFunction, Request, Response } from "express";

export type ExpressController = (res: Request, req: Response, next: NextFunction) => Promise<void>;
