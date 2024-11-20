const path = require("path");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const monogoSanitize = require("express-mongo-sanitize");
const bodyParser = require("body-parser");
const cors = require("cors");

const globalErrorMiddleware = require("./middlewares/globalErrorMiddleware");
const routes = require("./routes");

const app = express();

// GLOBAL MIDDLEWARES:
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:8000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true, // True for https
  })
);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/xwww-form-urlencoded

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serving static files
app.use(helmet()); // Set security HTTP headers

const limiter = rateLimit({
  max: 5000,
  windowMs: 60 * 60 * 5000,
  message: "Too many requests from this IP, Please try again after an hour!",
});

app.use("/api", limiter);

app.use(express.json({ limit: "50mb" }));

app.use(monogoSanitize());

app.get("/", (req, res) => res.send("Welcome to Agro-Solution..!🌿"));
app.use(routes);
app.use(globalErrorMiddleware);

module.exports = app;
