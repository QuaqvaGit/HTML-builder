const path = require('path');
const fs = require('fs');

const FOLDER_NAME = 'files';
const FOLDER_COPY_NAME = FOLDER_NAME + '-copy';
const DIR_PATH = path.resolve(__dirname, FOLDER_NAME);
const DIR_COPY_PATH = path.resolve(__dirname, FOLDER_COPY_NAME);

function makeDir(source, destination) {
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
        if (file.isDirectory()) makeDir(filePath, fileCopyPath);
        else fs.copyFile(filePath, fileCopyPath, (err) => {
              if (err) throw err;
            });
      });
      console.log(`Folder ${source} was successfully copied to ${destination}!`);
    });
}

makeDir(DIR_PATH, DIR_COPY_PATH);
