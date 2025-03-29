import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICarListing extends Document {
    listingTitle: string;
    tagline: string;
    originalPrice: string;
    category: string;
    condition: string;
    make: string;
    carModel: string;
    year: string;
    driveType: string;
    transmission: string;
    fuelType: string;
    mileage: string;
    engineSize: string;
    cylinder: string;
    color: string;
    sellingPrice: string;
    door: string;
    vin: string;
    offerType: string;
    listingDescription: string;
}

const CarListingSchema: Schema = new Schema<ICarListing>({
    listingTitle: { type: String, required: true },
    tagline: { type: String },
    originalPrice: { type: String },
    category: { type: String, required: true },
    condition: { type: String, required: true },
    make: { type: String, required: true },
    carModel: { type: String, required: true },
    year: { type: String, required: true },
    driveType: { type: String, required: true },
    transmission: { type: String, required: true },
    fuelType: { type: String, required: true },
    mileage: { type: String, required: true },
    engineSize: { type: String },
    cylinder: { type: String },
    color: { type: String, required: true },
    sellingPrice: { type: String, required: true },
    door: { type: String, required: true },
    vin: { type: String },
    offerType: { type: String },
    listingDescription: { type: String, required: true },
});

// Check if model exists before defining it to prevent OverwriteModelError
const CarListing: Model<ICarListing> =
    mongoose.models.CarListing || mongoose.model<ICarListing>("CarListing", CarListingSchema);

export default CarListing;
