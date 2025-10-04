import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "./components/Auth";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (token) {
      axios.get("http://localhost:5000/api/jobs", { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setJobs(res.data))
        .catch(() => { /* ignore error for now */ });
    }
  }, [token]);

  const handleSetToken = (tok, userObj) => {
    localStorage.setItem("token", tok);
    localStorage.setItem("user", JSON.stringify(userObj));
    setToken(tok);
    setUser(userObj);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setJobs([]);
  };

  const downloadFile = (type) => {
    const t = localStorage.getItem("token");
    const url = `/api/jobs/export/${type}?token=${t}`;
    window.open(url, "_blank");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl mb-4">AI Job Tracker</h1>

      {!token ? (
        <Auth onLogin={handleSetToken} />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <div>Welcome, {user?.name}</div>
            <div>
              <button onClick={() => downloadFile("csv")} className="mr-2">Export CSV</button>
              <button onClick={() => downloadFile("pdf")} className="mr-2">Export PDF</button>
              <button onClick={logout}>Logout</button>
            </div>
          </div>

          <JobForm token={token} addJob={(job) => setJobs(prev => [job, ...prev])} />
          <JobList jobs={jobs} setJobs={setJobs} token={token} />
        </>
      )}
    </div>
  );
}

export default App;