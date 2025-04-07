import connectMongo from "@/lib/mongodb";
import CarListing from "@/modals/CarListing";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const car = req.nextUrl.searchParams.get("car");
    const make = req.nextUrl.searchParams.get("make");
    const minPrice = req.nextUrl.searchParams.get("minPrice");
    const maxPrice = req.nextUrl.searchParams.get("maxPrice");

    await connectMongo();

    if (!car || !make || !minPrice || !maxPrice) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const searchData = await CarListing.find({
      condition: car,
      make: make,
      sellingPrice: {
        $gte: parseFloat(minPrice),
        $lte: parseFloat(maxPrice),
      },
    });

    if (!searchData || searchData.length === 0) {
      return NextResponse.json({ message: "No listings found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Listings fetched successfully", data: searchData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 }
    );
  }
}
