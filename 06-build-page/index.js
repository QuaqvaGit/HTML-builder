const path = require('path');
const fs = require('fs');

function makeCopiedDir(source, destination) {
  fs.rm(destination, {recursive: true, force: true}, (err) => {
    if (err) throw err;
    fs.mkdir(destination, {recursive: true}, (err, path) => {
      if (err) throw err;
      if (path) console.log(`Folder ${destination} was created successfully!`);
      copyDir(source, path || destination);
    });
  });
}

function copyDir(source, destination) {
  fs.readdir(source, {withFileTypes: true}, (err, entries) => {
      if (err) throw err;
      entries.forEach(file => {
        const filePath = path.resolve(source, file.name);
        const fileCopyPath = path.resolve(destination, file.name);
        if (file.isDirectory()) makeCopiedDir(filePath, fileCopyPath);
        else fs.copyFile(filePath, fileCopyPath, (err) => {
              if (err) throw err;
            });
      });
      console.log(`Folder ${source} was successfully copied to ${destination}!`);
    });
}

function makeDir(destination, callback) {
  fs.rm(destination, { recursive: true, force: true }, (err) => {
   if (err) throw err;
   fs.mkdir(destination, {recursive: true}, (err, path) => {
    if (err) throw err;
    if (path) console.log(`Folder ${destination} was created successfully!`);
    callback();
  });
  })
}

function readFile (filePath, obj, endCallback) {
  const readStream = fs.createReadStream(filePath, 'utf-8');
  readStream.on('data', (data) => obj.result += data);
  readStream.on('end', endCallback);
}

function writeToFile(data, destination) {
  //Create file
  fs.writeFile(destination,
    '',
    (err) => {
      if (err) throw err;
      //Write to file
      const writeStream = fs.createWriteStream(destination, 'utf-8');
      writeStream.write(data);
      console.log(`File ${destination} was successfully created!`);
    });
}

function mergeHTML(mainSource, compontentsSource, destination) {
  let resultHtmlObj = {
    result: ''
  };

  readFile(mainSource, resultHtmlObj, () => {
    let resultHTML = resultHtmlObj.result;
    const componentRegex = /\{\{[a-zA-Z]+\}\}/gi;
    const foundComponents = [...resultHTML.matchAll(componentRegex)];
    foundComponents.forEach(component => {
      const componentName = component[0].substring(2, component[0].length - 2);
      const fileName = path.resolve(compontentsSource, componentName + '.html');
      let resultObj = {
        result: ''
      };
      readFile(fileName,
         resultObj,
         () => {
           resultHTML = resultHTML.replace(component[0], resultObj.result);
           if (!resultHTML.match(componentRegex)) writeToFile(resultHTML, destination);
         }
        );
    });
  });
}

//read Files
function mergeStyles(source, destination) {
  let cssFiles;
  fs.readdir(source, {withFileTypes: true}, (err, entries) => {
    if (err) throw err;
    cssFiles = entries.filter(entry => entry.isFile() 
    && entry.name.split('.')[1] === 'css');
    mergeFiles(cssFiles, source, destination);
  });
}

function mergeFiles(cssFiles, source, destination) {
  //Create file
  fs.writeFile(destination,
    '',
    (err) => {
      if (err) throw err;
      //Open write stream
      const writeStream = fs.createWriteStream(destination, 'utf-8');
      //Write files
      cssFiles.forEach(file => {
        const readStream = fs.createReadStream(path.resolve(source, file.name), 'utf-8');
        readStream.pipe(writeStream);
      });
      console.log(`CSS successfully bundled!`);
    });
}

const ASSETS_PATH = path.resolve(__dirname, 'assets');
const STYLES_PATH = path.resolve(__dirname, 'styles');
const COMPONENTS_PATH = path.resolve(__dirname, 'components');
const DIST_DIR_PATH = path.resolve(__dirname, 'project-dist');
const TEMPLATE_PATH = path.resolve(__dirname, 'template.html');

//Create ./project-dist
//const { makeDir } = require('./script/make-directory');
makeDir(DIST_DIR_PATH, () => {
  //Copy assets to ./project-dist
  //const { makeCopiedDir } = require('./script/copy-directory');
  makeCopiedDir(ASSETS_PATH, path.resolve(DIST_DIR_PATH, 'assets'));
  
  //const { mergeStyles } = require('./script/merge-styles');
  mergeStyles(STYLES_PATH, path.resolve(DIST_DIR_PATH, 'style.css'));
  
  //const { mergeHTML } = require('./script/merge-layout');
  mergeHTML(TEMPLATE_PATH, COMPONENTS_PATH, path.resolve(DIST_DIR_PATH, 'index.html'));
});

