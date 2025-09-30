import { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";


function App() {

  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({title:"", company:"", description:""});
  const [questions, setQuestions] = useState("");

  useEffect(() => {
    axios.get("/api/jobs").then(res=> setJobs(res.data));
  })
  
  const addJob = async() => {
    const res = await axios.post("api/jobs", form);
    setJobs([...jobs, res.data]);
  }

  const generateQuestions = async(desc) => {
    const res = await axios.post("api/jobs/questions", {
      description: desc
    });
    setQuestions(res.data.questions);
  }
  
  //Analytics

  const statusCounts = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {})

  const chartData = Object.keys(statusCounts).map(key => ({
    name: key, value: statusCounts[key]
  }));
  return (
      <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🚀 Job Tracker + AI Interview Prep</h1>

      {/* Add Job */}
      <div className="bg-white shadow p-4 rounded">
        <input className="border p-2 m-1" placeholder="Job Title"
               onChange={e => setForm({ ...form, title: e.target.value })}/>
        <input className="border p-2 m-1" placeholder="Company"
               onChange={e => setForm({ ...form, company: e.target.value })}/>
        <textarea className="border p-2 m-1 w-full" placeholder="Description"
                  onChange={e => setForm({ ...form, description: e.target.value })}/>
        <button onClick={addJob} className="bg-blue-600 text-white px-4 py-2 rounded mt-2">Add Job</button>
      </div>

      {/* Jobs */}
      <h2 className="text-xl font-semibold mt-6">My Applications</h2>
      {jobs.map(job => (
        <div key={job._id} className="border p-3 my-2 rounded shadow bg-gray-50">
          <h3 className="font-bold">{job.title} @ {job.company}</h3>
          <p>{job.description}</p>
          <span className="text-sm text-gray-600">Status: {job.status}</span>
          <br/>
          <button className="bg-green-600 text-white px-3 py-1 mt-2 rounded"
                  onClick={() => generateQuestions(job.description)}>
            Generate Interview Questions
          </button>
        </div>
      ))}

      {/* AI Questions */}
      {questions && (
        <div className="mt-6 bg-yellow-100 p-4 rounded">
          <h3 className="font-bold">AI Interview Questions:</h3>
          <p>{questions}</p>
        </div>
      )}

      {/* Analytics */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">📊 Application Stats</h2>
        <PieChart width={400} height={300}>
          <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={120} fill="#8884d8">
            {chartData.map((_, index) => (
              <Cell key={index} fill={["#4CAF50", "#2196F3", "#FFC107", "#F44336"][index % 4]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}

export default App;
