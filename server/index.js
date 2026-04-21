import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.routes.js';


// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

//allowlist
// *
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(",") || [];

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse cookies
app.use(cookieParser());
// Use the authentication routes
app.use('/api/auth', authRoute);

// Define a simple route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the Food Delivery API');
});

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});


// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    // Connect to the database
    connectDB();
  console.log(`Server is running on port ${PORT}`);
});