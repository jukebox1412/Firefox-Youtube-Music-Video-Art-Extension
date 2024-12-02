$timestamp=Get-Date -Format "yyyyMMdd_HHmmss"
$destination = "publish/publish-$timestamp.zip"

Compress-Archive -Path "manifest.json", "youtube-music-extension.js", "README.md", "icons" -DestinationPath $destination