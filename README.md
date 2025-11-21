# TaskManager — Full-Stack Task Management Application

A complete Task Management system built with **Django REST Framework** backend and **React + Vite** frontend. Features user authentication, project management, task tracking, subtasks, comments, and file attachments with a clean, semantic UI design.

---

## 🎯 Features

### User Features
- ✅ **User Authentication** (JWT-based with register/login)
- ✅ **Dashboard** showing all user projects
- ✅ **Projects** (create, view, update, delete — owner only)
- ✅ **Tasks** (create, manage, mark complete, filter & search)
- ✅ **Subtasks** (create, toggle completion)
- ✅ **Comments** (add comments to tasks)
- ✅ **File Attachments** (upload & download files for tasks)
- ✅ **Protected Routes** (authentication required)
- ✅ **Clean Semantic UI** (vanilla CSS with utility classes)

### Technical Features
- Django REST Framework with ViewSets & Routers
- JWT authentication (simplejwt)
- File upload handling with media storage
- CORS configured for development
- Vite dev server with proxy
- Clean API service layer in frontend
- Context-based auth state management
- Environment variable configuration

---

## 🚀 Quick Start

### Prerequisites
- Python 3.10+ with virtualenv
- Node.js 18+ (via nvm recommended)
- Git

### Backend Setup

```bash
# 1. Clone and navigate to project
cd taskmanager_project

# 2. Create and activate virtual environment
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Set up environment variables (optional for development)
cp .env.example .env
# Edit .env if needed for custom configuration

# 5. Run migrations
python manage.py migrate

# 6. Create superuser (optional, for admin panel)
python manage.py createsuperuser

# 7. Start Django dev server
python manage.py runserver
# Backend will run at http://127.0.0.1:8000
```

### Frontend Setup

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start Vite dev server
npm run dev
# Frontend will run at http://localhost:5173
```

---

## 📁 Project Structure

```
taskmanager_project/
├── manage.py
├── requirements.txt
├── db.sqlite3
│
├── taskmanager/          # Django project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── users/                # User auth app
│   ├── models.py
│   ├── views.py         # RegisterView, UserDetailView
│   └── urls.py          # /api/auth/register/, /login/, etc.
│
├── projects/             # Projects app
│   ├── models.py        # Project model
│   ├── views.py         # ProjectViewSet
│   └── urls.py
│
├── tasks/                # Tasks app
│   ├── models.py        # Task model
│   ├── views.py         # TaskViewSet
│   └── urls.py
│
├── subtasks/             # Subtasks app
│   ├── models.py        # SubTask model
│   ├── views.py         # SubTaskViewSet
│   └── urls.py
│
├── comments/             # Comments app (nested under tasks)
│   ├── models.py        # Comment model
│   ├── views.py         # CommentViewSet
│   └── urls.py
│
├── attachments/          # File uploads app (nested under tasks)
│   ├── models.py        # Attachment model
│   ├── views.py         # AttachmentViewSet
│   └── urls.py
│
├── media/                # Uploaded files storage
│
└── frontend/             # React + Vite frontend
    ├── package.json
    ├── vite.config.js    # Proxy config for dev
    ├── tailwind.config.cjs
    └── src/
        ├── App.jsx
        ├── main.jsx
        │
        ├── api/                    # API service layer
        │   ├── axiosClient.js      # Axios instance with auth
        │   ├── projects.js
        │   ├── tasks.js
        │   └── subtasks.js
        │
        ├── context/
        │   └── AuthContext.jsx     # Auth state management
        │
        ├── components/
        │   ├── ProtectedRoute.jsx  # Route guard
        │   ├── Navbar.jsx          # Global navbar
        │   └── ui/                 # shadcn components
        │
        └── pages/
            ├── Login.jsx           # Login page
            ├── Register.jsx        # Register page
            ├── Dashboard.jsx       # Projects list
            ├── CreateProject.jsx   # Create project form
            ├── ProjectPage.jsx     # Single project + tasks
            └── TaskDetail.jsx      # Task detail + comments/attachments
```

---

## 🔌 API Reference

### Authentication
- `POST /api/auth/register/` — Register new user
- `POST /api/auth/login/` — Obtain JWT tokens
- `POST /api/auth/refresh/` — Refresh access token
- `GET /api/auth/me/` — Get current user (protected)

### Projects
- `GET /api/projects/` — List user's projects
- `POST /api/projects/` — Create project
- `GET /api/projects/{id}/` — Get project detail
- `PATCH /api/projects/{id}/` — Update project
- `DELETE /api/projects/{id}/` — Delete project

### Tasks
- `GET /api/tasks/` — List tasks (supports filters: `?project=1`, `?is_completed=true`)
- `POST /api/tasks/` — Create task
- `GET /api/tasks/{id}/` — Get task detail
- `PATCH /api/tasks/{id}/` — Update task
- `DELETE /api/tasks/{id}/` — Delete task

### Subtasks
- `GET /api/subtasks/` — List subtasks (supports `?parent_task=1`)
- `POST /api/subtasks/` — Create subtask
- `PATCH /api/subtasks/{id}/` — Update subtask
- `DELETE /api/subtasks/{id}/` — Delete subtask

### Comments (nested)
- `GET /api/tasks/{task_id}/comments/` — List comments
- `POST /api/tasks/{task_id}/comments/` — Add comment
- `PATCH /api/tasks/{task_id}/comments/{id}/` — Update comment
- `DELETE /api/tasks/{task_id}/comments/{id}/` — Delete comment

### Attachments (nested)
- `GET /api/tasks/{task_id}/attachments/` — List attachments
- `POST /api/tasks/{task_id}/attachments/` — Upload file (multipart/form-data)
- `DELETE /api/tasks/{task_id}/attachments/{id}/` — Delete attachment

---

## 🎨 Frontend Pages & Flow

### User Journey
1. **Visit** → redirected to `/login`
2. **Register** → create account at `/register` → redirected to login
3. **Login** → enter credentials → JWT tokens stored → redirected to `/` (Dashboard)
4. **Dashboard** → view projects → click "Create Project" or select a project
5. **Project Page** → view tasks → create new tasks → click task to view detail
6. **Task Detail** → view/add comments, subtasks, attachments → mark task complete
7. **Logout** → clears tokens → redirected to login

### Routes
- `/login` — Login page (public)
- `/register` — Register page (public)
- `/` — Dashboard (protected)
- `/projects/new` — Create project form (protected)
- `/projects/:id` — Project detail + task list (protected)
- `/tasks/:id` — Task detail page (protected)

---

## 🔒 Security Notes

### Development
- CORS is enabled for `http://localhost:5173` in Django settings
- Vite proxy forwards `/api` requests to Django backend
- JWT tokens stored in localStorage (consider HttpOnly cookies in production)

