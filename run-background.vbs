Set WshShell = CreateObject("WScript.Shell")

' 1. Start Backend Server (runs on http://localhost:5001)
WshShell.Run "cmd.exe /c cd /d D:\AOi_check_sheet\server && node server.js", 0, false

' 2. Start Frontend Client (runs on http://localhost:3000)
WshShell.Run "cmd.exe /c cd /d D:\AOi_check_sheet && node start-frontend.js", 0, false
