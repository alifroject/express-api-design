import express, { Request, Response, NextFunction } from "express";
import userRoutes from "./routes/user";
import productRoute from "./routes/product";
import authRoute from "./routes/auth";
import cors from "cors";
import csurf from "csurf";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: "*", 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
}));

//CSRF middleware
const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // change to production (HTTPS)
  },
});

// Skip CSRF for specific routes
app.use((req: Request, res: Response, next: NextFunction) => {
  if (
    req.path === "/api/csrf-token" ||
    req.path === "/api/auth/login" ||
    req.path === "/api/auth/register"
  ) {
    return next(); // skip csrf 
  }
  return csrfProtection(req, res, next);
});

// endpoint to take CSRF token
app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// routes
app.use("/api/auth", authRoute);
app.use(userRoutes);
app.use(productRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
