import CarListing from "@/modals/CarListing";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){ 

    try {
        const categoryName = req.nextUrl.searchParams.get('category');

        if(!categoryName){
            return NextResponse.json({message:'Category Name is required'}, {status: 400})
        }

        const categoryData = await CarListing.find({category:categoryName})

        if(!categoryData){
            return NextResponse.json({message:'Category not found'}, {status: 404})
        }

        return NextResponse.json({message:'Category Fetched Successfully', data: categoryData}, {status: 200})

    }catch (error) {
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