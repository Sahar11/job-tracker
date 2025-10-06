import express from "express";
import Job from "../models/jobs.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
// import { Parser} from "json2csv";
import dotenv from "dotenv";
import { OpenAI} from "openai";
dotenv.config();

const router = express.Router();

const openai = new OpenAI({apiKey: process.env.OPENAI_KEY});

//create job (lodggedIn-user)
router.post("/", authMiddleware, async(req, res) => {
   try {
        const job = new Job({...req.body, userId: req.user});
    await job.save();
    res.json(job);
} catch (err) {
    console.log("job creation",err)
 res.status(500).json({error: "Create Job failed"});
}
})

// Get all jobs
router.get("/", authMiddleware,async(req, res) => {
    const jobs = await Job.find({userId: req.user});
    res.json(jobs)
})

// Update jobs
router.put("/:id", authMiddleware, async(req, res) => {
  try{
    const job = await Job.findOneAndUpdate({_id: req.params.id, userId: req.user }, req.body, {new: true});
    res.json(job);
  } catch {
    res.status(500).json({error: "Update failed"});
  }
});

//Delete jobs
router.delete("/:id", authMiddleware,async (req, res) =>{
  try{
    await Job.findOneAndDelete({_id: req.params.id, userId: req.user});
    res.json({message: "Deleted"});
  } catch{
    res.status(500).json({error: "Delete failed"});
  }
} )

// Toggle this to true when you don't want to hit OpenAI
const MOCK_MODE = true;

router.post("/questions", async (req, res) => {
  try {
    if (MOCK_MODE) {
      // Fake response for testing
      return res.json({
        questions: [
          "What experience do you have with React performance optimization?",
          "How do you handle state management in complex React apps?",
          "Can you explain the difference between useMemo and useCallback?",
        ],
      });
    }

    // 🔹 Actual OpenAI code (when MOCK_MODE = false)
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates job interview questions.",
        },
        {
          role: "user",
          content: `Generate 5 interview questions for this job: ${req.body.description}`,
        },
      ],
    });

    res.json({ questions: response.choices[0].message.content.split("\n") });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate questions" });
  }
});
//Generate AT interview questions
// router.post("/questions", authMiddleware,async(req,res) => {
//     try{
//         const { description} = req.body;
        


// const response = await openai.chat.completions.create({
//   model: "gpt-4o-mini",
//   messages: [
//      {model: "gpt-4o-mini"},
//      { messages: [{ role: "user", content: "Say hello from backend" }]},
//   ]
// });
// res.json({ questions: response.choices[0].message.content });
        // const response = await openai.createChatCompletion({
        //     model: "gpt-4o-mini",
        //     messages: [
        //         {role: "system", content: "You are an interview coach."},
        //         {role: "user", content: `Generate 5 interview questions for this job ${description}`},
        //     ]
        // });
       // res.json({question: response.data.choice[0].message.content});
//     } catch(err) {
//         console.log("OPen AI", err)
//         res.status(500).json({error: "Failed to generate questions"})
//     }
// });
export default router;