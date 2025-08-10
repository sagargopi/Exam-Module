import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "leadmasters-ai-exam-app-secret-key-2024-change-in-production"

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)

    try {
      jwt.verify(token, JWT_SECRET)
    } catch (jwtError) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    const { answers, questions } = await request.json()

    if (!answers || !questions) {
      return NextResponse.json({ message: "Invalid submission data" }, { status: 400 })
    }

    // Calculate score
    let correctCount = 0
    const correctAnswers: number[] = []

    questions.forEach((question: any, index: number) => {
      const userAnswer = answers[index]
      const correctAnswer = question.correctAnswer

      if (userAnswer === correctAnswer) {
        correctCount++
        correctAnswers.push(index)
      }
    })

    const totalQuestions = questions.length
    const percentage = Math.round((correctCount / totalQuestions) * 100)

    const result = {
      score: correctCount,
      totalQuestions,
      percentage,
      correctAnswers,
      userAnswers: answers,
      questions,
      submittedAt: new Date().toISOString(),
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Exam submission error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
