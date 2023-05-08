const fs = require('fs');
const path = require('path');

const styleFolder = path.join(__dirname, 'styles');
const distDir = path.join(__dirname, 'project-dist');


function readDir(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        return reject(err);
      }

      resolve(files);
    });
  });
}
function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  });
}

function writeFile(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, 'utf8', (err) => {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
}

async function buildStylesBundle() {
  try {
    const files = await readDir(styleFolder);

    const cssFiles = files.filter(file => {
      const ext = path.extname(file);
      return ext === '.css';
    })

    const stylesData = await Promise.all(
      cssFiles.map(file => {
        const filePath = path.join(styleFolder, file);
        return readFile(filePath);
      })
    );

    const bundlePath = path.join(distDir, 'bundle.css');
    const bundleData = stylesData.join('\n');

    await writeFile(bundlePath, bundleData);
    console.log('Styles bundle created');
  } catch (error) {
    console.error('Error occured', error);
  }
}

buildStylesBundle();
