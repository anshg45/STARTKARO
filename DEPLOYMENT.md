# 🚀 Deployment Guide for StartKaro

Follow these steps to deploy your website live on the internet.

## 1. Backend Deployment (Render.com)
The backend (Node.js/Express) needs to run on a server.

1.  Push your code to **GitHub**.
2.  Go to [Render.com](https://render.com) and sign up.
3.  Click **"New +"** -> **"Web Service"**.
4.  Connect your GitHub repository.
5.  **Settings:**
    *   **Root Directory:** `backend`
    *   **Build Command:** `npm install`
    *   **Start Command:** `npm start`
6.  **Environment Variables (Advanced):**
    *   Add `MONGO_URI`: (Your MongoDB Connection String)
    *   Add `JWT_SECRET`: (Any secret password)
    *   Add `OPENAI_API_KEY`: (If you are using AI features)
7.  Click **"Create Web Service"**.
8.  **Copy the URL** provided by Render (e.g., `https://startkaro-backend.onrender.com`).

---

## 2. Frontend Deployment (Vercel)
The frontend (React) is static and can be hosted on Vercel.

1.  Go to [Vercel.com](https://vercel.com) and sign up.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your GitHub repository.
4.  **Settings:**
    *   **Root Directory:** `frontend` (Click Edit)
    *   **Framework Preset:** Vite
    *   **Build Command:** `npm run build`
    *   **Output Directory:** `dist`
5.  **Environment Variables:**
    *   **Name:** `VITE_API_URL`
    *   **Value:** The Backend URL you copied from Render + `/api` (e.g., `https://startkaro-backend.onrender.com/api`)
6.  Click **"Deploy"**.

## 🎉 Done!
Your website will be live on a Vercel URL (e.g., `https://startkaro.vercel.app`).
