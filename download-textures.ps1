# Create textures directory if it doesn't exist
$texturesDir = "public/textures"
if (-not (Test-Path $texturesDir)) {
    New-Item -ItemType Directory -Path $texturesDir
}

# Earth texture URLs from Three.js examples via jsDelivr CDN
$textures = @{
    "earth-day.jpg" = "https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets/earth_atmos_2048.jpg"
    "earth-night.jpg" = "https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets/earth_lights_2048.jpg"
    "earth-normal.jpg" = "https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets/earth_normal_2048.jpg"
    "earth-specular.jpg" = "https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets/earth_specular_2048.jpg"
    "earth-clouds.jpg" = "https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/planets/earth_clouds_2048.png"
}

# Download each texture
foreach ($texture in $textures.GetEnumerator()) {
    $outputPath = Join-Path $texturesDir $texture.Key
    Write-Host "Downloading $($texture.Key)..."
    Invoke-WebRequest -Uri $texture.Value -OutFile $outputPath
}

Write-Host "All textures downloaded successfully!" 