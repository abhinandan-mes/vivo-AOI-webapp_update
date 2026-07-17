Set-Location -Path 'D:\AOI_Maintenance_Checksheet-main'
& "C:\Users\vivoadmin\AppData\Local\GitHubDesktop\app-3.6.2\resources\app\git\cmd\git.exe" checkout -- client/src/components/LoginPage.js

$filePath = 'D:\AOI_Maintenance_Checksheet-main\client\src\components\LoginPage.js'
$encoding = New-Object System.Text.UTF8Encoding($false)
$content = [System.IO.File]::ReadAllText($filePath, $encoding)

$chineseSuffix = [char]0x7ba1 + [char]0x7406 + [char]0x7cfb + [char]0x7edf
$targetPattern = '\{\s*language\s*===\s*''zh''\s*\?\s*''([^'']+)''\s*:\s*''AOI Team Maintenance Checksheet''\s*\}'
$replacement = '{language === ''zh'' ? ''$1' + $chineseSuffix + ''' : ''AOI Team Maintenance Checksheet Management System''}'

$content = $content -replace $targetPattern, $replacement
[System.IO.File]::WriteAllText($filePath, $content, $encoding)
