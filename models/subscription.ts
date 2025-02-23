import { type Model, model, Schema } from "mongoose";
import {
    CURRENCY,
    SUBSCRIPTION_CATEGORY,
    SUBSCRIPTION_FREQUENCY,
    SUBSCRIPTION_STATUS,
    type SubscriptionCategory,
    type SubscriptionCurrency,
    type SubscriptionFrequency,
    type SubscriptionStatus,
} from "../constants";
import type { IUser } from "./user.ts";
import { addDays } from "date-fns";

export interface ISubscription extends Document {
    name: string;
    price: number;
    currency: SubscriptionCurrency;
    frequency: SubscriptionFrequency;
    category: SubscriptionCategory;
    status: SubscriptionStatus;
    startDate: Date;
    renewalDate: Date;
    user: IUser;
}

const SubscriptionSchema = new Schema<ISubscription>(
    {
        name: {
            type: String,
            required: [true, "Subscription name is required"],
            trim: true,
            minLength: 2,
            maxlength: 100,
        },
        price: {
            type: Number,
            required: [true, "Subscription price is required"],
            min: [0, "Price must be greater than 0"],
        },
        currency: {
            type: String,
            enum: CURRENCY,
            default: "MMK",
        },
        frequency: {
            type: String,
            enum: SUBSCRIPTION_FREQUENCY,
        },
        category: {
            type: String,
            enum: SUBSCRIPTION_CATEGORY,
        },
        status: {
            type: String,
            enum: SUBSCRIPTION_STATUS,
            default: "active",
        },
        startDate: {
            type: Date,
            required: true,
            validate: {
                validator: (value) => value <= new Date(),
                message: "Start date must be in past!",
            },
        },
        renewalDate: {
            type: Date,
            required: true,
            validate: {
                validator: function (value) {
                    return value > this.startDate;
                },
                message: "Start date must be in past!",
            },
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
    },
    { timestamps: true },
);

SubscriptionSchema.pre("save", async function (next) {
    if (!this.renewalDate) {
        switch (this.frequency) {
            case "daily":
                this.renewalDate = addDays(this.startDate, 1);
                break;
            case "weekly":
                this.renewalDate = addDays(this.startDate, 7);
                break;
            case "monthly":
                this.renewalDate = addDays(this.startDate, 30);
                break;
            case "yearly":
                this.renewalDate = addDays(this.startDate, 365);
                break;
        }
    }

    if (this.renewalDate < new Date()) {
        this.status = "expired";
    }

    next();
});

export const Subscription: Model<ISubscription> = model<ISubscription>(
    "Subscription",
    SubscriptionSchema,
);
