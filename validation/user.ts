import { z } from "zod";

export const updateUserRequestBody = z.object({
    name: z.string(),
    email: z.string().email(),
    phoneNumber: z.string(),
    address: z.string(),
    state: z.string(),
    city: z.string(),
});
