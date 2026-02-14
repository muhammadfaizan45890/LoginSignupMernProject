# Login-Signup MERN Project (Advanced)

A full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** application featuring **JWT authentication**, **OTP email verification**, **password reset/change**, and **protected routes**. Designed for production-ready implementations with scalability in mind.

---

## 🌟 Features

- **User Authentication**
  - Register new users with email **OTP verification**
  - Login with **JWT token** for session management
  - Secure password storage using **bcrypt**
  - Change/reset password functionality
- **Protected Routes**
  - Certain routes accessible **only to authenticated users**
- **Email Notifications**
  - OTP for registration verification
  - Password reset notifications
- **Frontend**
  - React.js with **Axios** for API calls
  - Responsive UI and form validation
- **Backend**
  - Node.js + Express.js REST API
  - MongoDB database with **Mongoose ODM**
- **Security**
  - JWT authentication & token expiration
  - Input validation to prevent injection attacks
  - Environment variables to protect secrets
- **Optional Enhancements**
  - Role-based access control (admin/user)
  - Rate-limiting to prevent brute-force attacks

---

## 🛠️ Technologies Used

- **Frontend:** React.js, Axios, React Router DOM, Bootstrap/Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Token)
- **Security:** bcrypt.js, helmet, express-rate-limit
- **Email/OTP:** Nodemailer
- **Environment Variables:** dotenv
- **Dev Tools:** Postman, VS Code

---

## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/muhammadfaizan45890/LoginSignupMernProject.git
cd LoginSignupMernProject
