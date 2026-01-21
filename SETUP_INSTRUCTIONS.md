# MiniFlix Setup Instructions - Step by Step Guide

## Prerequisites

Before starting, make sure you have **Node.js** installed on your computer. Node.js is a JavaScript runtime that allows you to run JavaScript outside of a web browser.

### How to check if you have Node.js:
1. Open your terminal (Command Prompt on Windows, Terminal on Mac/Linux)
2. Type: `node --version`
3. Press Enter
4. If you see a version number (like `v20.0.0`), you're good to go!
5. If you see an error, download Node.js from [nodejs.org](https://nodejs.org/)

---

## Step 1: Create a New Vite React Project

### What is Vite?
Vite (pronounced "veet") is a build tool that makes React development fast and easy. It's like a helper that:
- Starts your development server quickly
- Updates your browser automatically when you save changes
- Compiles your React code so browsers can understand it

### Command to create the project:
```bash
npm create vite@latest miniflix-frontend -- --template react
```

### Breaking down this command:
- **`npm`** = Node Package Manager. It's a tool that comes with Node.js to install and manage JavaScript packages (code libraries).
- **`create`** = A command that tells npm to create a new project
- **`vite@latest`** = Use the latest version of Vite to create the project
- **`miniflix-frontend`** = The name of your project folder (you can change this to anything you want)
- **`-- --template react`** = Use the React template (this creates a React project instead of vanilla JavaScript)

### What happens:
When you run this command, Vite will:
1. Create a new folder called `miniflix-frontend`
2. Copy all the necessary files for a React project
3. Set up a basic structure so you can start coding immediately

---

## Step 2: Navigate into Your Project Folder

After creating the project, you need to move into that folder.

### Command:
```bash
cd miniflix-frontend
```

### What this means:
- **`cd`** = "Change Directory" - a command to move into a folder
- **`miniflix-frontend`** = The name of your project folder

### What happens:
Your terminal is now "inside" your project folder. Any commands you run will affect files in this folder.

---

## Step 3: Install Dependencies

### What are dependencies?
Dependencies are external code libraries that your project needs to work. Think of them as ingredients for a recipe - you need them to make your project run!

In this case, your project needs:
- **React** - The library that lets you build user interfaces
- **React DOM** - Lets React work with the browser
- **Vite** - The build tool we talked about earlier
- **Other tools** - Various helper libraries

### Command:
```bash
npm install
```

### What this means:
- **`npm`** = Node Package Manager (same as before)
- **`install`** = Download and set up all the dependencies listed in `package.json`

### What happens:
1. npm reads the `package.json` file (which lists all needed packages)
2. Downloads all the required packages from the internet
3. Stores them in a folder called `node_modules`
4. Creates a `package-lock.json` file to lock the exact versions

### How long does it take?
Usually 30 seconds to 2 minutes depending on your internet speed. You'll see a progress bar.

---

## Step 4: Start the Development Server

Now you're ready to run your project locally!

### Command:
```bash
npm run dev
```

### What this means:
- **`npm run`** = Execute a script defined in `package.json`
- **`dev`** = The name of the development script (short for "development")

### What happens:
1. Vite starts a local web server (usually on port 5173)
2. Your React app is compiled and made ready for the browser
3. A local URL appears in your terminal (usually `http://localhost:5173`)
4. You can open this URL in your web browser to see your app!

### The terminal will show something like:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Important notes:
- **Keep the terminal open** while the server is running. If you close it, your app will stop working.
- **Hot Module Replacement (HMR)**: When you save changes to your code, the browser automatically refreshes to show your changes! No need to manually refresh.
- **To stop the server**: Press `Ctrl + C` (or `Cmd + C` on Mac) in the terminal

---

## Step 5: Open Your App in a Browser

1. Copy the URL from the terminal (usually `http://localhost:5173`)
2. Open your web browser (Chrome, Firefox, Safari, etc.)
3. Paste the URL into the address bar
4. Press Enter

### What you'll see:
You should see a simple React app with:
- Vite and React logos
- A counter button
- Some text explaining how to edit the code

---

## Summary of Commands

Here's a quick reference of all the commands you need:

```bash
# 1. Create project
npm create vite@latest miniflix-frontend -- --template react

# 2. Go into project folder
cd miniflix-frontend

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

---

## Understanding package.json

The `package.json` file is like a recipe card for your project. It contains:

1. **Project info**: Name, version, description
2. **Dependencies**: Libraries your app needs to run (like React)
3. **Dev Dependencies**: Tools needed for development (like Vite, ESLint)
4. **Scripts**: Commands you can run with `npm run`:
   - `dev` - Start development server
   - `build` - Create production-ready files
   - `preview` - Preview the production build locally

---

## Next Steps for MiniFlix

Now that your project is running, you can:

1. **Edit `src/App.jsx`** - This is your main component file
2. **Add movie components** - Create components to display movies
3. **Use HTML `<video>` tag** - To play movies from Google Drive links
4. **Style with CSS** - Make it look like Netflix!

---

## Troubleshooting

### "Command not found" error
- Make sure Node.js is installed
- Try restarting your terminal

### Port 5173 already in use
- Another app might be using that port
- Vite will automatically try the next port (5174, 5175, etc.)

### Changes not showing in browser
- Make sure you saved the file (Ctrl+S or Cmd+S)
- Check the terminal for any error messages
- Try refreshing the browser (though HMR should do this automatically)

---

## Congratulations! 🎉

You've successfully set up a Vite + React project! You're ready to start building MiniFlix.
