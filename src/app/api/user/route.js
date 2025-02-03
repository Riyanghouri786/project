
import { NextResponse } from "next/server";
import User from "../../../../models/User";
import connectDB from "../../../../lib/db";

export async function GET(req) {
    try {
        await connectDB();

        const users = await User.find({});
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}