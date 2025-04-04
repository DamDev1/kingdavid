import connectMongo from "@/lib/mongodb";
import CarListing from "@/modals/CarListing";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try {
        await connectMongo()

        const carId = req.nextUrl.searchParams.get("id");

        if (!carId) {
            return NextResponse.json({ message: "Car ID is required" }, { status: 400 });
        }
        const car = await CarListing.findById(carId);

        if (!car) {
            return NextResponse.json({ message: "Car not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Car Fetched Successful",
            data: car
        }, { status: 200 })
    } catch (error) {
        console.error("Failed to fetch", error);

        return NextResponse.json(
            {
                message: "Failed to fetch",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 400 } // Always return a 400 Bad Request for handled errors
        );
    }
}