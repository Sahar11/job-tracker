import express from "express";
import mongoose from "mongoose";
import jobRoutes from "./routes/jobRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

//connect MongoDB
mongoose.connect(process.env.MONGO_URI)
   .then(() => console.log("MongoDB connected"))
   .catch(err => console.log("MongoDB error:", err));

   //Routes
 app.use("/api/auth", authRoutes);
 app.use("/api/jobs", jobRoutes)
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));