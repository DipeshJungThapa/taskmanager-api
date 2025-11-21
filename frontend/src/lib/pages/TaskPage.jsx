import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { taskAPI } from "../../api/tasks";
import { commentAPI } from "../../api/comments";
import { attachmentAPI } from "../../api/attachments";
import Navbar from "../../components/Navbar";

export default function TaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Comment form
  const [newComment, setNewComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  
  // Attachment form
  const [selectedFile, setSelectedFile] = useState(null);
  const [attachmentLoading, setAttachmentLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const [taskRes, commentsRes, attachmentsRes] = await Promise.all([
        taskAPI.get(id),
        commentAPI.list({ task: id }),
        attachmentAPI.list({ task: id }),
      ]);
      setTask(taskRes.data);
      const commentData = commentsRes.data.results || commentsRes.data;
      const attachmentData = attachmentsRes.data.results || attachmentsRes.data;
      setComments(Array.isArray(commentData) ? commentData : []);
      setAttachments(Array.isArray(attachmentData) ? attachmentData : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load task");
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setCommentLoading(true);
    try {
      await commentAPI.create({
        task: id,
        message: newComment,
      });
      setNewComment("");
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to add comment");
    } finally {
      setCommentLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setAttachmentLoading(true);
    try {
      const formData = new FormData();
      formData.append("task", id);
      formData.append("file", selectedFile);

      await attachmentAPI.create(formData);
      setSelectedFile(null);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to upload attachment");
    } finally {
      setAttachmentLoading(false);
    }
  };

  const toggleTaskCompletion = async () => {
    try {
      await taskAPI.update(id, { is_completed: !task.is_completed });
      setTask({ ...task, is_completed: !task.is_completed });
    } catch (err) {
      console.error(err);
      alert("Failed to update task");
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

  if (error || !task) return (
    <div className="page-container">
      <Navbar />
      <div className="page-content">
        <div className="alert alert-error">{error || "Task not found"}</div>
        <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginTop: '1rem' }}>
          ← Go Back
        </button>
      </div>
    </div>
  );

  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content">
        <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginBottom: '1.5rem' }}>
          ← Back to Project
        </button>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
                {task.title}
              </h1>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                {task.description || "No description provided"}
              </p>
            </div>
            <button
              onClick={toggleTaskCompletion}
              className={task.is_completed ? "btn btn-secondary" : "btn btn-primary"}
              style={{ whiteSpace: 'nowrap' }}
            >
              {task.is_completed ? "✓ Completed" : "Mark Complete"}
            </button>
          </div>

          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-tertiary)', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
            Created {new Date(task.created_at).toLocaleDateString()} • 
            Due {task.due_date ? new Date(task.due_date).toLocaleDateString() : "No due date"}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Comments Section */}
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>
              Comments ({comments.length})
            </h2>

            <form onSubmit={handleAddComment} style={{ marginBottom: '1.5rem' }}>
              <div className="form-group">
                <textarea
                  className="form-input"
                  style={{ minHeight: '80px', resize: 'vertical' }}
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={commentLoading}
              >
                {commentLoading ? "Adding..." : "Add Comment"}
              </button>
            </form>

            {comments.length === 0 ? (
              <div className="empty-state" style={{ padding: '2rem 1rem' }}>
                <p>No comments yet. Be the first to comment!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {comments.map((comment) => (
                  <div key={comment.id} style={{
                    padding: '1rem',
                    backgroundColor: 'var(--color-bg-tertiary)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: '600', fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>
                        {comment.owner_username || "Unknown"}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: '1.5' }}>
                      {comment.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Attachments Section */}
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>
              Attachments ({attachments.length})
            </h2>

            <form onSubmit={handleFileUpload} style={{ marginBottom: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label">Upload File</label>
                <input
                  type="file"
                  className="form-input"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={attachmentLoading}
              >
                {attachmentLoading ? "Uploading..." : "Upload Attachment"}
              </button>
            </form>

            {attachments.length === 0 ? (
              <div className="empty-state" style={{ padding: '2rem 1rem' }}>
                <p>No attachments yet</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {attachments.map((attachment) => (
                  <a
                    key={attachment.id}
                    href={attachment.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem',
                      backgroundColor: 'var(--color-bg-primary)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      textDecoration: 'none',
                      color: 'var(--color-text-primary)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-primary)';
                      e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                      e.currentTarget.style.backgroundColor = 'var(--color-bg-primary)';
                    }}
                  >
                    <span style={{ fontSize: '1.5rem' }}>📎</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                        {attachment.file.split('/').pop()}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>
                        Uploaded {new Date(attachment.uploaded_at).toLocaleDateString()}
                      </div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)' }}>
                      Download ↗
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
