
## Usage of Each Folder

- **client/**: Contains all frontend code for the React application.  
  - **public/**: Static files served as-is.
  - **src/**: Main React source code, including pages and assets.
  - **App.jsx**: Main React component.
  - **globle.css**: Global CSS, includes TailwindCSS.
  - **main.jsx**: Entry point for React app.
  - **index.html**: HTML template for the app.
  - **vite.config.js**: Vite build tool configuration.
  - **eslint.config.js**: Linting configuration for code quality.
- **server/**: Contains all backend code for the Express API.
  - **config/**: Configuration files (e.g., database connection).
  - **controllers/**: Functions handling API logic.
  - **middleware/**: Custom Express middleware.
  - **models/**: Mongoose models for MongoDB collections.
  - **routes/**: API route definitions.
  - **utils/**: Utility/helper functions.
  - **.env**: Environment variables (not committed to version control).
  - **server.js**: Main entry point for the backend server.
- **package.json**: Project metadata and scripts.
- **README.md**: Project documentation.

---

This structure separates the frontend and backend for easier development

# ✅ Advanced To-Do List App (MERN + Vite + TailwindCSS)

An advanced, feature-rich To-Do List web application built with the **MERN stack**:
- **MongoDB**: Data storage
- **Express.js**: Backend REST API
- **React.js (with Vite)**: Frontend SPA
- **Node.js**: Server runtime
- **Tailwind CSS**: UI styling

---

## 📂 Project Structure


TODO App/
│
├── client/ # Frontend
│ ├── public/ # Static files (favicon, etc.)
│ └── src/
│ ├── assets/ # Images, icons, logos
│ ├── pages/ # Route-level pages
│ │ ├── Dashboard.jsx # Dashboard overview
│ │ ├── Login.jsx # Login page
│ │ ├── Register.jsx # Signup page
│ │ └── Task.jsx # Task management page
│ ├── App.jsx # Root component with routes
│ ├── globle.jsx # Shared state/context (typo: should be global.jsx)
│ └── main.jsx # Vite entry point
│
├── server/ # Backend
│ ├── config/ # DB connection & config
│ │ └── db.js # MongoDB connection setup
│ ├── controllers/ # Route handlers (business logic)
│ │ ├── authController.js
│ │ └── taskController.js
│ ├── middleware/ # Middlewares (e.g., JWT auth)
│ │ └── authMiddleware.js
│ ├── models/ # Mongoose schemas
│ │ ├── User.js
│ │ └── Task.js
│ ├── routes/ # API route definitions
│ │ ├── authRoutes.js
│ │ └── taskRoutes.js
│ ├── utils/ # Utility helpers
│ │ └── generateToken.js
│ ├── .env # Environment variables (do not commit)
│ └── server.js # Express app entry point



---

## 🚀 Features

- 🔐 User Authentication (Register/Login)
- 📝 Create, edit, delete tasks
- 📅 Due dates, priorities, and status updates
- 📂 Task dashboard overview
- 🗂 Filter and organize tasks
- 🌗 Dark mode toggle (optional future)
- 🔒 JWT-protected routes
- ⚡ Fast development with Vite + Tailwind CSS

---

## 🛠️ Tech Stack

| Stack       | Purpose                               |
|-------------|---------------------------------------|
| React + Vite| Modern, fast front-end development    |
| Tailwind CSS| Utility-first styling                 |
| Node.js     | Backend JavaScript runtime            |
| Express.js  | Backend REST API framework            |
| MongoDB     | Document-based NoSQL database         |
| Mongoose    | MongoDB object modeling               |
| JWT         | Secure token-based authentication     |
| bcryptjs    | Password hashing                      |

---