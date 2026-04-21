import express from 'express';
// import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();
// app.use(cors());

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});