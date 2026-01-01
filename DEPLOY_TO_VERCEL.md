# Deploy to Vercel - Simple 5-Minute Guide

Everything is ready for deployment! Just follow these simple steps:

---

## What I've Already Done For You ✅

- Built and tested the production version
- Created Vercel configuration file
- Pushed everything to GitHub
- Your environment variables are ready to copy-paste

---

## Your 5 Simple Steps:

### Step 1: Go to Vercel (1 min)
1. Open **[vercel.com](https://vercel.com)** in your browser
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel (click the authorization button)

### Step 2: Import Your Repository (30 sec)
1. Click **"Add New..."** → **"Project"**
2. Find **"my-new-repo"** in the list
3. Click **"Import"**

### Step 3: Add Environment Variables (2 min)
**IMPORTANT: Don't click Deploy yet!**

Scroll down to **"Environment Variables"** and add these TWO variables:

**Variable 1:**
```
Name:  VITE_SUPABASE_URL
Value: https://kxxzdjzdonutenvwakfs.supabase.co
```
Click "Add"

**Variable 2:**
```
Name:  VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4eHpkanpkb251dGVudndha2ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyNDExNjIsImV4cCI6MjA4MjgxNzE2Mn0.FWDbHwkXPIKdTPSfTG-SigJDvDya72rQD_2UvIFf1rE
```
Click "Add"

### Step 4: Deploy! (30 sec)
1. Click the big **"Deploy"** button
2. Wait ~2 minutes (Vercel will show progress)
3. You'll see confetti when it's done! 🎉

### Step 5: Visit Your Live App (10 sec)
1. Click the **screenshot** or **"Visit"** button
2. Your app is now live at `https://your-app-name.vercel.app`
3. Test it by adding a time log entry!

---

## That's It!

Your African Time Tracker is now:
- ✅ Live on the internet
- ✅ Accessible from any device
- ✅ Auto-deploys when you push to GitHub
- ✅ Running on a global CDN
- ✅ Has HTTPS enabled

---

## Copy-Paste Summary

Just in case you need them again:

**Supabase URL:**
```
https://kxxzdjzdonutenvwakfs.supabase.co
```

**Supabase Anon Key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4eHpkanpkb251dGVudndha2ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyNDExNjIsImV4cCI6MjA4MjgxNzE2Mn0.FWDbHwkXPIKdTPSfTG-SigJDvDya72rQD_2UvIFf1rE
```

---

## Troubleshooting

**If the app shows an error after deployment:**
- Make sure you added BOTH environment variables
- Check that there are no extra spaces in the variable values
- In Vercel dashboard → Settings → Environment Variables → verify they're there

**If you can't find your repo in Vercel:**
- Make sure you authorized Vercel to access your GitHub
- Try clicking "Adjust GitHub App Permissions" and grant access

**Need help?**
Just let me know what error message you see!
