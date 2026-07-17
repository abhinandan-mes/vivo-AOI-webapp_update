$filePath = 'D:\AOI_Maintenance_Checksheet-main\client\src\components\LoginPage.js'
$encoding = New-Object System.Text.UTF8Encoding($false)
$content = [System.IO.File]::ReadAllText($filePath, $encoding)

# Match the brand line and replace both the Chinese and English text dynamically
$targetPattern = '\{\s*language\s*===\s*''zh''\s*\?\s*''([^'']+)''\s*:\s*''AOI Team Maintenance Checksheet(?: Management System)?''\s*\}'
$replacement = '{language === ''zh'' ? ''$1管理系统'' : ''AOI Team Maintenance Checksheet Management System''}'

$content = $content -replace $targetPattern, $replacement
[System.IO.File]::WriteAllText($filePath, $content, $encoding)
