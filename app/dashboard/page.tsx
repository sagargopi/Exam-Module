"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen } from "lucide-react"

interface DashboardUser {
  id: string
  name: string
  email: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<DashboardUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      router.push("/auth/login")
      return
    }

    try {
      setUser(JSON.parse(userData))
    } catch (err) {
      router.push("/auth/login")
      return
    }

    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/")
  }

  const startExam = () => {
    router.push("/exam")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">LeadMasters AI</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <svg
                  className="h-4 w-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm0 0v1.5a2.5 2.5 0 005 0V7a2.5 2.5 0 00-5 0zm0 10a2 2 0 100-4 2 2 0 000 4z"
                  ></path>
                </svg>
                <span className="text-sm text-gray-700">{user?.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <svg
                  className="h-4 w-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7"
                  ></path>
                </svg>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome, {user?.name}!</h2>
          <p className="text-gray-600">Ready to take your assessment? Click the button below to start your exam.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Start Exam Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span>Assessment Exam</span>
              </CardTitle>
              <CardDescription>Complete your technical assessment to showcase your skills</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">30 Minutes</Badge>
                <Badge variant="secondary">20 Questions</Badge>
                <Badge variant="secondary">Multiple Choice</Badge>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Exam Instructions:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• You have 30 minutes to complete the exam</li>
                  <li>• The exam contains 20 multiple-choice questions</li>
                  <li>• You can navigate between questions using Next/Previous buttons</li>
                  <li>• The exam will auto-submit when time expires</li>
                  <li>• Make sure you have a stable internet connection</li>
                </ul>
              </div>

              <Button onClick={startExam} size="lg" className="w-full">
                Start Exam
              </Button>
            </CardContent>
          </Card>

          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-gray-900">{user?.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-gray-900">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Ready for Exam
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
