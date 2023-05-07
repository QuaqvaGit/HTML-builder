const path = require('path');
const fs = require('fs');

function makeCopiedDir(source, destination) {
  fs.mkdir(destination, {recursive: true}, (err, path) => {
      if (err) throw err;
      if (path) console.log(`Folder ${destination} was created successfully!`);
      copyDir(source, path || destination);
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

module.exports = {
  makeCopiedDir
};
