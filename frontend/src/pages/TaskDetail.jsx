import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { taskAPI } from "../api/tasks";
import { subtaskAPI } from "../api/subtasks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "../components/Navbar";

export default function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [subtasks, setSubtasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [newComment, setNewComment] = useState("");
  const [newSubtask, setNewSubtask] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const [taskRes, commentsRes, attachmentsRes, subtasksRes] = await Promise.all([
        taskAPI.get(id),
        taskAPI.listComments(id),
        taskAPI.listAttachments(id),
        subtaskAPI.list({ parent_task: id }),
      ]);
      setTask(taskRes.data);
      setComments(commentsRes.data);
      setAttachments(attachmentsRes.data);
      setSubtasks(subtasksRes.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load task");
    } finally {
      setLoading(false);
    }
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      await taskAPI.createComment(id, { message: newComment });
      setNewComment("");
      loadData();
    } catch (err) {
      console.error(err);
      setError("Failed to post comment");
    }
  };

  const handleCreateSubtask = async (e) => {
    e.preventDefault();
    if (!newSubtask.trim()) return;
    try {
      await subtaskAPI.create({ parent_task: id, title: newSubtask });
      setNewSubtask("");
      loadData();
    } catch (err) {
      console.error(err);
      setError("Failed to create subtask");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile) return;
    try {
      await taskAPI.uploadAttachment(id, uploadFile);
      setUploadFile(null);
      loadData();
    } catch (err) {
      console.error(err);
      setError("Failed to upload file");
    }
  };

  const toggleComplete = async () => {
    try {
      await taskAPI.update(id, { is_completed: !task.is_completed });
      loadData();
    } catch (err) {
      console.error(err);
      setError("Failed to update task");
    }
  };

  const toggleSubtaskComplete = async (subtaskId, currentStatus) => {
    try {
      await subtaskAPI.update(subtaskId, { is_completed: !currentStatus });
      loadData();
    } catch (err) {
      console.error(err);
      setError("Failed to update subtask");
    }
  };

  if (loading) return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <p>Loading...</p>
      </div>
    </>
  );

  if (error && !task) return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <p className="text-red-600">{error}</p>
      </div>
    </>
  );

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl mb-2">{task.title}</CardTitle>
                <p className="text-gray-600">{task.description}</p>
              </div>
              <Button
                onClick={toggleComplete}
                variant={task.is_completed ? "outline" : "default"}
              >
                {task.is_completed ? "Mark Incomplete" : "Mark Complete"}
              </Button>
            </div>
          </CardHeader>
        </Card>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="grid gap-6 md:grid-cols-2">
          {/* Subtasks */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Subtasks</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateSubtask} className="mb-4 flex gap-2">
                <Input
                  placeholder="Add subtask..."
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                />
                <Button type="submit" size="sm">Add</Button>
              </form>
              
              <ul className="space-y-2">
                {subtasks.length === 0 && <p className="text-sm text-gray-500">No subtasks</p>}
                {subtasks.map((sub) => (
                  <li key={sub.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={sub.is_completed}
                      onChange={() => toggleSubtaskComplete(sub.id, sub.is_completed)}
                      className="w-4 h-4"
                    />
                    <span className={sub.is_completed ? "line-through text-gray-500" : ""}>
                      {sub.title}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Attachments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Attachments</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpload} className="mb-4 space-y-2">
                <Input
                  type="file"
                  onChange={(e) => setUploadFile(e.target.files[0])}
                />
                <Button type="submit" size="sm" disabled={!uploadFile}>
                  Upload
                </Button>
              </form>
              
              <ul className="space-y-2">
                {attachments.length === 0 && <p className="text-sm text-gray-500">No attachments</p>}
                {attachments.map((att) => (
                  <li key={att.id} className="text-sm">
                    <a
                      href={att.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {att.original_name || "Download"}
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Comments */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePostComment} className="mb-6 space-y-2">
              <textarea
                className="w-full border rounded-md p-2 min-h-[80px]"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button type="submit" size="sm">Post Comment</Button>
            </form>
            
            <div className="space-y-4">
              {comments.length === 0 && <p className="text-sm text-gray-500">No comments yet</p>}
              {comments.map((c) => (
                <div key={c.id} className="p-3 bg-gray-50 rounded-md">
                  <p className="text-sm">{c.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(c.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
