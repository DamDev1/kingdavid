import transporter from "@/config/emailTransporter";
import getWelcomeEmail from "@/emailTemplate/welcomeEmail";
import connectMongo from "@/lib/mongodb";
import User from "@/modals/userModal";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { email, code } = await request.json();

    try {
        if (!email || !code) {
            return NextResponse.json({ message: "Email and code are required" }, { status: 400 });
        }

        await connectMongo();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        if (user.isVerified) {
            return NextResponse.json({ message: "User already verified. Please login." }, { status: 409 });
        }

        if (!user.verificationCodeExpires || new Date() > user.verificationCodeExpires.type) {
            return NextResponse.json({ message: "Verification code expired. Please request a new one." }, { status: 410 }); // 410 Gone
        }

        if (user.verificationCode !== code) {
            return NextResponse.json({ message: "Invalid code" }, { status: 400 });
        }

        user.isVerified = true;
        await user.save();

        await transporter.sendMail({
            from: "KingDavidAuto <kingdavidauto@gmail.com>",
            to: email,
            subject: "🎉 Welcome to King David Auto!",
            html: getWelcomeEmail(user.firstName),
        });

        return NextResponse.json({ message: "Verification successful", verified: true }, { status: 200 });

    } catch (error) {
        console.log("Failed to verify:", error);
        return NextResponse.json({ message: "Failed to verify" }, { status: 500 });
    }
}
