import React, { useState } from "react";
import axios from "axios";

export default function JobForm({ token, addJob }) {
  const [form, setForm] = useState({ title: "", company: "", description: "" });
  const [aiQuestions, setAiQuestions] = useState("");

  const submit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/jobs", form, { headers: { Authorization: `Bearer ${token}` }});
      addJob(res.data);
      setForm({ title: "", company: "", description: "" });
    } catch (err) {
      alert("Create failed");
    }
  };

  const genQuestions = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/jobs/questions", { description: form.description }, { headers: { Authorization: `Bearer ${token}` }});
      setAiQuestions(res.data.questions);
    } catch {
      alert("AI failed");
    }
  };

  return (
    <div className="p-4 border mb-4">
      <h3>Add a job</h3>
      <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
      <input placeholder="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
      <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}></textarea>
      <div>
        <button onClick={submit}>Add Job</button>
        <button onClick={genQuestions}>Generate AI Questions</button>
      </div>
      {aiQuestions && <pre className="mt-2 bg-gray-100 p-2">{aiQuestions}</pre>}
    </div>
  );
}