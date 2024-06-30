# PowerShell script that will install dependences
#
# Copyright (C) 2016 - 2024 CyberDay Studios. All right reserved.
# Copyright (C) 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024 Nguyen Duy Thanh. All right reserved.
#
#

## Create React project using Vite
## Ask project name from user

cls

$CurrentPath = "${PWD}"
$DestinationPath = Read-Host -Prompt 'Enter your directory that will contains your new project (Full Path)'
$ProjectName = Read-Host -Prompt 'Enter your project name'

if ($DestinationPath -eq "") {
    Write-Host "Directory must not be null"
    Break
} else {
    if ($ProjectName -eq "") {
        Write-Host "Project name must not be null"
        Break
    } else {
        if (Test-Path "${DestinationPath}") {
            Write-Host "${DestinationPath} already exists."
        } else {
            Write-Host "Creating ${DestinationPath}"
            mkdir "${DestinationPath}"
        }
    }
}

cd "${DestinationPath}" ;
npm create vite@latest $ProjectName ;
cd $ProjectName ;
npm install ;
npm i --save-dev axios ;
npm i --save-dev json-server ;
npm i --save bootstrap @popperjs/core ;
npm i --save-dev sass ;
npm i --save @fortawesome/fontawesome-svg-core ;
npm i --save @fortawesome/free-solid-svg-icons ;
npm i --save @fortawesome/free-regular-svg-icons ;
npm i --save @fortawesome/free-brands-svg-icons ;
npm i --save @fortawesome/react-fontawesome@latest ;
npm i --save react-bootstrap

Write-Host
Write-Host
Write-Host "Created ${ProjectName} at ${DestinationPath}."
Write-Host
Write-Host "Happy coding!"