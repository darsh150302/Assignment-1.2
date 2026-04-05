# 🚀 Code Snippet Manager

A full-stack web application that allows users to securely create, manage, and organize code snippets. The system supports user authentication, full CRUD functionality, and an admin dashboard for monitoring users and system data.

---

## 📌 Project Description

The Code Snippet Manager is designed as a real-world application that enables developers to store and manage reusable code snippets efficiently. The system follows a full-stack architecture using React for the frontend and Node.js with Express for the backend, integrated with MongoDB for data storage.

The application demonstrates core software development principles including authentication, RESTful APIs, and CRUD operations. It also includes an admin dashboard for system-level control and monitoring.

---

## ✨ Features

### 👤 User Features
- User Registration and Login (JWT Authentication)
- Create new code snippets
- View all snippets
- Edit existing snippets
- Delete snippets

### 🛠 Admin Features
- Admin dashboard access
- View total users and snippets
- Delete users and associated data
- Monitor system activity

---

## 🧱 Tech Stack

### Frontend
- React.js  
- Axios  
- CSS / Tailwind  

### Backend
- Node.js  
- Express.js  

### Database
- MongoDB (Atlas / Local)  

### Authentication
- JSON Web Tokens (JWT)  

---
## ⚙️ Installation & Setup

### 🔽 1. Clone the Repository


git clone https://github.com/your-username/codesnippet-manager.git

cd codesnippet-manager


---

## 🔧 Backend Setup

### 2. Navigate to backend folder


cd backend


### 3. Install dependencies


npm install


### 4. Create `.env` file

Create a `.env` file inside the `backend` folder and add:


MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5001
ADMIN_EMAILS=your_admin_email


---

### 5. Start Backend Server


npm run dev


Server runs on:

http://localhost:5001


---

## 🎨 Frontend Setup

### 6. Navigate to frontend folder


cd ../frontend


### 7. Install dependencies


npm install


### 8. Start Frontend


npm start


Application runs on:

http://localhost:3000


---

## 🔐 Authentication & Security

- JWT-based authentication system  
- Secure password handling  
- Protected routes for authenticated users  
- Role-based access for admin dashboard  

---

## 🔄 CRUD Functionality

The application implements full CRUD operations:

- **Create** → Add new snippets  
- **Read** → View snippets  
- **Update** → Edit snippets  
- **Delete** → Remove snippets

## 🔑 Demo Credentials
-User Login

  Email: darshupadhyay@gmail.com
  Password: 123

- Admin Login
  
  Email: admin@gmail.com
  Password: password
  
