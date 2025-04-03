import connectMongo from "@/lib/mongodb";
import CarListing from "@/modals/CarListing";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongo()
        const allCars = await CarListing.find({}).lean();
        return NextResponse.json(
            { message: "All car listings", data: allCars }, 
            { status: 200 }
        )
    } catch (error) {
        console.error("Login error:", error);

        return NextResponse.json(
            {
                message: "Failed to fetch",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 400 } // Always return a 400 Bad Request for handled errors
        );
    }
}