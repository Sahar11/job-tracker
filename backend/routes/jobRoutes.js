import express from "express";
import Job from "../models/jobs.js";
// import { authMiddleware } from "../middleware/authMiddleware.js";
// import { Parser} from "json2csv";
import dotenv from "dotenv";

import { OpenAI} from "openai";
dotenv.config();

const router = express.Router();

const openai = new OpenAI({apiKey: process.env.OPENAI_KEY});

//create job (lodggedIn-user)
router.post("/", async(req, res) => {
    const job = new Job(req.body);
    await job.save();
    res.json(job)
})

// Get all jobs
router.get("/", async(req, res) => {
    const jobs = await Job.find();
    res.json(jobs)
})
//Generate AT interview questions
router.post("/questions", async(req,res) => {
    try{
        const { description} = req.body;
        const response = await openai.createChatCompletion({
            model: "gpt-4o-mini",
            messages: [
                {role: "system", content: "You are an interview coach."},
                {role: "user", content: `Generate 5 interview questions for this job ${description}`},
            ]
        });
        res.json({question: response.data.choice[0].message.content});
    } catch(err) {
        res.status(500).json({error: "Failed to generate questions"})
    }
});
export default router;