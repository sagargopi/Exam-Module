# LeadMasters AI - Exam Taking Application

A full-stack exam-taking application built with Next.js and MongoDB, featuring JWT authentication, timed exams, and result display.

## Features

- **User Authentication**: JWT-based registration and login system
- **MongoDB Integration**: Persistent user storage
- **Secure Exam Interface**: Randomized questions with navigation controls
- **Timer Functionality**: 30-minute countdown with auto-submit capability
- **Real-time Progress**: Question navigation and progress tracking
- **Result Display**: Score calculation and question-wise breakdown
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

- **Frontend**: React.js (Next.js 14)
- **Backend**: Node.js (Next.js API Routes)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS with shadcn/ui components

## Project Scope (As Per Requirements)

This application implements exactly what was specified in the project brief:

✅ **Required Features:**
- User registration and login with JWT authentication
- "Start Exam" interface that fetches randomized questions from backend
- Display of MCQs with options
- Navigation through questions (Next/Previous functionality)
- Countdown timer (30 minutes) with auto-submit capability
- Submit Exam functionality that calculates score
- Result display page

❌ **Excluded Features (As Requested):**
- Admin panel
- Question bank management or upload system
- Analytics or reports dashboard
- Webcam proctoring or surveillance features

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or cloud)
- npm or yarn package manager

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd leadmasters-exam-app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
Create a `.env.local` file in the root directory:
\`\`\`env

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/leadmasters-exam

JWT_SECRET=your-custom-jwt-secret-key
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

### Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/leadmasters-exam`

### MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Replace `<username>`, `<password>`, and `<cluster-url>` in your connection string

**Note**: Questions are hardcoded in the application as question bank management is excluded from the project scope.

## Usage

### Registration Flow

1. Visit the homepage and click "Register"
2. Fill in your details (name, email, password)
3. You'll be automatically logged in and redirected to the dashboard

### Taking an Exam

1. From the dashboard, click "Start Exam"
2. Answer the 20 multiple-choice questions
3. Use Next/Previous buttons to navigate
4. Monitor the 30-minute timer in the header
5. Submit manually or let it auto-submit when time expires
6. View your detailed results

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Token verification

### Exam
- `GET /api/exam/questions` - Fetch randomized questions
- `POST /api/exam/submit` - Submit exam answers and get results

## Database Models

### User Model
\`\`\`javascript
{
  name: String (required, max 50 chars),
  email: String (required, unique, valid email),
  password: String (required, min 6 chars, hashed),
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

**Note**: Question model is not used as question bank management is excluded from scope. Questions are hardcoded in the API.

## API Testing

### Using cURL

**Register a new user:**
\`\`\`bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
\`\`\`

**Login:**
\`\`\`bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
\`\`\`

**Get Questions (requires token):**
\`\`\`bash
curl -X GET http://localhost:3000/api/exam/questions \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
\`\`\`

**Submit Exam (requires token):**
\`\`\`bash
curl -X POST http://localhost:3000/api/exam/submit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"answers":{"0":1,"1":2},"questions":[...]}'
\`\`\`

## Project Structure

\`\`\`
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
\`\`\`

## Key Features Implementation

### MongoDB Integration
- Mongoose ODM for user schema validation
- Connection pooling and caching
- Proper error handling for database operations
- User persistence

### JWT Authentication
- Secure token-based authentication
- Password hashing with bcrypt (12 rounds)
- Token verification middleware
- Protected routes and API endpoints

### Exam System
- 20 hardcoded technical questions (no question bank management)
- 30-minute timer with auto-submit
- Question navigation (Next/Previous)
- Progress tracking and answer persistence
- Real-time score calculation

### Result Display
- Immediate score calculation after submission
- Percentage score display
- Question-wise breakdown with correct/incorrect answers
- Visual progress indicators

## Security Features

- Password hashing with bcrypt (12 rounds)
- JWT token expiration (24 hours)
- Protected API routes with token verification
- Input validation and sanitization
- MongoDB injection prevention

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
4. Deploy automatically

