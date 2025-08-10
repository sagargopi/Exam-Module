# 🎓 Exam Taking Application

A full-stack exam-taking application built with Next.js and MongoDB, featuring JWT authentication, timed exams, and result display.


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
- npm, yarn, or pnpm package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sagargopi/Exam-Module.git
   cd Exam-Module
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```text
app/
├── api/
│   ├── auth/
│   │   ├── login/route.ts
│   │   ├── register/route.ts
│   │   └── verify/route.ts
│   └── exam/
│       ├── questions/route.ts
│       └── submit/route.ts
├── auth/
│   ├── login/page.tsx
│   └── register/page.tsx
├── dashboard/page.tsx
├── exam/page.tsx
├── results/page.tsx
└── page.tsx
lib/
└── mongodb.ts
models/
└── User.ts
components/ui/
```

## 🔑 Key Features

### 🗄️ MongoDB Integration
- Mongoose ODM for user schema validation
- Connection pooling and caching
- Proper error handling for database operations
- User persistence

### 🔐 JWT Authentication
- Secure token-based authentication
- Password hashing with bcrypt (12 rounds)
- Token verification middleware
- Protected routes and API endpoints

### 📝 Exam System
- 20 hardcoded technical questions
- 30-minute timer with auto-submit
- Question navigation (Next/Previous)
- Progress tracking and answer persistence
- Real-time score calculation

### 📊 Result Display
- Immediate score calculation after submission
- Percentage score display
- Question-wise breakdown with correct/incorrect answers
- Visual progress indicators

## 🔒 Security Features

- Password hashing with bcrypt (12 rounds)
- JWT token expiration (24 hours)
- Protected API routes with token verification
- Input validation and sanitization
- MongoDB injection prevention

## 🌐 API Reference

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with credentials
- `GET /api/auth/verify` - Verify authentication token

### Exam
- `GET /api/exam/questions` - Get randomized exam questions
- `POST /api/exam/submit` - Submit exam answers and get results

### Example API Usage

**Register a new user:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Get Questions (requires token):**
```bash
curl -X GET http://localhost:3000/api/exam/questions \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🚀 Deployment (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
4. Deploy automatically

## Acknowledgments

- Built with Next.js and MongoDB
- Styled with Tailwind CSS and shadcn/ui
- Icons by Lucide React
