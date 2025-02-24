import express from "express";

import { config } from "./config/env.ts";
import { authRouter } from "./routes/auth.ts";
import { usersRouter } from "./routes/users.ts";
import { subscriptionsRouter } from "./routes/subscriptions.ts";
import { connectToDB } from "./database/db.ts";
import cookieParser from "cookie-parser";
import { errorMiddleWare } from "./middlewares/error.ts";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/subscriptions", subscriptionsRouter);

app.get("/", (_req, res) => {
    res.send("Welcome to the Subscription Tracker Api");
});

// Error Handling Middleware
app.use(errorMiddleWare);

app.listen(config.env.PORT || 3000, async () => {
    console.log(`Server Listening on port http://localhost:${config.env.PORT || 3000}/`);
    await connectToDB();
});
