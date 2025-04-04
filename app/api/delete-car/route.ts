import CarListing from "@/modals/CarListing";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest){
    try {
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