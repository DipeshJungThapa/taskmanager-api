# Quick Start Guide

## ✅ What We Did

1. **Reverted** to working commit (before deployment mess)
2. **Restructured** project properly:
   - `backend/` - All Django files
   - `frontend/` - React app at root
3. **Backend is running** at: http://localhost:8001
4. **Frontend is running** at: http://localhost:5173

## 🚀 Running the App

### Backend
```bash
cd backend
source ../env/bin/activate
python manage.py runserver 8001
```

### Frontend
```bash
cd frontend
npm run dev
```

## 📁 New Structure

```
taskmanager_project/
├── backend/              ← All Django code here
│   ├── manage.py
│   ├── requirements.txt
│   ├── taskmanager/
│   ├── users/
│   ├── projects/
│   ├── tasks/
│   └── ...
│
├── frontend/             ← React app here
│   ├── package.json
│   ├── src/
│   └── ...
│
└── env/                  ← Virtual environment (shared)
```

## 🎯 Benefits

1. **Clean separation** - Backend and frontend are independent
2. **Easier deployment**:
   - Deploy `backend/` to Render (set root dir = `backend`)
   - Deploy `frontend/` to Vercel (set root dir = `frontend`)
3. **No confusion** - Clear which files belong where
4. **Working locally** - Everything runs smoothly

## 📝 Next Steps

When you're ready to deploy again:

1. **Commit this structure** to GitHub
2. **Vercel**: Import repo, set root directory to `frontend/`
3. **Render**: Import repo, set root directory to `backend/`

Both platforms will now work cleanly with separate folders!
