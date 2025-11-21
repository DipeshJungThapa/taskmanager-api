import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { projectAPI } from "../api/projects";
import Navbar from "../components/Navbar";

export default function CreateProject() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await projectAPI.create({ title, description });
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to create project");
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <button
          onClick={() => navigate("/")}
          className="btn btn-secondary"
          style={{ marginBottom: '1.5rem' }}
        >
          ← Back to Dashboard
        </button>

        <div className="card card-wide">
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
            Create New Project
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
            Start organizing your tasks by creating a new project
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Project Title *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Website Redesign, Mobile App"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-input"
                style={{ minHeight: '120px', resize: 'vertical' }}
                placeholder="Describe what this project is about..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                Create Project
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/")}
                style={{ flex: 1 }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
