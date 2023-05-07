const path = require('path');
const fs = require('fs');

const FILE_NAME = 'bundle.css';
const DEST_PATH = path.resolve(__dirname, 'project-dist', FILE_NAME);
const SOURCE_PATH = path.resolve(__dirname, 'styles');

//read Files
let cssFiles;
fs.readdir(SOURCE_PATH, {withFileTypes: true}, (err, entries) => {
    if (err) throw err;
    cssFiles = entries.filter(entry => entry.isFile() 
    && entry.name.split('.')[1] === 'css');
    mergeFiles(cssFiles, DEST_PATH);
  });

function mergeFiles(cssFiles, destination) {
  //Create file
  fs.writeFile(destination,
    '',
    (err) => {
      if (err) throw err;
      //Open write stream
      const writeStream = fs.createWriteStream(DEST_PATH, 'utf-8');
      //Write files
      cssFiles.forEach(file => {
        const readStream = fs.createReadStream(path.resolve(SOURCE_PATH, file.name), 'utf-8');
        readStream.pipe(writeStream);
      });
      console.log(`${FILE_NAME} was successfully created!`);
    });
}