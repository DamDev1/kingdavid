import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectMongo from "@/lib/mongodb";
import User from "@/modals/userModal";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// POST: Login API
export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Find user in the database
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "7d" });

    return NextResponse.json(
      {
        message: "Login successful",
        token,
        user: {
          id: user._id,
          email: user.email,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: "Login failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 } // Always return a 400 Bad Request for handled errors
    );
  }
}
