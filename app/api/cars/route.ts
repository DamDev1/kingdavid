import connectMongo from "@/lib/mongodb";
import CarListing from "@/modals/CarListing";
import { NextRequest, NextResponse } from "next/server";


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

export async function DELETE(req:NextRequest){
    try {
        await connectMongo()
        const carId = req.nextUrl.searchParams.get('id')

        if(!carId){
            return NextResponse.json({message:'Car id is required'}, {status: 400})
        }

        const deleteCar = await CarListing.findByIdAndDelete(carId)

        if(!deleteCar){
            return NextResponse.json({message:'Car not found'}, {status: 404})
        }

        return NextResponse.json({message:'Car deleted successfully'}, {status: 200})
    } catch (error) {
        console.error("Failed to Delete", error);

        return NextResponse.json(
            {
                message: "Failed to Delete",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 400 } // Always return a 400 Bad Request for handled errors
        );
    }
}

export async function PATCH(req: NextRequest) {
    try {
        await connectMongo();
        const carId = req.nextUrl.searchParams.get("id");

        if (!carId) {
            return NextResponse.json({ message: "Car ID is required" }, { status: 400 });
        }

        // ✅ Extract update data from request body
        const updateData = await req.json();

        // ✅ Correct usage of findByIdAndUpdate
        const updatedCar = await CarListing.findByIdAndUpdate(carId, updateData, { new: true });

        if (!updatedCar) {
            return NextResponse.json({ message: "Car not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Car updated successfully", data: updatedCar },
            { status: 200 }
        );
    } catch (error) {
        console.error("Update error:", error);

        return NextResponse.json(
            {
                message: "Failed to update car",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
