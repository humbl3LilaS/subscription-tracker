import { Request } from "express";
import type { IUser } from "./models/user.ts";

declare module "express-serve-static-core" {
    interface Request {
        user?: IUser;
    }
}
