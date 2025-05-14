param(
    [Parameter(Mandatory=$true)]
    [string]$message
)

# Display current status
Write-Host "Current status before commit:" -ForegroundColor Cyan
git status

# Stage all changes
Write-Host "`nStaging all changes..." -ForegroundColor Yellow
git add .

# Show what's been staged
Write-Host "`nChanges to be committed:" -ForegroundColor Green
git status

# Commit with the provided message
Write-Host "`nCommitting changes with message: '$message'" -ForegroundColor Magenta
git commit -m "$message"

# Push changes to remote repository
Write-Host "`nPushing changes to GitHub..." -ForegroundColor Blue
git push

# Show success message
Write-Host "`nCommit and push complete!" -ForegroundColor Green
Write-Host "Commit message: '$message'" -ForegroundColor Green
Write-Host "Repository: $(git config --get remote.origin.url)" -ForegroundColor Green

# Show last commit
Write-Host "`nLast commit details:" -ForegroundColor Cyan
git log -1 --stat 