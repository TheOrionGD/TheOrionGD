# GitHub Portfolio Export Script
# Exports all repos with metadata, collaborators, and READMEs

$exportDir  = "O:\data\2026\pORTFOLIO\github-export"
$readmesDir = "$exportDir\readmes"
$csvPath    = "$exportDir\repos.csv"
$username   = "TheOrionGD"

New-Item -ItemType Directory -Force -Path $readmesDir | Out-Null

# -------------------------------------------------------------------
# 1) Fetch full repo list as JSON
# -------------------------------------------------------------------
Write-Host ""
Write-Host "[1/3] Fetching repository list..." -ForegroundColor Cyan
$reposJson = gh repo list $username --limit 200 --json name,description,url,isPrivate,repositoryTopics,homepageUrl | ConvertFrom-Json
Write-Host "      Found $($reposJson.Count) repositories." -ForegroundColor Green

# -------------------------------------------------------------------
# 2) Loop through each repo
# -------------------------------------------------------------------
Write-Host ""
Write-Host "[2/3] Fetching collaborators and READMEs..." -ForegroundColor Cyan

$csvRows = @()

foreach ($repo in $reposJson) {
    $repoName = $repo.name
    Write-Host "  -> $repoName" -NoNewline

    # Topics
    if ($repo.repositoryTopics -and $repo.repositoryTopics.Count -gt 0) {
        $topics = ($repo.repositoryTopics | ForEach-Object { $_.name }) -join " | "
    } else {
        $topics = ""
    }

    # About / homepage link
    if ($repo.homepageUrl) { $aboutLink = $repo.homepageUrl } else { $aboutLink = "" }

    # Collaborators via API
    $collabRaw  = gh api "repos/$username/$repoName/collaborators" --jq '.[].login' 2>$null
    if ($collabRaw) {
        $collabList = ($collabRaw -split "`n" | Where-Object { $_ -and $_ -ne $username }) -join " | "
    } else {
        $collabList = ""
    }

    # README metadata
    $readmeJson = gh api "repos/$username/$repoName/readme" 2>$null
    $readmeMeta = $null
    if ($readmeJson) {
        try { $readmeMeta = $readmeJson | ConvertFrom-Json -ErrorAction Stop } catch { $readmeMeta = $null }
    }

    if ($readmeMeta -and $readmeMeta.path) {
        $readmeRepoPath = $readmeMeta.path
    } else {
        $readmeRepoPath = ""
    }

    # Download README
    $readmeLocalPath = ""
    if ($readmeMeta -and $readmeMeta.download_url) {
        try {
            $readmeContent  = Invoke-RestMethod -Uri $readmeMeta.download_url -ErrorAction Stop
            $safeFileName   = "${repoName}_README.md"
            $localFile      = "$readmesDir\$safeFileName"
            Set-Content -Path $localFile -Value $readmeContent -Encoding UTF8
            $readmeLocalPath = "readmes\$safeFileName"
            Write-Host "  [README saved]" -NoNewline -ForegroundColor Green
        } catch {
            Write-Host "  [README download failed]" -NoNewline -ForegroundColor Yellow
        }
    } else {
        Write-Host "  [no README]" -NoNewline -ForegroundColor DarkGray
    }

    Write-Host ""

    $csvRows += [PSCustomObject]@{
        REPO_NAME          = $repoName
        REPO_LINK          = $repo.url
        REPO_DESCRIPTION   = $repo.description
        REPO_ABOUT_LINK    = $aboutLink
        REPO_TOPICS        = $topics
        REPO_README_PATH   = $readmeLocalPath
        REPO_COLLABORATION = $collabList
    }
}

# -------------------------------------------------------------------
# 3) Write CSV
# -------------------------------------------------------------------
Write-Host ""
Write-Host "[3/3] Writing repos.csv..." -ForegroundColor Cyan
$csvRows | Export-Csv -Path $csvPath -NoTypeInformation -Encoding UTF8

Write-Host ""
Write-Host "Export complete!" -ForegroundColor Green
Write-Host "  CSV     : $csvPath"
Write-Host "  READMEs : $readmesDir"
Write-Host "  Total repos    : $($csvRows.Count)"
$withReadme = ($csvRows | Where-Object { $_.REPO_README_PATH -ne "" }).Count
Write-Host "  READMEs saved  : $withReadme"
