import express, { Request, Response } from "express";
import userRoutes from "./routes/user"; 

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

//user
app.use(userRoutes)


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
