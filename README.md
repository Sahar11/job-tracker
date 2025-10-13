# 🧠 AI Job Tracker

## AI Job Tracker is a full-stack MERN application that helps users track their job applications, generate AI-based interview questions, and export reports in CSV or PDF format — all with secure JWT authentication.

## Built with:

⚛️ React (frontend)

🟢 Node.js + Express (backend)

🍃 MongoDB + Mongoose

🤖 OpenAI API (AI-powered features)

🚀 Features

✅ User Authentication
Register and login with secure password hashing (bcrypt + JWT).

✅ Job Tracking Dashboard
Add, edit, delete, and categorize job applications (Applied, Interview, Offer, Rejected).

✅ AI Interview Assistant
Automatically generate tailored interview questions using OpenAI based on job descriptions.

✅ Export Data
Download your job list as a CSV or PDF report.

✅ Real-Time Insights (Optional)
Easily extend the app to visualize application trends using Recharts.

🧩 Tech Stack
Layer Technology
Frontend-React, Axios, TailwindCSS
Backend-Node.js, Express
Database-MongoDB (via Mongoose)
Authentication	JWT, bcrypt
AI Features	OpenAI API
Export	json2csv, pdfkit

🗂️ Project Structure
job-tracker/
│
├── server/               # Backend
│   ├── models/
│   │   ├── User.js
│   │   └── Job.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── jobRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── server.js
│   └── .env
│
├── client/               # Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth.js
│   │   │   ├── JobForm.js
│   │   │   └── JobList.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
├── README.md
└── package.json

⚙️ Setup Instructions
1️⃣ Clone the repo
git clone https://github.com/yourusername/ai-job-tracker.git
cd ai-job-tracker

2️⃣ Install backend dependencies
cd server
npm install

3️⃣ Create .env file in /server
MONGO_URI=your_mongodb_connection_string
OPENAI_KEY=your_openai_api_key
JWT_SECRET=your_secret_key
PORT=5000

4️⃣ Run the backend
npm run dev


Make sure your MongoDB instance is running (local or Atlas).

5️⃣ Install frontend dependencies
cd ../client
npm install

6️⃣ Run the frontend
npm start


The frontend runs at http://localhost:3000
The backend runs at http://localhost:5000

Add this to /client/package.json for local proxy:

"proxy": "http://localhost:5000"

🧠 Using the App

Register or Login

Enter name, email, and password.

Add a Job

Fill out title, company, and description.

Generate AI Questions

Click “Generate AI Questions” → OpenAI suggests interview questions.

Update Status

Mark job as Interview, Offer, or Rejected.

Export

Click “Export CSV” or “Export PDF” for reports.

📡 API Endpoints Overview
Method	Endpoint	Description	Auth
POST	/api/auth/register	Register new user	❌
POST	/api/auth/login	Login user	❌
GET	/api/jobs	Get all user jobs	✅
POST	/api/jobs	Create new job	✅
PUT	/api/jobs/:id	Update job	✅
DELETE	/api/jobs/:id	Delete job	✅
POST	/api/jobs/questions	Generate interview questions	✅
GET	/api/jobs/export/csv	Export jobs as CSV	✅
GET	/api/jobs/export/pdf	Export jobs as PDF	✅

✅ = Requires Authorization: Bearer <token>

🧾 Example API Calls (for Postman or Curl)

Login

curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"test@example.com","password":"123456"}'


Add Job

curl -X POST http://localhost:5000/api/jobs \
-H "Authorization: Bearer <your_token>" \
-H "Content-Type: application/json" \
-d '{"title":"Frontend Dev","company":"ACME","description":"React & Node.js"}'


Generate AI Questions

curl -X POST http://localhost:5000/api/jobs/questions \
-H "Authorization: Bearer <your_token>" \
-H "Content-Type: application/json" \
-d '{"description":"Looking for a backend developer skilled in Node.js and MongoDB"}'

📄 Exporting Data

CSV:
[GET] /api/jobs/export/csv?token=<your_token>
→ Downloads jobs.csv

PDF:
[GET] /api/jobs/export/pdf?token=<your_token>
→ Downloads jobs.pdf

🧰 Deployment

Frontend (Vercel):

Connect your repo.

Set build command to npm run build inside client/.

Set environment variable REACT_APP_API_URL if needed.

Backend (Render / Railway / Heroku):

Set environment variables from .env.

Set Start Command: npm start

Update CORS origins to your deployed frontend domain.


🧑‍💻 Example Demo Flow

Register a new user

Login → get JWT saved in localStorage

Add a job application

Ask AI for interview questions

Export your jobs as PDF/CSV

Logout safely


🧩 Future Improvements

 Add analytics charts (e.g., status breakdown)

 Add email notifications

 Add job search integration (Indeed / LinkedIn API)

 Dark mode toggle

 Mobile-friendly UI with Tailwind


🛡️ Security Notes

Passwords are hashed using bcrypt.

Tokens are signed with JWT secret.

AI requests happen server-side — API key never exposed.

CORS is restricted in production.

💡 Inspiration

This project showcases:

MERN stack mastery (React, Node.js, MongoDB)

Secure auth flow

REST API best practices

AI integration (OpenAI)

Practical export features (CSV/PDF)

🏆 Author

Sahar

💻 Built using React, Node.js, and OpenAI

