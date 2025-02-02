
import { NextResponse } from "next/server";
import User from "../../../../models/User";
import connectDB from "../../../../lib/db";

export async function POST(req) {
  try {
    const { name, email, password ,phone} = await req.json();

    if (!name || !email || !password ||!phone) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await connectDB()

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const user = new User({ name, email, password,phone });
    await user.save();

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
