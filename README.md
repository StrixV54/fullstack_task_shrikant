# KazamNote - Task WebApp

A real-time task management application built with WebSockets, NodeJs and HTTP.

## Live Demo

🚀 [https://kaznote-wss.vercel.app/](https://kaznote-wss.vercel.app/)   (backend takes sometime to bootup)

## About

This project implements a real-time to-do list application using Node.js with WebSockets (Socket.io) and HTTP. It features:

- Adding new items to the list by sending messages with an "add" event to the WebSocket server
- Data persistence using Redis cache (stores items as a stringified Array with a specific key)
- Automatic migration of data to MongoDB when the cache exceeds 50 items
- Retrieval of all items through a RESTful HTTP endpoint (/fetchAllTasks)

## Technology Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, Socket.io
- **Database**: Redis (caching), MongoDB (persistence)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Redis server
- MongoDB instance

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/StrixV54/fullstack_task_shrikant.git
   cd kaznote_wss
   ```

2. Install dependencies
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install
   ```

3. Set up environment variables
   ```bash
   # Create .env file in root directory
   cp .env.sample .env

   # Edit .env file with your Redis and MongoDB connection details
   ```

### Running the Application


1. Start the frontend and backend development server
   ```bash
   # In the root directory
   npm run dev
   ```

2. Open your browser and visit:
   ```
   http://localhost:5173
   ```
