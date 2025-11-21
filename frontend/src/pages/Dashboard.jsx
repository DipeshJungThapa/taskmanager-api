import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projectAPI } from "../api/projects";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await projectAPI.list();
      const data = res.data.results || res.data;
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading projects:", err);
      setError(err.response?.data?.detail || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content">
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
            My Projects
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Manage and organize your projects
          </p>
        </div>

        {loading && <p style={{ color: 'var(--color-text-secondary)' }}>Loading...</p>}
        
        {error && (
          <div className="alert alert-error">{error}</div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="empty-state" style={{ padding: '4rem 2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📋</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              No projects yet
            </h3>
            <p style={{ marginBottom: '1.5rem' }}>Get started by creating your first project</p>
            <Link to="/projects/new" style={{ textDecoration: 'none' }}>
              <button className="btn btn-primary">+ Create Your First Project</button>
            </Link>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
            {projects.map((project) => (
              <Link key={project.id} to={`/projects/${project.id}`} style={{ textDecoration: 'none' }}>
                <div className="project-card">
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: 'var(--color-text-primary)' }}>
                    {project.title}
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', marginBottom: '1rem', lineHeight: '1.5' }}>
                    {project.description || "No description"}
                  </p>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-tertiary)' }}>
                    Created {new Date(project.created_at).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
