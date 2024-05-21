import { promises as fs } from 'fs';
import path from 'path';
import { exec } from 'child_process';

async function updatePackageJson() {
    // eslint-disable-next-line no-undef
    const packageJsonPath = path.join(process.cwd(), 'dist', 'package.json');
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));

    // Remove the private field
    delete packageJson.private;

    // Update main and types fields
    packageJson.main = "lib/main.js";
    packageJson.types = "lib/main.d.ts";
    const latestVersion = await getLatestPublishedVersion(packageJson.name);
    packageJson.version = incrementVersion(latestVersion);

    await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('package.json updated successfully');
}

updatePackageJson().catch(err => {
    console.error('Error updating package.json:', err);
    // eslint-disable-next-line no-undef
    process.exit(1);
});


async function getLatestPublishedVersion(packageName) {
    return new Promise((resolve, reject) => {
        exec(`npm show ${packageName} version`, (error, stdout, stderr) => {
            if (error) {
                reject(`Error getting latest version: ${stderr}`);
            } else {
                resolve(stdout.trim());
            }
        });
    });
}


function incrementVersion(version) {
    console.log('Incrementing version:', version);
    // Split the version string into an array of numbers
    let versionParts = version.split('.').map(Number);

    // Increment the patch version
    versionParts[2] += 1;

    // Handle overflow for patch version
    if (versionParts[2] >= 10) {
        versionParts[2] = 0;
        versionParts[1] += 1;
    }

    // Handle overflow for minor version
    if (versionParts[1] >= 10) {
        versionParts[1] = 0;
        versionParts[0] += 1;
    }

    // Join the parts back into a string
    return versionParts.join('.');
}



