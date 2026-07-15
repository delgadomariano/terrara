$ErrorActionPreference = "Stop"

Write-Host "Iniciando proceso de construcción para cPanel..." -ForegroundColor Cyan

# 1. Ejecutar npm run build
Write-Host "Ejecutando npm run build (esto puede tardar un par de minutos)..." -ForegroundColor Yellow
npm run build

# 2. Verificar si la carpeta standalone existe
$standalonePath = ".next\standalone"
if (-not (Test-Path $standalonePath)) {
    Write-Error "No se encontró la carpeta .next\standalone. Asegúrate de tener output: 'standalone' en next.config.ts"
    exit 1
}

Write-Host "Build completado. Preparando archivos para cPanel..." -ForegroundColor Yellow

# 3. Copiar la carpeta public y .next/static a standalone
Write-Host "Copiando carpeta public..."
Copy-Item -Path "public" -Destination "$standalonePath\public" -Recurse -Force

Write-Host "Copiando archivos estáticos de Next.js..."
$staticDest = "$standalonePath\.next\static"
if (-not (Test-Path $staticDest)) {
    New-Item -ItemType Directory -Path $staticDest | Out-Null
}
Copy-Item -Path ".next\static\*" -Destination $staticDest -Recurse -Force

# 4. Copiar la base de datos (importante no sobreescribir en producción, pero es útil subirla la primera vez)
if (Test-Path "prisma\dev.db") {
    Write-Host "Copiando base de datos SQLite actual (dev.db)..."
    $prismaDest = "$standalonePath\prisma"
    if (-not (Test-Path $prismaDest)) {
        New-Item -ItemType Directory -Path $prismaDest | Out-Null
    }
    Copy-Item -Path "prisma\dev.db" -Destination "$prismaDest\dev.db" -Force
}

# 5. Crear el archivo ZIP (cpanel-deploy.zip)
$zipPath = "cpanel-deploy.zip"
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

Write-Host "Comprimiendo archivos en $zipPath..." -ForegroundColor Yellow
Compress-Archive -Path "$standalonePath\*" -DestinationPath $zipPath -Force

Write-Host "=============================================" -ForegroundColor Green
Write-Host "¡PROCESO COMPLETADO CON ÉXITO!" -ForegroundColor Green
Write-Host "Archivo generado: cpanel-deploy.zip" -ForegroundColor Green
Write-Host "Sigue la guía de despliegue para subirlo a tu cPanel." -ForegroundColor White
Write-Host "=============================================" -ForegroundColor Green
