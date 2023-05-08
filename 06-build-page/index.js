const fs = require('fs-extra');
const path = require('path');


const folderPath = 'project-dist';
fs.access(folderPath).then(() => {
  console.log(`Directory ${folderPath} already exists`);
  processFiles();
}).catch(() => {
  fs.mkdir(folderPath).then(() => {
    console.log(`directory ${folderPath} created`);
    processFiles();
  }).catch((error) => {
    console.error(`Error: ${error}`);
  });
});

async function processFiles() {
  try{
    const stylesPath = 'styles';
    const styles = await fs.readdir(path.join(__dirname, stylesPath));
    const cssContent = await Promise.all(styles.map(async(file) => {
      const filePath = path.join(stylesPath, file);
      const content = await fs.readFile(filePath, 'utf8');
      return content;
    }));
    const css = cssContent.join('\n');
    await fs.writeFile('project-dist/style.css', css);
  
    let template = await fs.readFile('template.html', 'utf8');
    const components = 'components';
    const tags = template.match(/{{\w+}}/g) || [];

    for (const tag of tags) {
      const componentName = tag.slice(2, -2);
      const componentPath = path.join(components, `${componentName}.html`);
      const componentContent = await fs.readFile(componentPath, 'utf8');
      template = template.replace(tag, componentContent);
    }

    await fs.writeFile('project-dist/index.html', template);
   
    const assetsPath = 'assets';
    const assetsDest = path.join('project-dist', 'assets');
    await fs.copy(assetsPath, assetsDest);
    console.log('Succesfully generated');
  } catch (error) {
      console.error(`Error: ${error}`)
  }
}
