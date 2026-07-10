Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c """ & "D:\AOi_check_sheet\server\run-server.bat""", 0, False
Set WshShell = Nothing
