# Leaderboard API

This is the backend API for the Real-time Leaderboard Application. It manages user data, point accumulation, and serves as the data source for the frontend.

## Features

* **User Management:** Create new players for the leaderboard.
* **Point System:** Allow users to claim random points.
* **Data Storage:** Persistent storage of user profiles and total points.

## Technologies Used

* **Node.js:** JavaScript runtime environment.
* **Express.js:** Web application framework for Node.js.
* **MongoDB:** NoSQL database for storing user data.
* **Mongoose:** ODM (Object Data Modeling) library for MongoDB and Node.js.
* **`cors`:** Node.js package for enabling Cross-Origin Resource Sharing.
* **`dotenv`:** Module to load environment variables from a `.env` file.

## Getting Started

Follow these steps to get the backend API up and running on your local machine.

### Prerequisites

* Node.js (LTS version recommended)
* MongoDB (running instance, local or cloud-based like MongoDB Atlas)

### Installation

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Environment Variables

Create a `.env` file in the `backend` directory with the following content:


* `PORT`: The port on which the server will run (e.g., 5000).
* `MONGO_URI`: Your MongoDB connection string. Replace with your actual database URI.

### Running the Server

Make sure you are in the `backend` directory.

```bash
npm run dev
```