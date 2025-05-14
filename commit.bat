@echo off
setlocal

if "%~1"=="" (
  echo Error: Commit message is required
  echo Usage: commit.bat "Your commit message here"
  exit /b 1
)

echo Current status before commit:
git status

echo.
echo Staging all changes...
git add .

echo.
echo Changes to be committed:
git status

echo.
echo Committing changes with message: '%~1'
git commit -m "%~1"

echo.
echo Pushing changes to GitHub...
git push

echo.
echo Commit and push complete!
echo Commit message: '%~1'
echo Repository: 
git config --get remote.origin.url

echo.
echo Last commit details:
git log -1 --stat

endlocal 