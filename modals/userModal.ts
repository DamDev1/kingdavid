import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    verificationCode: string;
    isVerified: boolean;
    verificationCodeExpires: { type: Date },
}

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    verificationCode: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verificationCodeExpires: { type: Date },
})

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
