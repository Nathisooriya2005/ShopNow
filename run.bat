@echo off
echo ========================================
echo    Amazon Clone E-commerce Website
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo.

REM Check if we're in the right directory
if not exist "backend\package.json" (
    echo ERROR: backend\package.json not found
    echo Please run this script from the fullstack directory
    pause
    exit /b 1
)

if not exist "frontend\package.json" (
    echo ERROR: frontend\package.json not found
    echo Please run this script from the fullstack directory
    pause
    exit /b 1
)

echo Installing dependencies...
echo.

REM Install backend dependencies
echo Installing backend dependencies...
cd backend
if not exist "node_modules" (
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install backend dependencies
        pause
        exit /b 1
    )
) else (
    echo Backend dependencies already installed
)
cd ..

REM Install frontend dependencies
echo Installing frontend dependencies...
cd frontend
if not exist "node_modules" (
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install frontend dependencies
        pause
        exit /b 1
    )
) else (
    echo Frontend dependencies already installed
)
cd ..

echo.
echo ========================================
echo    Dependencies installed successfully!
echo ========================================
echo.

REM Check for .env file
if not exist "backend\.env" (
    echo WARNING: backend\.env file not found
    echo Please copy backend\.env.example to backend\.env and configure it
    echo.
    echo Would you like to copy .env.example to .env now? (y/n)
    set /p choice=
    if /i "%choice%"=="y" (
        copy "backend\.env.example" "backend\.env"
        echo .env file created. Please edit backend\.env with your configuration.
        echo.
    )
)

echo Starting the application...
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
echo.
echo Press Ctrl+C to stop the servers
echo.

REM Start both servers
start "Backend Server" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak >nul
start "Frontend Server" cmd /k "cd frontend && npm start"

echo.
echo Both servers are starting...
echo Check the opened terminal windows for any errors.
echo.
pause
