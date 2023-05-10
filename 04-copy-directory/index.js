const fs = require('fs/promises');
const path = require('path');

function copyDir() {
  const srcDirectory = path.join(__dirname, 'files');
  const copyDirectory = path.join(__dirname, 'files-copy');

    fs.rm(copyDirectory, { recursive: true, force: true })
    .then(() => fs.mkdir(copyDirectory, { recursive: true }))
    .then(() => fs.readdir(srcDirectory, { withFileTypes: true }))
    .then((data) => {
    data.forEach((item) => {
      if (item.isFile()) {
        const pathItem = path.join(srcDirectory, item.name);
        const pathItemDes = path.join(copyDirectory, item.name);
        fs.copyFile(pathItem, pathItemDes);
      }
    });
  })
}
  
copyDir();

