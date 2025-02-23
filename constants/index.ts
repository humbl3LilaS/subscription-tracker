export const CURRENCY = ["EUR", "GBP", "USD", "MMK"] as const;

export const SUBSCRIPTION_FREQUENCY = ["daily", "weekly", "monthly", "yearly"] as const;

export const SUBSCRIPTION_CATEGORY = [
    "sports",
    "news",
    "entertainment",
    "lifestyle",
    "technology",
    "finance",
    "politics",
    "others",
] as const;

export const SUBSCRIPTION_STATUS = ["active", "cancelled", "expired"] as const;

export type SubscriptionCurrency = (typeof CURRENCY)[number];
export type SubscriptionFrequency = (typeof SUBSCRIPTION_FREQUENCY)[number];
export type SubscriptionCategory = (typeof SUBSCRIPTION_CATEGORY)[number];
export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUS)[number];
