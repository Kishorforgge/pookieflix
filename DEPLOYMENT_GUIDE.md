# Complete Guide: Deploy PookieFlix to Vercel

This guide will walk you through deploying your Vite + React app to Vercel step-by-step.

---

## Prerequisites Checklist

Before you start, make sure you have:
- ✅ A GitHub account (you already have this)
- ✅ Your PookieFlix project on your computer
- ✅ Git installed on your computer (we'll check this)
- ✅ Node.js installed (you already have this if your project runs)

---

## Step 1: Check if Git is Installed

### What is Git?
Git is a version control system that tracks changes in your code. Vercel needs to connect to Git to deploy your app.

### How to Check:
1. Open your terminal (Command Prompt on Windows, Terminal on Mac/Linux)
2. Type: `git --version`
3. Press Enter
4. If you see a version number (like `git version 2.x.x`), you're good!
5. If you see an error, install Git from [git-scm.com](https://git-scm.com/)

---

## Step 2: Initialize Git in Your Project (If Not Already Done)

### Why do we need this?
Vercel deploys from a Git repository, so your project needs to be a Git repository.

### Steps:
1. Open your terminal
2. Navigate to your project folder:
   ```bash
   cd c:\projects\miniflix-frontend
   ```

3. Check if Git is already initialized:
   ```bash
   git status
   ```
   
   - **If you see "fatal: not a git repository"**: Continue to step 4
   - **If you see a list of files**: Git is already initialized, skip to Step 3

4. Initialize Git:
   ```bash
   git init
   ```

5. Add all your files:
   ```bash
   git add .
   ```

6. Make your first commit:
   ```bash
   git commit -m "Initial commit - PookieFlix app"
   ```

---

## Step 3: Create a GitHub Repository

### What is GitHub?
GitHub is a website where you can store your code online. Vercel connects to GitHub to deploy your app automatically.

### Steps:

1. **Go to GitHub**
   - Open your browser
   - Go to [github.com](https://github.com)
   - Log in to your account

2. **Create a New Repository**
   - Click the **"+"** icon in the top right corner
   - Click **"New repository"**

3. **Fill in Repository Details**
   - **Repository name**: `pookieflix` (or any name you like)
   - **Description** (optional): "My Netflix-style movie streaming app"
   - **Visibility**: Choose **Public** (free and easier for Vercel)
   - **DO NOT** check "Add a README file" (we already have files)
   - **DO NOT** add .gitignore or license (we can add these later if needed)
   - Click **"Create repository"**

4. **Copy the Repository URL**
   - After creating, GitHub shows you a page with commands
   - You'll see a URL like: `https://github.com/YOUR_USERNAME/pookieflix.git`
   - **Copy this URL** (we'll need it in the next step)

---

## Step 4: Connect Your Local Project to GitHub

### Steps:

1. **Open your terminal** in your project folder

2. **Add the GitHub repository as remote**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/pookieflix.git
   ```
   (Replace `YOUR_USERNAME` with your actual GitHub username)

3. **Rename your branch to main** (if needed):
   ```bash
   git branch -M main
   ```

4. **Push your code to GitHub**:
   ```bash
   git push -u origin main
   ```

5. **Enter Your GitHub Credentials**:
   - You'll be asked for your username and password
   - **Important**: If you're using a personal access token instead of password:
     - Go to GitHub → Settings → Developer settings → Personal access tokens
     - Generate a new token with "repo" permissions
     - Use the token as your password

6. **Verify the Push**:
   - Go back to your GitHub repository page
   - Refresh the page
   - You should see all your project files!

---

## Step 5: Create a Vercel Account

### Steps:

1. **Go to Vercel**
   - Open [vercel.com](https://vercel.com)
   - Click **"Sign Up"**

2. **Sign Up with GitHub**
   - Click **"Continue with GitHub"**
   - This is the easiest method since we're using GitHub
   - Authorize Vercel to access your GitHub account

3. **Complete Setup**
   - Follow the prompts to complete your account setup

---

## Step 6: Deploy Your App to Vercel

### Steps:

1. **Import Your Project**
   - After logging in to Vercel, you'll see a dashboard
   - Click **"Add New..."** button
   - Click **"Project"**

2. **Select Your Repository**
   - You'll see a list of your GitHub repositories
   - Find `pookieflix` (or whatever you named it)
   - Click **"Import"** next to it

3. **Configure Your Project**
   Vercel will automatically detect it's a Vite app, but let's verify:

   - **Framework Preset**: Should say "Vite" (Vercel auto-detects this)
   - **Root Directory**: Leave as `./` (unless your project is in a subfolder)
   - **Build Command**: Should be `npm run build` (auto-filled)
   - **Output Directory**: Should be `dist` (auto-filled)
   - **Install Command**: Should be `npm install` (auto-filled)

   **⚠️ IMPORTANT**: Make sure these are correct:
   - Framework Preset: **Vite**
   - Build Command: **npm run build**
   - Output Directory: **dist**

4. **Environment Variables** (Skip for now)
   - You probably don't need any for now
   - Click **"Deploy"**

5. **Wait for Deployment**
   - Vercel will start building your app
   - This usually takes 1-3 minutes
   - You'll see logs of what's happening

6. **Success!**
   - When it's done, you'll see "Congratulations!"
   - You'll get a URL like: `https://pookieflix-abc123.vercel.app`
   - **Click "Visit"** to see your live app!

---

## Step 7: Update Your Deployments (Future)

### How it works:
- Every time you push code to GitHub, Vercel automatically deploys it!
- No need to redeploy manually

### Steps to update:

1. **Make changes** to your code locally

2. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

3. **Push to GitHub**:
   ```bash
   git push
   ```

4. **Vercel auto-deploys**
   - Vercel detects the push automatically
   - Creates a new deployment
   - Your live site updates in 1-3 minutes!

---

## Common Mistakes & How to Fix Them

### ❌ Mistake 1: "Build Failed" Error

**Problem**: Vercel can't build your app

**Common Causes & Solutions**:

1. **Missing dependencies**
   - Make sure all packages are in `package.json`
   - Solution: Run `npm install` locally and commit `package-lock.json`

2. **Wrong build command**
   - Solution: Make sure it's `npm run build` (check your `package.json`)

3. **Wrong output directory**
   - For Vite, it should be `dist`
   - Check your `vite.config.js` if unsure

4. **Build errors in code**
   - Solution: Run `npm run build` locally first to find errors
   - Fix any errors before deploying

---

### ❌ Mistake 2: "Repository Not Found"

**Problem**: Vercel can't find your GitHub repository

**Solutions**:
1. Make sure your GitHub repository is **Public** (or add Vercel as collaborator)
2. Check that you selected the correct repository in Vercel
3. Re-authenticate GitHub connection in Vercel settings

---

### ❌ Mistake 3: "Git Push" Authentication Failed

**Problem**: Can't push code to GitHub

**Solutions**:
1. **Use Personal Access Token instead of password**:
   - GitHub no longer accepts passwords for Git operations
   - Go to: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token"
   - Select "repo" scope
   - Copy the token
   - Use it as your password when pushing

2. **Or use SSH instead of HTTPS**:
   - Generate SSH key: `ssh-keygen -t ed25519 -C "your_email@example.com"`
   - Add SSH key to GitHub
   - Use SSH URL instead: `git@github.com:USERNAME/pookieflix.git`

---

### ❌ Mistake 4: Site Shows "404 Not Found" or Blank Page

**Problem**: App deployed but not showing correctly

**Solutions**:

1. **Check Output Directory**:
   - In Vercel project settings, make sure Output Directory is `dist`

2. **Add Redirect Rules** (for client-side routing):
   - In your project root, create `vercel.json`:
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```
   - Commit and push this file

3. **Check Build Logs**:
   - In Vercel dashboard, check the build logs for errors
   - Fix any errors you see

---

### ❌ Mistake 5: Environment Variables Not Working

**Problem**: Your app uses environment variables but they don't work on Vercel

**Solution**:
1. Go to Vercel project → Settings → Environment Variables
2. Add your variables there
3. Redeploy (or wait for next auto-deploy)

---

### ❌ Mistake 6: Forgot to Exclude `node_modules` or `.env`

**Problem**: Pushed sensitive files or large files to GitHub

**Solution**:
1. Create `.gitignore` file in your project root:
   ```
   node_modules
   .env
   .env.local
   dist
   .DS_Store
   *.log
   ```
2. Remove already-tracked files:
   ```bash
   git rm -r --cached node_modules
   git commit -m "Remove node_modules from git"
   ```
3. Push again

---

## Step-by-Step Checklist

Use this checklist to make sure you don't miss anything:

- [ ] Git is installed on your computer
- [ ] Git is initialized in your project folder
- [ ] All files are committed to Git
- [ ] GitHub repository is created
- [ ] Local project is connected to GitHub repository
- [ ] Code is pushed to GitHub successfully
- [ ] Vercel account is created (via GitHub)
- [ ] Project is imported to Vercel
- [ ] Build settings are correct (Vite, npm run build, dist)
- [ ] Deployment is successful
- [ ] Live site is accessible

---

## After Deployment: What's Next?

### 1. Custom Domain (Optional)
- In Vercel project settings, you can add a custom domain
- This is free but you need to own the domain

### 2. Environment Variables
- If you add API keys or secrets later, add them in Vercel project settings

### 3. Analytics (Optional)
- Vercel offers free analytics to see visitor stats

### 4. Preview Deployments
- Every push creates a preview URL
- Great for testing before merging to main branch

---

## Quick Reference Commands

```bash
# Check Git status
git status

# Add all files
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub
git push

# View remote URL
git remote -v

# Initialize Git (if needed)
git init
```

---

## Need Help?

If you get stuck:

1. **Check Vercel Build Logs**: 
   - Go to your project in Vercel dashboard
   - Click on the failed deployment
   - Read the error messages

2. **Test Locally First**:
   - Run `npm run build` locally
   - Fix any errors before deploying

3. **Vercel Documentation**:
   - Visit [vercel.com/docs](https://vercel.com/docs)

4. **Common Vite Issues**:
   - Check [vitejs.dev](https://vitejs.dev) for Vite-specific help

---

## Congratulations! 🎉

Once deployed, you'll have:
- ✅ A live URL for your PookieFlix app
- ✅ Automatic deployments on every Git push
- ✅ Free hosting (Vercel free tier)
- ✅ SSL certificate (HTTPS) automatically included
- ✅ Fast global CDN

Your PookieFlix app is now live on the internet! 🚀
