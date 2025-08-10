# 🎓 Exam Taking Application

A full-stack exam-taking application built with Next.js and MongoDB, featuring JWT authentication, timed exams, and result display.

![Exam App Preview](public/exam-preview.png) <!-- Add a preview image if available -->

## ✨ Features

- **🔐 User Authentication**: Secure JWT-based registration and login system
- **💾 MongoDB Integration**: Persistent user storage with Mongoose ODM
- **📝 Secure Exam Interface**: Randomized questions with intuitive navigation controls
- **⏱️ Timer Functionality**: 30-minute countdown with auto-submit capability
- **📊 Real-time Progress**: Visual question navigation and progress tracking
- **🏆 Result Display**: Instant score calculation with question-wise breakdown
- **📱 Responsive Design**: Seamless experience across desktop and mobile devices

## 🛠️ Technology Stack

- **Frontend**: React.js (Next.js 14)
- **Backend**: Node.js (Next.js API Routes)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context API
- **Form Handling**: React Hook Form
- **Icons**: Lucide React

## 📋 Project Scope

### ✅ Implemented Features

- User registration and login with JWT authentication
- Secure exam interface with randomized questions
- Multiple choice questions with single-select answers
- Intuitive question navigation (Previous/Next)
- 30-minute countdown timer with auto-submit
- Exam submission with score calculation
- Detailed result display with question review

### ❌ Excluded Features

- Admin dashboard
- Question bank management
- Analytics dashboard
- Webcam proctoring

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- MongoDB Atlas account or local MongoDB instance
- npm or yarn package manager

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   ├── register/route.ts
│   │   │   └── verify/route.ts
│   │   └── exam/
│   │       ├── questions/route.ts
│   │       └── submit/route.ts
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── dashboard/page.tsx
│   ├── exam/page.tsx
│   ├── results/page.tsx
│   └── page.tsx
├── lib/
│   └── mongodb.ts
├── models/
│   └── User.ts
├── components/ui/
└── README.md


## 🔑 Key Features

| Feature | Implementation Details |
|---------|----------------------|
| **MongoDB Integration** | Mongoose ODM with connection pooling, error handling, and user persistence |
| **JWT Authentication** | Secure token-based auth with bcrypt (12 rounds) and protected routes |
| **Exam System** | 20 technical questions, 30-minute timer, navigation, and progress tracking |
| **Results** | Immediate score calculation with detailed question breakdown |

## 🔒 Security Features

- 🔐 Password hashing with bcrypt (12 rounds)
- ⏱️ JWT token expiration (24 hours)
- 🛡️ Protected API routes with token verification
- ✅ Input validation and sanitization
- 🛡️ MongoDB injection prevention

## 🚀 Deployment (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
4. Deploy!

