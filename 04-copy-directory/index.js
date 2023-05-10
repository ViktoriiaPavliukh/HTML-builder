const fs = require('fs').promises;
const path = require('path');

async function copyDir() {
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
    const copyFile = path.join(copyDirectory, file);
    await fs.copyFile(srcFile, copyFile);
  }

   async function removeCopy(file) {
    const copyFile = path.join(copyDirectory, file);
    await fs.unlink(copyFile);
  }

  await Promise.all(files.map(makeCopy));

  fs.watch(srcDirectory, async (event, filename) => {
    if (event === 'change') {
      makeCopy(filename);
    } else if (event === 'unlink') {
      await removeCopy(filename);
    }
  });
}

copyDir();

