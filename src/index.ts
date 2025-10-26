import express, { Request, Response } from "express";


//routes
import userRoutes from "./routes/user"; 
import productRoute from "./routes/product"; 
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
// Allow all origins (for development)
app.use(cors());

//user
app.use(userRoutes)
app.use(productRoute)


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
