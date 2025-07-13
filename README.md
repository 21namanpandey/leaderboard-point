# Real-time Leaderboard Application

This is a full-stack web application designed to demonstrate a real-time leaderboard system. It allows users to be added, claim points, and see their rankings update instantly. The project is split into a Node.js Express API backend and a React.js TypeScript frontend.

## Table of Contents

1.  [Features](#features)
2.  [Technologies Used](#technologies-used)
3.  [Project Structure](#project-structure)
4.  [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Backend Setup](#backend-setup)
    * [Frontend Setup](#frontend-setup)
    * [Running Both Applications](#running-both-applications)
5.  [Usage](#usage)

## Features

* **Player Management:** Add new players to the leaderboard.
* **Dynamic Point System:** Players can claim random points, affecting their total score and ranking.
* **Real-time Updates:** Leaderboard and rankings update dynamically.
* **Point Claim History:** A log of recent point claiming activities.
* **Flexible Layouts:** Toggle between a sidebar and a stacked layout for optimal viewing.
* **Robust Error Handling:** Clear messages for backend connectivity issues and operational errors.
* **Responsive UI:** User interface adapts to various screen sizes.

## Technologies Used

### Frontend
* **React:** For building interactive user interfaces.
* **TypeScript:** For type safety and better code quality.
* **Tailwind CSS:** Utility-first CSS framework for styling.
* **Shadcn UI:** Component library for pre-built UI elements.
* **Axios:** HTTP client for API requests.
* **Lucide React:** Icon set.

### Backend
* **Node.js:** JavaScript runtime for server-side logic.
* **Express.js:** Web framework for building the API.
* **MongoDB:** NoSQL database for data storage.
* **Mongoose:** MongoDB object modeling for Node.js.
* **`cors`:** Middleware for enabling Cross-Origin Resource Sharing.
* **`dotenv`:** For managing environment variables.

## Project Structure

.
├── backend/
│   ├── node_modules/
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── leaderboardRoutes.js
│   ├── models/
│   │   ├── User.js
│   │   └── ClaimHistory.js
│   ├── .env.example
│   ├── server.js
│   └── package.json

(Main files)
└── frontend/
├── node_modules/
├── src/
│   ├── App.tsx
│   ├── pages/
│   │   └── LeaderboardPage.tsx
│   ├── components/
│   │   ├── AddUserForm.tsx
│   │   ├── ClaimPointsForm.tsx
│   │   ├── ClaimHistoryList.tsx
│   │   ├── TopChampionsPodium.tsx
│   │   └── FullRankingsList.tsx
│   └── utils/
│       └── helpers.ts
├── public/
├── package.json
└── tailwind.config.js


## Getting Started

Follow these instructions to set up and run the entire application locally.

### Prerequisites

* **Node.js (LTS version recommended):** [Download & Install Node.js](https://nodejs.org/)
* **MongoDB:** Ensure you have a MongoDB instance running, either locally or a cloud-based service like MongoDB Atlas.

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/21namanpandey/leaderboard-point.git
    cd leaderboard-point
    ```
2.  **Navigate to the `backend` directory:**
    ```bash
    cd backend
    ```
3.  **Install backend dependencies:**
    ```bash
    npm install
    ```
4.  **Create a `.env` file:** In the `backend` directory, create a file named `.env` and add your environment variables:
    ```
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/leaderboard_db # Or your MongoDB Atlas connection string
    ```
5.  **Start the backend server:**
    ```bash
    npm run dev
    ```
    The server should start on `http://localhost:5000`.

### Frontend Setup

1.  **Open a new terminal window** (keep the backend server running in the first terminal).
2.  **Navigate to the `frontend` directory:**
    ```bash
    cd frontend
    ```
3.  **Install frontend dependencies:**
    ```bash
    npm install
    ```
4.  **Start the frontend development server:**
    ```bash
    npm run dev
    # or npm start, depending on your project setup
    ```
    The frontend application will typically open in your browser. Check your terminal for the exact URL (e.g., `http://localhost:5173` or `http://localhost:3000` or `http://localhost:8080`).

### Running Both Applications

Ensure both the backend (`npm start` in the `backend` directory) and the frontend (`npm run dev` or `npm start` in the `frontend` directory) are running simultaneously for the application to function correctly.

## Usage

Once both the backend and frontend are running:

1.  Open your browser to the frontend URL (e.g., `http://localhost:8080`).
2.  **Add New Players:** Use the form on the left/top to add players by name.
3.  **Claim Points:** Select an existing player from the dropdown and click "Claim Random Points" to increase their score.
4.  **View Leaderboard:** See the champions on the podium and the full rankings update dynamically.
5.  **Switch Layout:** Use the "Switch to [Stacked/Sidebar] Layout" button to change the display mode.
6.  **Track History:** Monitor recent point claim activities in the "Claim Point Tracking History" section.
