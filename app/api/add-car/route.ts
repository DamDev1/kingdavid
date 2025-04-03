import connectMongo from "@/lib/mongodb";
import CarListing from "@/modals/CarListing";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await connectMongo(); // Ensure DB connection is established

        const reqBody = await req.json();
        
        // List required fields dynamically
        const requiredFields = [
            "listingTitle", "tagline", "originalPrice", "category", "condition",
            "make", "carModel", "year", "driveType", "transmission", "fuelType",
            "mileage", "engineSize", "cylinder", "color", "sellingPrice",
            "door", "listingDescription", "features","imageUrls"
        ];
        
        // Check for missing fields
        const missingFields = requiredFields.filter(field => !reqBody[field]);
        if (missingFields.length > 0) {
            return NextResponse.json({ error: `Missing fields: ${missingFields.join(", ")}` }, { status: 400 });
        }

        // Create a new listing
        await CarListing.create(reqBody);

        return NextResponse.json({ message: "Car added successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error adding car:", error);
        return NextResponse.json({ error: "Failed to add car" }, { status: 500 });
    }
}
