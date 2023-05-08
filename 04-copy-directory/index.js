const fs = require('fs').promises;
const path = require('path');

async function copyDirectory() {
  const srcDirectory = path.join(__dirname, 'files');
  const copyDirectory = path.join(__dirname, 'files-copy');

  try {
    await fs.access(copyDirectory);
  } catch (error) {
    await fs.mkdir(copyDirectory, { recursive: true });
  }

  const files = await fs.readdir(srcDirectory);

  async function makeCopy(file) {
    const srcFile = path.join(srcDirectory, file);
    const newFile = path.join(copyDirectory, file);
    await fs.copyFile(srcFile, newFile);
  }

  await Promise.all(files.map(makeCopy));

  fs.watch(srcDirectory, (event, filename) => {
    if (event === 'change') {
      makeCopy(filename);
    }
  });
}

copyDirectory();

