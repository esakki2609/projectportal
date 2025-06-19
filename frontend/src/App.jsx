import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [sortBy, setSortBy] = useState("recent");
  const [page, setPage] = useState(1);

  const fetchProjects = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/projects?sortBy=${sortBy}&page=${page}`
    );
    const data = await res.data;
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, [sortBy, page]);

  console.log(projects);

  return (
    <div className="App">
      <div className="outerBox">
        <div className="tableOutbox">
          <div className="selectbox">
            <h3 className="text">Projects</h3>
            <select
              onChange={(e) => setSortBy(e.target.value)}
              value={sortBy}
              className="select"
            >
              <option value="recent">Select Projects</option>
              <option value="category">Order by Category Name</option>
              <option value="username">Order by Username</option>
              <option value="title">Order by Project Title</option>
            </select>
          </div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Project Title</th>
                  <th>Username</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p, i) => (
                  <tr key={i}>
                    <td>{p.project_title}</td>
                    <td>{p.username}</td>
                    <td>{p.category_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="pagination">
          <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
            Prev
          </button>
          <span>{page}</span>
          <button onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default App;
