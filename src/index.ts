import express, { Request, Response } from "express";
import userRouter from "./routes/user";

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

// Routes
app.use("/users", userRouter);

// Health check
app.get("/", (req: Request, res: Response) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
