import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { projectAPI } from "../api/projects";
import { taskAPI } from "../api/tasks";
import Navbar from "../components/Navbar";

export default function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const [projectRes, tasksRes] = await Promise.all([
        projectAPI.get(id),
        taskAPI.list({ project: id }),
      ]);
      setProject(projectRes.data);
      const taskData = tasksRes.data.results || tasksRes.data;
      setTasks(Array.isArray(taskData) ? taskData : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await taskAPI.create({
        project: id,
        title: newTaskTitle,
        description: newTaskDescription,
      });
      setNewTaskTitle("");
      setNewTaskDescription("");
      setShowCreateForm(false);
      loadData();
    } catch (err) {
      console.error(err);
      setError("Failed to create task");
    }
  };

  if (loading) return (
    <div className="page-container">
      <Navbar />
      <div className="page-content">
        <p style={{ color: 'var(--color-text-secondary)' }}>Loading...</p>
      </div>
    </div>
  );

  if (error || !project) return (
    <div className="page-container">
      <Navbar />
      <div className="page-content">
        <div className="alert alert-error">{error || "Project not found"}</div>
        <button onClick={() => navigate("/")} className="btn btn-secondary" style={{ marginTop: '1rem' }}>
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );

  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content">
        <button onClick={() => navigate("/")} className="btn btn-secondary" style={{ marginBottom: '1.5rem' }}>
          ← Back to Dashboard
        </button>

        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
            {project.title}
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            {project.description || "No description"}
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>
            Tasks
          </h2>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className={showCreateForm ? "btn btn-secondary" : "btn btn-primary"}
          >
            {showCreateForm ? "Cancel" : "+ New Task"}
          </button>
        </div>

        {showCreateForm && (
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>
              Create New Task
            </h3>
            <form onSubmit={handleCreateTask}>
              <div className="form-group">
                <label className="form-label">Task Title *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter task title"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-input"
                  style={{ minHeight: '80px', resize: 'vertical' }}
                  placeholder="Describe the task..."
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Create Task
              </button>
            </form>
          </div>
        )}

        {tasks.length === 0 ? (
          <div className="empty-state" style={{ padding: '3rem 2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              No tasks yet
            </h3>
            <p>Create your first task to get started</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {tasks.map((task) => (
              <Link key={task.id} to={`/tasks/${task.id}`} style={{ textDecoration: 'none' }}>
                <div className="project-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
                        {task.title}
                      </h3>
                      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: '1.5' }}>
                        {task.description || "No description"}
                      </p>
                    </div>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      backgroundColor: task.is_completed ? 'var(--color-success-light)' : 'var(--color-warning-light)',
                      color: task.is_completed ? '#065f46' : '#92400e',
                      whiteSpace: 'nowrap'
                    }}>
                      {task.is_completed ? "✓ Completed" : "⏳ In Progress"}
                    </span>
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
