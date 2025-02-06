const express = require("express");
const error = require("./middleware/error");
const commentsRouter = require("./routes/commentsRouter");
const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const app = express();

let frontend_URL;
if (process.env.NODE_ENV === "development") {
  frontend_URL = `http://localhost:5173`
  console.log("Running in development mode");
} else {
  frontend_URL = `https://amadasunslittleblog.netlify.app`
  console.log("Running in production mode");
}

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: frontend_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../client/dist")));

// API Routes
app.use("/api/comments", commentsRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);

// Routes
app.get("/", (req, res) => {
  res.send("Testing Comments API");
});
// Serve React App (for client side routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"), (err) => {
    if (err) {
      res.status(500).send("Error loading React app");
    }
  });
});

// Error Handling Middleware
app.use(error);

const port = 5000;
// Start server
let URL
if (process.env.NODE_ENV === "development") {
  URL = `http://localhost:${port}`
} else {
  URL = `https://blog-app-server-0i1w.onrender.com:${port}`
}

app.listen(port, () => {
  console.log(`Server is running on ${URL}`);
});
