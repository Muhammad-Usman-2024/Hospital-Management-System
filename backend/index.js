import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import path from "path";
import qs from "qs";
import { errorMiddleware } from "./middlewares/error.js";
import { fileURLToPath } from "url";

// Create a __dirname equivalent in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(
  urlencoded({
    extended: true,
    parameterLimit: 1000, // limit on the number of parameters
    parse: (str) => qs.parse(str), // use qs for parsing query strings
  })
);

// Enable CORS with credentials for frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    allowedHeaders: [
      "Content-type",
      "Authorization",
      "Catch-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

// Parse cookies
app.use(cookieParser());

// Serve static files (uploaded images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api", router);

// Error handling middleware (should be last in the middleware stack)
app.use(errorMiddleware);

// Connect to database and start the server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("Database is connected.");
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err.message);
  });
