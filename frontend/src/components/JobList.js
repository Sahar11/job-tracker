import React from "react";
import axios from "axios";

export default function JobList({ jobs, setJobs, token }) {
  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/jobs/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` }});
      setJobs(prev => prev.map(j => j._id === id ? res.data : j));
    } catch { alert("Update failed"); }
  };

  const del = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`, { headers: { Authorization: `Bearer ${token}` }});
      setJobs(prev => prev.filter(j => j._id !== id));
    } catch { alert("Delete failed"); }
  };

  return (
    <div>
      <h3>Your Jobs</h3>
      {jobs.map(job => (
        <div key={job._id} className="p-3 border mb-2">
          <strong>{job.title}</strong> @ {job.company}
          <div>{new Date(job.dateApplied).toDateString()}</div>
          <div>{job.description}</div>
          <div>Status: {job.status}</div>
          <div>
            <button onClick={() => updateStatus(job._id, "Interview")}>Mark Interview</button>
            <button onClick={() => updateStatus(job._id, "Offer")}>Mark Offer</button>
            <button onClick={() => updateStatus(job._id, "Rejected")}>Mark Rejected</button>
            <button onClick={() => del(job._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
