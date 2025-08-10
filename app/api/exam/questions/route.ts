import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import connectDB from "@/lib/mongodb"

const JWT_SECRET = process.env.JWT_SECRET || "leadmasters-ai-exam-app-secret-key-2024-change-in-production"

// Hardcoded questions since question bank management is excluded from scope
const hardcodedQuestions = [
  {
    id: 1,
    question: "What is the correct way to create a React component?",
    options: [
      "function MyComponent() { return <div>Hello</div>; }",
      "const MyComponent = () => { return <div>Hello</div>; }",
      "class MyComponent extends React.Component { render() { return <div>Hello</div>; } }",
      "All of the above",
    ],
    correctAnswer: 3,
  },
  {
    id: 2,
    question: "Which hook is used to manage state in functional components?",
    options: ["useEffect", "useState", "useContext", "useReducer"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "What is the purpose of useEffect hook?",
    options: [
      "To manage component state",
      "To handle side effects in functional components",
      "To create context",
      "To optimize performance",
    ],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "Which method is used to update state in a class component?",
    options: [
      "this.state = newState",
      "this.setState(newState)",
      "this.updateState(newState)",
      "this.changeState(newState)",
    ],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "What is JSX?",
    options: [
      "A JavaScript library",
      "A syntax extension for JavaScript",
      "A CSS framework",
      "A database query language",
    ],
    correctAnswer: 1,
  },
  {
    id: 6,
    question: "Which of the following is NOT a valid way to pass data to a component?",
    options: ["Props", "State", "Context", "Variables"],
    correctAnswer: 3,
  },
  {
    id: 7,
    question: "What is the virtual DOM?",
    options: [
      "A copy of the real DOM kept in memory",
      "A new version of HTML",
      "A CSS framework",
      "A JavaScript library",
    ],
    correctAnswer: 0,
  },
  {
    id: 8,
    question: "Which lifecycle method is called after a component is mounted?",
    options: ["componentWillMount", "componentDidMount", "componentWillUpdate", "componentDidUpdate"],
    correctAnswer: 1,
  },
  {
    id: 9,
    question: "What is the correct way to handle events in React?",
    options: ['onclick="handleClick()"', "onClick={handleClick}", 'onClick="handleClick()"', "onCLick={handleClick()}"],
    correctAnswer: 1,
  },
  {
    id: 10,
    question: "Which of the following is used to optimize React app performance?",
    options: ["React.memo", "useMemo", "useCallback", "All of the above"],
    correctAnswer: 3,
  },
  {
    id: 11,
    question: "What is the purpose of keys in React lists?",
    options: [
      "To style list items",
      "To help React identify which items have changed",
      "To sort the list",
      "To filter the list",
    ],
    correctAnswer: 1,
  },
  {
    id: 12,
    question: "Which HTTP method is typically used to create new resources?",
    options: ["GET", "POST", "PUT", "DELETE"],
    correctAnswer: 1,
  },
  {
    id: 13,
    question: "What does REST stand for?",
    options: [
      "Representational State Transfer",
      "Remote State Transfer",
      "Relational State Transfer",
      "Reactive State Transfer",
    ],
    correctAnswer: 0,
  },
  {
    id: 14,
    question: "Which status code indicates a successful HTTP request?",
    options: ["404", "500", "200", "301"],
    correctAnswer: 2,
  },
  {
    id: 15,
    question: "What is the purpose of middleware in Express.js?",
    options: [
      "To handle database connections",
      "To execute code during the request-response cycle",
      "To render HTML templates",
      "To manage user sessions",
    ],
    correctAnswer: 1,
  },
  {
    id: 16,
    question: "Which of the following is a NoSQL database?",
    options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
    correctAnswer: 2,
  },
  {
    id: 17,
    question: "What is the purpose of JWT (JSON Web Token)?",
    options: [
      "To store user passwords",
      "To authenticate and authorize users",
      "To encrypt database connections",
      "To compress JSON data",
    ],
    correctAnswer: 1,
  },
  {
    id: 18,
    question: "Which CSS property is used to create flexbox layouts?",
    options: ["display: flex", "layout: flex", "flex: true", "flexbox: enabled"],
    correctAnswer: 0,
  },
  {
    id: 19,
    question: "What is the difference between '==' and '===' in JavaScript?",
    options: [
      "No difference",
      "'==' checks type and value, '===' checks only value",
      "'===' checks type and value, '==' checks only value",
      "'===' is faster than '=='",
    ],
    correctAnswer: 2,
  },
  {
    id: 20,
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["string", "boolean", "integer", "undefined"],
    correctAnswer: 2,
  },
]

// Function to shuffle array (Fisher-Yates algorithm)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()

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

    // Use hardcoded questions since question bank management is excluded
    const shuffledQuestions = shuffleArray(hardcodedQuestions)

    return NextResponse.json({
      questions: shuffledQuestions,
      totalQuestions: shuffledQuestions.length,
      timeLimit: 30, // 30 minutes
    })
  } catch (error) {
    console.error("Questions fetch error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
