import mongoose, { Schema, Document, Model } from "mongoose";

interface IBuyers extends Document {
    name: string;
    email: string;
    phone?: string;
    CarImage: string;
    price: number;
}

const BuyersDetailsSchema: Schema = new Schema<IBuyers>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    CarImage: { type: String, required: true },
    price: { type: Number, required: true },
});

// Prevent OverwriteModelError
const BuyersDetails: Model<IBuyers> =
    mongoose.models.BuyersDetails || mongoose.model<IBuyers>("BuyersDetails", BuyersDetailsSchema);

export default BuyersDetails;
