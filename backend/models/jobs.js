import mongoose from "mongoose"

const jobSchema = new mongoose.Schema({
    title: String,
    company: String,
    description: String,
    status: {type: String, default: "Applied"}, //Applioed, Interview, Offer, Rejected
    dateApplied: {type: Date, default: Date.now},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
});

export default mongoose.model("Job", jobSchema);