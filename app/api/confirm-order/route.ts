import transporter from "@/config/emailTransporter";
import connectMongo from "@/lib/mongodb";
import CarListing from "@/modals/CarListing";
import User from "@/modals/userModal";
import { NextRequest, NextResponse } from "next/server";
import { generateReceiptPdf } from "@/config/generateReceipt";
import BuyersDetails from "@/modals/Buyers";
import getPurchaseConfirmationEmail from "@/emailTemplate/getPurchaseConfirmationEmail";

export async function POST(req: NextRequest) {
    const { email, carId } = await req.json();

    try {
        await connectMongo();
        if (!email || !carId) {
            return NextResponse.json({ message: "Something went wrong" }, { status: 400 });
        }

        const userDetails = await User.findOne({ email });
        const car = await CarListing.findOne({ _id: carId });

        if (!car) {
            return NextResponse.json({ message: "Car not found" }, { status: 404 });
        }

        const orderId = Math.floor(100000 + Math.random() * 900000).toString();
        const totalPrice = (car?.sellingPrice || 0) + 1000; // Fixed calculation

        // Generate PDF
        const pdfBuffer = await generateReceiptPdf({
            receiptNumber: orderId,
            buyerName: `${userDetails?.firstName} ${userDetails?.lastName}`,
            buyerEmail: email,
            carModel: car?.listingTitle,
            carYear: car?.year,
            price: car?.sellingPrice,
            taxes: 1000,
            total: totalPrice,
            purchaseDate: new Date(),
        });

        // Send email
        await transporter.sendMail({
            from: "King David Auto <kingdavidauto@gmail.com>",
            to: email,
            subject: "Order Confirmation",
            html: getPurchaseConfirmationEmail({
                firstName: userDetails?.firstName || "",
                carModel: car?.listingTitle || "",
                orderId,
                imageUrl: car?.imageUrls[0] || ""
            }),
            attachments: [{
                filename: `${car?.listingTitle || "receipt"}-${orderId}.pdf`,
                content: pdfBuffer
            }],
        });

        // Insert into carSoldDetails
        const soldCar = new BuyersDetails({
            name: userDetails?.firstName,
            email: userDetails?.email,
            CarImage: car?.imageUrls[0] ,
            price: car?.sellingPrice ,
            purchasedAt: new Date(),
        });
        await soldCar.save();

        return NextResponse.json({
            message: "Email sent successfully",
            orderId
        }, { status: 200 });

    } catch (error) {
        console.error("Failed to process order:", error);
        return NextResponse.json(
            { message: "Failed to process order", error: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
