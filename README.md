# THE LAST COMMIT

> A futuristic hackathon registration platform built for developers who are ready to make their final push count.

## 🚀 Live Project

**Frontend:** https://the-last-commit.vercel.app

**Backend:** https://thelastcommit.onrender.com

**GitHub:** https://github.com/SWETHA-221107/TheLastCommit

---

## 📌 About The Project

**The Last Commit** is a full-stack hackathon website designed with a developer-focused, futuristic interface.

The platform allows participants to register for the hackathon and provides an admin portal to manage registrations and view useful participation analytics.

The website focuses on:

- Modern interactive UI
- Responsive design
- Smooth animations
- Hackathon registration
- Secure admin authentication
- Participant management
- Registration analytics
- CSV export
- MongoDB data storage

---

## ✨ Features

### 🌐 Public Website

- Futuristic developer-themed interface
- Animated hero section
- Interactive UI elements
- Responsive design
- Hackathon story and mission sections
- Timeline
- Challenge section
- FAQ
- Registration call-to-action

### 📝 Participant Registration

Participants can register by providing:

- Full Name
- Email
- Phone Number
- Year
- College
- Department
- Team Name

Registration data is stored in MongoDB.

### 🔐 Admin Portal

The admin portal provides:

- Admin username/password authentication
- JWT-based authentication
- Participant dashboard
- Total participant count
- Total team count
- Year-wise distribution
- College-wise distribution
- Participant search
- Year filtering
- CSV export
- Logout functionality

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Framer Motion
- Lucide React
- HTML
- CSS

### Backend

- Node.js
- TypeScript
- Express.js
- JWT
- bcrypt
- Mongoose

### Database

- MongoDB
- MongoDB Atlas

### Deployment

- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

---

## 📂 Project Structure

```text
TheLastCommit/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── ParticleDrift/
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Register.tsx
│   │   └── Admin.tsx
│   │
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
│
├── server/
│   ├── src/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.ts
│   │
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
├── README.md
├── prompts.md
├── package.json
└── package-lock.json