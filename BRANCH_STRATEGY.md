# Branch Strategy Guide

## 🎯 Recommended Workflow

### **Branches:**

1. **`main`** - Local development (always works on localhost)
2. **`production`** - Deployment configuration (for Render/Vercel)

---

## 📋 **Step-by-Step: How to Deploy Without Breaking Local**

### **1. Current State (main branch = local dev)**
```bash
# You're on main - everything works locally
git branch
# * main

# Backend: http://localhost:8001
# Frontend: http://localhost:5173
```

---

### **2. When Ready to Deploy: Create Production Branch**

```bash
# Create production branch from main
git checkout -b production

# Now you're on production branch
# Make deployment changes here (don't touch main!)
```

---

### **3. Add Deployment Files (on production branch only)**

**Create/Update these files for deployment:**

#### `backend/Procfile`
```
web: gunicorn taskmanager.wsgi:application
```

#### `backend/render.yaml`
```yaml
services:
  - type: web
    name: taskmanager-backend
    runtime: python
    rootDir: backend
    buildCommand: "pip install -r requirements.txt && python manage.py collectstatic --noinput"
    startCommand: "gunicorn taskmanager.wsgi:application"
    envVars:
      - key: SECRET_KEY
        generateValue: true
      - key: DEBUG
        value: "False"
      - key: DATABASE_URL
        fromDatabase:
          name: taskmanager-db
          property: connectionString
```

#### `frontend/vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

#### `backend/.env.example` (production settings)
```env
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=your-render-domain.onrender.com
DATABASE_URL=postgresql://...
CORS_ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
```

#### `frontend/.env.production`
```env
VITE_API_BASE_URL=https://your-render-backend.onrender.com/api
```

---

### **4. Commit Deployment Config (on production branch)**

```bash
git add .
git commit -m "config: production deployment setup"
git push origin production
```

---

### **5. Deploy from production branch**

**Render:**
- Connect GitHub repo
- Select `production` branch
- Set root directory: `backend`

**Vercel:**
- Connect GitHub repo  
- Select `production` branch
- Set root directory: `frontend`

---

### **6. Switch Back to Local Development**

```bash
# Go back to main branch
git checkout main

# Your local .env still has:
# VITE_API_BASE_URL=http://localhost:8001/api

# No deployment files polluting your local setup!
# Continue developing normally
```

---

## 🔄 **When You Update Code**

### **Update both branches:**

```bash
# 1. Develop on main
git checkout main
# ... make changes ...
git commit -m "feat: new feature"
git push origin main

# 2. Merge to production
git checkout production
git merge main
# Deployment configs stay intact!
git push origin production

# Render/Vercel auto-redeploy from production branch
```

---

## ✅ **Benefits**

✅ **`main` branch** always works locally (no deployment config)  
✅ **`production` branch** has deployment files (doesn't affect local)  
✅ **No conflicts** between local and production settings  
✅ **Easy to update** - just merge main into production  
✅ **Professional workflow** - this is industry standard!  

---

## 🚨 **What NOT to Do**

❌ Don't add deployment config to `main` branch  
❌ Don't mix local and production settings in same branch  
❌ Don't use environment variables that break local dev  

---

## 📝 **Current Status**

✅ **`main` branch** - Clean, restructured, works locally  
🔜 **`production` branch** - Create when ready to deploy  

**Next Step:** When you want to deploy again, just run:
```bash
git checkout -b production
# Add deployment files
git push origin production
```
