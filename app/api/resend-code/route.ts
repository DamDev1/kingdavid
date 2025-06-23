import transporter from "@/config/emailTransporter";
import getVerificationEmail from "@/emailTemplate/verificationEmail";
import connectMongo from "@/lib/mongodb";
import User from "@/modals/userModal";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){

    const {email} = await req.json();

    try {
        if(!email){
            return NextResponse.json({message:"Email is required"},{status:400});
        }

        await connectMongo();

        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({message:"User not found"},{status:400});
        }

        if(user.isVerified){
            return NextResponse.json({message:"User has been verified please login"},{status:400});
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        user.verificationCode = verificationCode;
        await user.save();

        await transporter.sendMail({
            from:"KingDavidAuto<kingdavidauto@gmail.com>",
            to:user.email,
            subject:"Verification Code",
            html:getVerificationEmail({firstName:user.firstName,verificationCode})
        })

        return NextResponse.json({message:"Verification code sent successfully"},{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Something went wrong"},{status:500});
    }
}