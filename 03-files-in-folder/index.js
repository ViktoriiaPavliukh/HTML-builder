const fs = require('fs/promises');
const path = require('path');

async function readSecretFolder() {
  try {
    const files = await fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true });
    files.forEach(async(file) => {
      if(file.isFile()) {
        const extName = path.extname(file.name);
        const stats = await fs.stat(path.join(__dirname, 'secret-folder', file.name));
        const fileSize = stats.size;
        console.log(`${file.name}-${extName}-${fileSize}`);
      }
    });
  } catch (err) {
    console.error(err);
  }
}

readSecretFolder();