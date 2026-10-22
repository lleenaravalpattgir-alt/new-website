@echo off
setlocal
echo ========================================================
echo     RYZE ADVISORY - PUSH TO GITHUB FOR LOVABLE
echo ========================================================
echo.
set PATH=%LOCALAPPDATA%\Programs\Git\cmd;C:\Program Files\Git\cmd;%PATH%

git status >nul 2>&1
if errorlevel 1 (
    echo Git repository not found! Initializing...
    git init
    git branch -M main
    git add .
    git commit -m "feat: complete Ryze Advisory with Insights, Blog CMS, and Lovable config"
)

echo Current Git status:
git status -s
echo.
echo Please create a new empty repository on GitHub:
echo https://github.com/new
echo.
set /p REPO_URL="Enter your GitHub Repository URL (e.g. https://github.com/username/ryze-advisory.git): "

if "%REPO_URL%"=="" (
    echo No URL entered. Aborted.
    pause
    exit /b 1
)

echo.
echo Configuring remote origin...
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%
git branch -M main

echo Pushing to GitHub main branch...
git push -u origin main

if errorlevel 0 (
    echo.
    echo ========================================================
    echo SUCCESS! Repository pushed to GitHub!
    echo.
    echo Now in Lovable (https://lovable.dev):
    echo 1. Click "New Project" -> "Import from GitHub"
    echo 2. Select this repository
    echo 3. Lovable will load your project and launch live!
    echo ========================================================
) else (
    echo.
    echo Push failed. Please verify your GitHub permissions and try again.
)

pause
