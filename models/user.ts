import { Schema, model, type Model } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, "User Name is required"],
            trim: true,
            minlength: 2,
            maxlength: 20,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/\S+@\S+\.\S+/, "Please fill a valid email address"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
        },
    },
    { timestamps: true },
);

export const User: Model<IUser> = model<IUser>("User", UserSchema);
