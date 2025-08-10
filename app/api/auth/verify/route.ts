import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

const JWT_SECRET = process.env.JWT_SECRET || "leadmasters-ai-exam-app-secret-key-2024-change-in-production"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any

      // Verify user still exists in database
      const user = await User.findById(decoded.userId).select("-password")
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 401 })
      }

      return NextResponse.json({
        message: "Token is valid",
        userId: user._id.toString(),
        email: user.email,
        name: user.name,
      })
    } catch (jwtError) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }
  } catch (error) {
    console.error("Token verification error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
