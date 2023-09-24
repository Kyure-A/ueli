$TempFile = New-TemporaryFile
winget export $TempFile > $null
Get-Content $TempFile
Remove-Item $TempFile
