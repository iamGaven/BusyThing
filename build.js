// build.js - Cross-platform build script
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Building TypeScript...');
execSync('tsc', { stdio: 'inherit' });

console.log('Copying sounds folder...');
const sourceDir = path.join(__dirname, 'sounds');
const destDir = path.join(__dirname, 'dist', 'sounds');

// Function to copy directory recursively
function copyDir(src, dest) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  copyDir(sourceDir, destDir);
  console.log('✓ Sounds folder copied successfully');
} catch (error) {
  console.error('Error copying sounds folder:', error);
  process.exit(1);
}

console.log('Build complete!');