$timestamp=Get-Date -Format "yyyyMMdd_HHmmss"
$destination = "publish/publish-$timestamp.zip"

Compress-Archive -Path "manifest.json", "youtube-music-extension.js", "README.md", "icon-48.png" -DestinationPath $destination