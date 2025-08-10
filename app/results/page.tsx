"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Home } from "lucide-react"

interface ExamResult {
  score: number
  totalQuestions: number
  percentage: number
  correctAnswers: number[]
  userAnswers: { [key: number]: number }
  questions: Array<{
    id: number
    question: string
    options: string[]
    correctAnswer: number
  }>
}

export default function ResultsPage() {
  const [result, setResult] = useState<ExamResult | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/auth/login")
      return
    }

    const examResult = localStorage.getItem("examResult")
    if (!examResult) {
      router.push("/dashboard")
      return
    }

    try {
      const parsedResult = JSON.parse(examResult)
      setResult(parsedResult)
    } catch (err) {
      router.push("/dashboard")
      return
    }

    setLoading(false)
  }, [router])

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeVariant = (percentage: number) => {
    if (percentage >= 80) return "default"
    if (percentage >= 60) return "secondary"
    return "destructive"
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-gray-600">No results found.</p>
            <Button onClick={() => router.push("/dashboard")} className="w-full mt-4">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">Exam Results</h1>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => router.push("/dashboard")}>
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Score Summary */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Your Exam Results</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="space-y-2">
              <div className={`text-6xl font-bold ${getScoreColor(result.percentage)}`}>{result.percentage}%</div>
              <p className="text-gray-600">
                You scored {result.score} out of {result.totalQuestions} questions correctly
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <Progress value={result.percentage} className="h-3" />
            </div>

            <div className="flex justify-center space-x-4">
              <Badge variant={getScoreBadgeVariant(result.percentage)} className="text-lg px-4 py-2">
                {result.percentage >= 80 ? "Excellent" : result.percentage >= 60 ? "Good" : "Needs Improvement"}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{result.score}</div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{result.totalQuestions - result.score}</div>
                <div className="text-sm text-gray-600">Incorrect</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">{result.totalQuestions}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <Card>
          <CardHeader>
            <CardTitle>Question-wise Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {result.questions.map((question, index) => {
              const userAnswer = result.userAnswers[index]
              const isCorrect = userAnswer === question.correctAnswer
              const wasAnswered = userAnswer !== undefined

              return (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-medium text-gray-900 flex-1">
                      {index + 1}. {question.question}
                    </h3>
                    <div className="ml-4">
                      {wasAnswered ? (
                        isCorrect ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : (
                          <XCircle className="h-6 w-6 text-red-600" />
                        )
                      ) : (
                        <Badge variant="outline">Not Answered</Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => {
                      let className = "p-3 rounded border text-sm "

                      if (optionIndex === question.correctAnswer) {
                        className += "border-green-500 bg-green-50 text-green-800"
                      } else if (wasAnswered && optionIndex === userAnswer && !isCorrect) {
                        className += "border-red-500 bg-red-50 text-red-800"
                      } else {
                        className += "border-gray-200 bg-gray-50 text-gray-700"
                      }

                      return (
                        <div key={optionIndex} className={className}>
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            <div className="flex space-x-2">
                              {optionIndex === question.correctAnswer && (
                                <Badge variant="outline" className="text-green-600 border-green-600">
                                  Correct
                                </Badge>
                              )}
                              {wasAnswered && optionIndex === userAnswer && (
                                <Badge variant="outline" className="text-blue-600 border-blue-600">
                                  Your Answer
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-8 text-center">
          <Button onClick={() => router.push("/dashboard")} size="lg">
            <Home className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </main>
    </div>
  )
}
