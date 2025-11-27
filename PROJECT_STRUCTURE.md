# Project Structure

```
taskmanager_project/
├── backend/              # Django REST Framework API
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── taskmanager/     # Django settings
│   ├── users/           # Auth
│   ├── projects/
│   ├── tasks/
│   ├── subtasks/
│   ├── comments/
│   ├── attachments/
│   └── core/
│
└── frontend/            # React + Vite
    ├── package.json
    ├── .env.example
    └── src/
```

## Running Locally

**Backend:**
```bash
cd backend
source ../env/bin/activate
python manage.py runserver
```

**Frontend:**
```bash
cd frontend
npm run dev
```

## Deploying

- **Frontend**: Deploy `frontend/` folder to Vercel
- **Backend**: Deploy `backend/` folder to Render
- Set root directory appropriately in each platform