### Production Recommendations
- Use environment variables for `SECRET_KEY`, `DATABASE_URL`, etc.
- Set `DEBUG=False` and configure `ALLOWED_HOSTS`
- Use HTTPS only
- Move media files to S3 or CDN
- Use PostgreSQL instead of SQLite
- Consider HttpOnly cookies for JWT storage
- Add rate limiting (django-ratelimit)
- Enable CSRF protection where appropriate

---

## 🧪 Testing

### Backend
```bash
# Run Django tests
python manage.py test

# Check for errors
python manage.py check
```

### Frontend
```bash
# Run dev server and manually test
cd frontend
npm run dev
# Visit http://localhost:5173
```

### Manual Test Flow
1. Register new user
2. Login and verify redirect to dashboard
3. Create a project
4. Create a task in that project
5. Open task detail and add comment
6. Upload an attachment
7. Create a subtask and mark it complete
8. Mark task as complete
9. Logout and verify redirect to login

---

## 📦 Deployment

### Backend (Railway / Render / Heroku)
1. Add `gunicorn` to requirements.txt
2. Create `Procfile`: `web: gunicorn taskmanager.wsgi`
3. Set environment variables (SECRET_KEY, DATABASE_URL, ALLOWED_HOSTS)
4. Deploy and run migrations

### Frontend (Vercel / Netlify)
1. Build the frontend: `npm run build`
2. Deploy `dist/` folder
3. Set environment variable for API base URL if needed (or use relative paths)

---

## 🛠️ Tech Stack

### Backend
- Python 3.14
- Django 5.2
- Django REST Framework 3.16
- djangorestframework-simplejwt 5.5 (JWT auth)
- django-cors-headers (CORS support)

### Frontend
- React 19
- Vite 7.2
- React Router Dom 7
- Axios 1.13
- Tailwind CSS 4
- shadcn/ui components
- Lucide React (icons)

---

## 📝 Development Notes

### Vite Proxy Configuration
The frontend uses a dev proxy to avoid CORS issues:
```js
// vite.config.js
server: {
  proxy: {
    '/api': 'http://127.0.0.1:8000'
  }
}
```

### JWT Token Flow
1. User logs in → backend returns `{ access, refresh }` tokens
2. Frontend stores tokens in localStorage
3. Axios client auto-attaches `Authorization: Bearer <access>` header
4. Protected routes check for user in AuthContext
5. On logout, tokens are cleared

### File Upload
- Attachments use Django `FileField` with `MEDIA_ROOT` and `MEDIA_URL`
- Frontend sends multipart/form-data
- Files stored in `media/` directory during dev

---

## 🐛 Troubleshooting

### Backend won't start
- Ensure virtualenv is activated: `source env/bin/activate`
- Install dependencies: `pip install -r requirements.txt`
- Run migrations: `python manage.py migrate`

### CORS errors in browser
- Check Django settings: `CORS_ALLOWED_ORIGINS` should include frontend URL
- Verify Vite proxy is configured
- Use relative URLs in frontend (`/api/...` not `http://127.0.0.1:8000/api/...`)

### 401 Unauthorized on protected routes
- Check if JWT token is stored in localStorage (`accessToken`)
- Verify `axiosClient.js` attaches `Authorization` header
- Check Django REST Framework authentication classes

### Frontend build errors
- Run `npm install` to ensure all dependencies are present
- Check for missing imports or typos in component files

---

## 👨‍💻 Author

Created as an internship portfolio project demonstrating:
- Full-stack development skills
- RESTful API design
- Modern React patterns
- Authentication & authorization
- File upload handling
- Clean code architecture

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🚀 Next Steps / Future Enhancements

- [ ] Add project sharing/collaboration features
- [ ] Implement real-time notifications
- [ ] Add task due date reminders
- [ ] Improve UI/UX with animations
- [ ] Add dark mode
- [ ] Write comprehensive unit tests
- [ ] Set up CI/CD pipeline
- [ ] Add activity logs/audit trail
- [ ] Implement advanced search and filters
- [ ] Add user profile page
- [ ] Mobile app (React Native)

---

**Happy coding! 🎉**
