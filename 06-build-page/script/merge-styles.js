const path = require('path');
const fs = require('fs');

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

module.exports = {
  mergeStyles
}