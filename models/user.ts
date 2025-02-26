import { Schema, model, type Model } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    city: string;
    state: string;
    address: string;
    _id: string;
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
        phoneNumber: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        address: {
            type: String,
        },
    },
    { timestamps: true },
);

export const User: Model<IUser> = model<IUser>("User", UserSchema);
