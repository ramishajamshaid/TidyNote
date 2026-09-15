# TidyNote

TidyNote is a full-stack notes and productivity web application designed to make creating, organizing, and managing personal notes simple and convenient.

The project was built to practice and demonstrate full-stack web development using the MERN stack, including authentication, REST APIs, database operations, and a responsive React dashboard.

## Features

* User registration and login
* JWT-based authentication
* Protected dashboard routes
* Create, read, update, and delete notes
* User-specific notes
* Favourite notes
* Trash/delete functionality
* Search notes
* Note colour customization
* Note detail and edit pages
* Responsive dashboard interface
* REST API integration
* MongoDB data storage

## Tech Stack

### Frontend

* React.js
* JavaScript
* Tailwind CSS
* React Router
* Axios
* Vite
* Lucide React

### Backend

* Node.js
* Express.js
* REST APIs
* JWT Authentication
* Mongoose
* Cloudinary

### Database

* MongoDB

### Tools

* Git
* GitHub

## Project Structure

The project is divided into separate frontend and backend applications.

```text
TidyNote/
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── ...
│
└── README.md
```

## Authentication

TidyNote uses JWT-based authentication to protect user-specific resources and dashboard routes.

Authenticated users can manage their own notes while unauthorized requests are restricted through protected routes and authentication middleware.

## Notes Management

Users can create and manage their personal notes with features including:

* Note title and description
* Custom note colours
* Favourite status
* Editing
* Deletion / trash
* Search

All notes are associated with the authenticated user and stored in MongoDB.

## API

The backend provides REST API endpoints for authentication and note management.

Example functionality includes:

```text
Authentication
- Register
- Login
- Logout
- Refresh Token

Notes
- Create Note
- Get Notes
- Update Note
- Delete Note
- Set Favourite
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MongoDB

### Clone the Repository

```bash
git clone https://github.com/ramishajamshaid/TidyNote.git
cd TidyNote
```

### Install Dependencies

Install dependencies for both the frontend and backend.

```bash
cd frontend
npm install
```

Then:

```bash
cd ../backend
npm install
```

### Environment Variables

Create `.env` files for the frontend and backend and add the required environment variables.

Do not commit your `.env` files or expose API keys, database credentials, JWT secrets, or Cloudinary credentials.

### Run the Application

Start the backend server:

```bash
npm run dev
```

Start the frontend development server:

```bash
npm run dev
```

## What I Learned

Through TidyNote, I practiced:

* Building a full-stack MERN application
* Designing and consuming REST APIs
* Implementing JWT authentication
* Working with MongoDB and Mongoose
* Building protected routes
* Implementing CRUD operations
* Managing user-specific data
* Integrating frontend and backend applications
* Creating responsive interfaces with React and Tailwind CSS
* Structuring a full-stack project

## Future Improvements

Possible future improvements include:

* Rich text editing
* Note pinning
* Sorting and filtering
* Improved search
* File or image attachments
* Better offline support
* Deployment of the complete application

## Author

**Ramisha Jamshaid**

* GitHub: https://github.com/ramishajamshaid
* LinkedIn: https://linkedin.com/in/ramisha-jamshaid-9799b5412/
