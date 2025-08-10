"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, ChevronLeft, ChevronRight, Flag } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

interface ExamState {
  questions: Question[]
  currentQuestion: number
  answers: { [key: number]: number }
  timeLeft: number
  isSubmitted: boolean
}

export default function ExamPage() {
  const [examState, setExamState] = useState<ExamState>({
    questions: [],
    currentQuestion: 0,
    answers: {},
    timeLeft: 30 * 60, // 30 minutes in seconds
    isSubmitted: false,
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/auth/login")
      return
    }

    // Fetch questions
    fetch("/api/exam/questions", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.questions) {
          setExamState((prev) => ({
            ...prev,
            questions: data.questions,
          }))
        }
        setLoading(false)
      })
      .catch(() => {
        router.push("/dashboard")
      })
  }, [router])

  // Timer effect
  useEffect(() => {
    if (examState.timeLeft <= 0 && !examState.isSubmitted) {
      handleSubmitExam()
      return
    }

    const timer = setInterval(() => {
      setExamState((prev) => ({
        ...prev,
        timeLeft: prev.timeLeft - 1,
      }))
    }, 1000)

    return () => clearInterval(timer)
  }, [examState.timeLeft, examState.isSubmitted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (optionIndex: number) => {
    setExamState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [prev.currentQuestion]: optionIndex,
      },
    }))
  }

  const handleNextQuestion = () => {
    if (examState.currentQuestion < examState.questions.length - 1) {
      setExamState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }))
    }
  }

  const handlePreviousQuestion = () => {
    if (examState.currentQuestion > 0) {
      setExamState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
      }))
    }
  }

  const handleSubmitExam = async () => {
    setSubmitting(true)
    const token = localStorage.getItem("token")

    try {
      const response = await fetch("/api/exam/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          answers: examState.answers,
          questions: examState.questions,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        localStorage.setItem("examResult", JSON.stringify(result))
        router.push("/results")
      }
    } catch (err) {
      console.error("Submit error:", err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (examState.questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert>
          <AlertDescription>No questions available. Please contact support.</AlertDescription>
        </Alert>
      </div>
    )
  }

  const currentQ = examState.questions[examState.currentQuestion]
  const progress = ((examState.currentQuestion + 1) / examState.questions.length) * 100
  const answeredCount = Object.keys(examState.answers).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Assessment Exam</h1>
              <Badge variant="outline">
                Question {examState.currentQuestion + 1} of {examState.questions.length}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-red-500" />
                <span className={`font-mono text-lg ${examState.timeLeft < 300 ? "text-red-500" : "text-gray-700"}`}>
                  {formatTime(examState.timeLeft)}
                </span>
              </div>
              <Button
                onClick={handleSubmitExam}
                disabled={submitting}
                variant={answeredCount === examState.questions.length ? "default" : "outline"}
              >
                <Flag className="h-4 w-4 mr-2" />
                {submitting ? "Submitting..." : "Submit Exam"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm text-gray-600">
              {answeredCount}/{examState.questions.length} answered
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                    examState.answers[examState.currentQuestion] === index
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${examState.currentQuestion}`}
                    value={index}
                    checked={examState.answers[examState.currentQuestion] === index}
                    onChange={() => handleAnswerSelect(index)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-gray-900">{option}</span>
                </label>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t">
              <Button variant="outline" onClick={handlePreviousQuestion} disabled={examState.currentQuestion === 0}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <div className="text-sm text-gray-500">
                {examState.answers[examState.currentQuestion] !== undefined ? (
                  <Badge variant="secondary">Answered</Badge>
                ) : (
                  <Badge variant="outline">Not Answered</Badge>
                )}
              </div>

              <Button
                onClick={handleNextQuestion}
                disabled={examState.currentQuestion === examState.questions.length - 1}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Question Navigation Grid */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">Question Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-10 gap-2">
              {examState.questions.map((_, index) => (
                <Button
                  key={index}
                  variant={examState.currentQuestion === index ? "default" : "outline"}
                  size="sm"
                  className={`h-10 w-10 p-0 ${
                    examState.answers[index] !== undefined
                      ? examState.currentQuestion === index
                        ? "bg-blue-600"
                        : "bg-green-100 border-green-300 text-green-700 hover:bg-green-200"
                      : ""
                  }`}
                  onClick={() => setExamState((prev) => ({ ...prev, currentQuestion: index }))}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
