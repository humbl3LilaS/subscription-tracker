import { z } from "zod";

export const signUpRequest = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
});

export const signInRequest = z.object({
    email: z.string(),
    password: z.string(),
});
