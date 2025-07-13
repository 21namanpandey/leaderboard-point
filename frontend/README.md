# Leaderboard Frontend

This is the React.js frontend application for the Real-time Leaderboard. It provides a user interface to interact with the Leaderboard API, add players, claim points, and view rankings.

## Features

* **Add Players:** Form to add new users to the leaderboard.
* **Claim Points:** Interface to select a player and claim random points for them.
* **Dynamic Leaderboard:** Displays top champions and full rankings, updating in real-time as points are claimed.
* **Claim History:** Shows recent point claiming activities.
* **Layout Toggle:** Switch between a sidebar layout (controls on left, leaderboard on right) and a stacked layout (all components in a single column).
* **Responsive Design:** Adapts to different screen sizes.
* **Error Handling:** Provides visual feedback for API connection issues and operational errors.

## Technologies Used

* **React:** JavaScript library for building user interfaces.
* **TypeScript:** Typed superset of JavaScript.
* **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
* **Shadcn UI:** Re-usable components built with Radix UI and Tailwind CSS.
* **Axios:** Promise-based HTTP client for making API requests.
* **Lucide React:** Icon library.

## Getting Started

Follow these steps to get the frontend application running on your local machine.

### Prerequisites

* Node.js (LTS version recommended)
* The [Leaderboard API backend](#leaderboard-api) must be running.

### Installation

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Application

Make sure you are in the `frontend` directory.

```bash
npm run dev
# or npm start, depending on your project setup (e.g., if it's a Create React App)
```