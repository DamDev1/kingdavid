import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectMongo from "@/lib/mongodb";
import User from "@/modals/userModal";
import transporter from "@/config/emailTransporter";
import getVerificationEmail from "@/emailTemplate/verificationEmail";


export async function POST(req: NextRequest) {

  try {
    await connectMongo();
    const { firstName, lastName, role, email, password } = await req.json();

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);


    // ✅ Validate input fields
    if (!firstName || !lastName || !role || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 } // 409 Conflict status
      );
    }

    // ✅ Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ send verifiction code
    await transporter.sendMail({
      from: "KingDavidAuto<kingdavidauto@gmail.com>",
      to: email,
      subject: "Verification Code",
      html: getVerificationEmail({ firstName, verificationCode }),
    })

    const newUser = new User({
      firstName,
      lastName,
      role,
      email,
      password: hashedPassword,
      verificationCode,
      verificationCodeExpires: expiresAt
    });

    await newUser.save();

    return NextResponse.json(
      {
        message: "Account created successfully",
        user: {
          id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          role: newUser.role,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error creating account:", error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500, }
    );
  }
}
