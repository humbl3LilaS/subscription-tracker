import type { ExpressController } from "../types/controller.types.ts";
import mongoose from "mongoose";
import { signInRequest, signUpRequest } from "../validation/auth.ts";
import { User } from "../models/user.ts";
import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/env.ts";

export const signUp: ExpressController = async (req, res, next) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const body = req.body;

        // validate the request body
        const validatedBody = signUpRequest.safeParse(body);
        if (!validatedBody.success) {
            res.status(401).json({
                success: false,
                message: "Bad Request",
            });
            return;
        }

        const { data } = validatedBody;

        // Check if the user already exists
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        // If no user already exist proceed the account creation
        // hash the password
        const hashedPassword = await hash(data.password, 10);
        const [newUser] = await User.create(
            [
                {
                    name: data.name,
                    email: data.email,
                    password: hashedPassword,
                },
            ],
            { session },
        );

        const jwtToken = jwt.sign(
            {
                userId: newUser._id,
            },
            config.env.jwt.secret!,
            {
                expiresIn: "1d",
            },
        );

        // Commit the transaction if there is no error
        await session.commitTransaction();
        await session.endSession();

        res.status(201).json({
            success: true,
            message: "User Created Successfully!",
            data: {
                token: jwtToken,
                user: newUser,
            },
        });
    } catch (error) {
        // abort the session and end the session if the transaction has error.
        await session.abortTransaction();
        await session.endSession();
        next(error);
    }
};

export const signIn: ExpressController = async (req, res, next) => {
    try {
        const body = req.body;

        //validate the request body
        const validatedBody = signInRequest.safeParse(body);
        if (!validatedBody.success) {
            res.status(401).json({
                success: false,
                message: "Bad Request",
            });
            return;
        }

        const { data } = validatedBody;

        // check if the user exist
        const user = await User.findOne({ email: data.email });
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User does not exist.",
            });
            return;
        }

        // check if the password correct
        const isPasswordCorrect = await compare(data.password, user.password);
        if (!isPasswordCorrect) {
            res.status(401).json({
                success: false,
                message: "Invalid Password.",
            });
            return;
        }

        // sign new jwt token
        const jwtToken = jwt.sign(
            {
                userId: user._id,
            },
            config.env.jwt.secret!,
            {
                expiresIn: "1d",
            },
        );

        res.status(200).json({
            success: true,
            message: "User Sign-in Successfully",
            data: {
                token: jwtToken,
                user,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const signOut: ExpressController = async (req, res) => {};
