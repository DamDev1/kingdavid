import mongoose, { Schema, Document, Model } from "mongoose";

interface ICarListing extends Document {
    listingTitle: string;
    tagline?: string;
    originalPrice: number;
    category: string;
    condition: string;
    make: string;
    carModel: string;
    year: number;
    driveType: string;
    transmission: string;
    fuelType: string;
    mileage: number;
    engineSize?: string;
    cylinder?: number;
    color: string;
    sellingPrice: number;
    door: number;
    vin?: string;
    offerType?: string;
    listingDescription: string;
    features: string[];
}

const CarListingSchema: Schema = new Schema<ICarListing>({
    listingTitle: { type: String, required: true, trim: true },
    tagline: { type: String, trim: true, default: "" },
    originalPrice: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    condition: { type: String, required: true, trim: true },
    make: { type: String, required: true, trim: true },
    carModel: { type: String, required: true, trim: true },
    year: { 
        type: Number, 
        required: true, 
        min: 1886, 
        max: new Date().getFullYear() 
    },
    driveType: { type: String, required: true, trim: true },
    transmission: { type: String, required: true, trim: true },
    fuelType: { type: String, required: true, trim: true },
    mileage: { type: Number, required: true, min: 0 },
    engineSize: { type: String, trim: true, default: "" },
    cylinder: { type: Number, min: 1, default: 4 },
    color: { type: String, required: true, trim: true },
    sellingPrice: { type: Number, required: true, min: 0 },
    door: { type: Number, required: true, min: 1 },
    vin: { type: String, trim: true, default: "" },
    offerType: { type: String, trim: true, default: "" },
    listingDescription: { type: String, required: true, trim: true },
    features: [{ type: String, trim: true }],
});

// Prevent OverwriteModelError
const CarListing: Model<ICarListing> =
    mongoose.models.CarListing || mongoose.model<ICarListing>("CarListing", CarListingSchema);

export default CarListing;
