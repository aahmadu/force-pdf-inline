Param(
  [string]$OutDir = "dist",
  [string]$ZipName = "force-pdf-inline.zip"
)

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$repo = Resolve-Path (Join-Path $root '..')
Set-Location $repo

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
$zipPath = Join-Path $OutDir $ZipName

if (Test-Path $zipPath) { Remove-Item $zipPath -Force }

$include = @(
  'manifest.json',
  'background.js',
  'icons/icon16.png',
  'icons/icon32.png',
  'icons/icon48.png',
  'icons/icon128.png',
  'README.md',
  'PRIVACY.md',
  'LICENSE'
)

Compress-Archive -Path $include -DestinationPath $zipPath -Force
Write-Host "Created $zipPath"

