import express from "express";
import { config } from "./config/env.ts";
import { authRouter } from "./routes/auth.ts";
import { usersRouter } from "./routes/users.ts";
import { subscriptionsRouter } from "./routes/subscriptions.ts";
import { connectToDB } from "./database/db.ts";

const app = express();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/subscriptions", subscriptionsRouter);

app.get("/", (_req, res) => {
    res.send("Welcome to the Subscription Tracker Api");
});

app.listen(config.env.PORT || 3000, async () => {
    console.log(`Server Listening on port http://localhost:${config.env.PORT || 3000}/`);
    await connectToDB();
});
