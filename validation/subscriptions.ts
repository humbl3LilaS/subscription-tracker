import { z } from "zod";
import {
    CURRENCY,
    SUBSCRIPTION_CATEGORY,
    SUBSCRIPTION_FREQUENCY,
    SUBSCRIPTION_STATUS,
} from "../constants";

export const createSubscriptionReqBody = z.object({
    name: z.string(),
    price: z.number(),
    currency: z.enum(CURRENCY),
    frequency: z.enum(SUBSCRIPTION_FREQUENCY),
    category: z.enum(SUBSCRIPTION_CATEGORY),
    status: z.enum(SUBSCRIPTION_STATUS),
    startDate: z.string(),
    renewalDate: z.string().optional(),
});
