# GitHub Setup and Commit Workflow

This document provides instructions for setting up and maintaining the GitHub repository for the Harrison's Website project.

## Initial Setup (Already Completed)

- Repository initialized with `git init`
- Initial commit created with all project files

## Connecting to GitHub

To connect your local repository to GitHub:

1. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Name the repository "harrison_web" or your preferred name
   - Do not initialize with README, .gitignore, or license (since we already have files locally)
   - Click "Create repository"

2. Copy the repository URL from GitHub

3. Connect your local repository to GitHub:
   ```powershell
   git remote add origin https://github.com/yourusername/harrison_web.git
   ```

4. Push your code to GitHub:
   ```powershell
   git push -u origin master
   ```

## Regular Commit Workflow

Follow this workflow for making changes and committing them:

1. Make your changes to the code

2. Check what files have been modified:
   ```powershell
   git status
   ```

3. Add the changed files to staging:
   ```powershell
   git add .  # Add all files
   # OR
   git add filename.js  # Add specific files
   ```

4. Commit your changes with a descriptive message:
   ```powershell
   git commit -m "Description of changes made"
   ```

5. Push your changes to GitHub:
   ```powershell
   git push
   ```

## Common Git Commands

- View branch status: `git status`
- View commit history: `git log`
- Create a new branch: `git checkout -b branch-name`
- Switch branches: `git checkout branch-name`
- Merge branches: `git merge branch-name`
- Pull latest changes: `git pull`

## Recommended Commit Message Conventions

Follow these conventions for clear commit messages:

- Start with a verb in imperative form (Add, Update, Fix, Refactor, etc.)
- Keep the first line under 50 characters
- Use the body for detailed explanations if needed

Examples:
- "Add cursor eagle pet feature"
- "Fix eagle head positioning issue"
- "Update eagle animation for smoother movement"
- "Refactor cursor-pet.js for better performance" 