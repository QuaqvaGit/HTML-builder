const path = require('path');
const fs = require('fs');

const FOLDER_NAME = 'secret-folder';
const DIR_PATH = path.resolve(__dirname, FOLDER_NAME);
let files;
fs.readdir(DIR_PATH, {withFileTypes: true}, (err, entries) => {
  if (err) throw err;
  files = entries.filter(entry => entry.isFile());
  printFiles(files);
});

const BYTES_IN_KB = 1024;

function printFiles(files) {
  console.log(`Avaliable files in ${FOLDER_NAME}:`);
  files.forEach(file => {
    const [name, extension] = file.name.split('.');
    fs.stat(path.resolve(DIR_PATH, file.name), (err, stats) => {
      if (err) throw err;
      const weight = stats.size / BYTES_IN_KB;
      console.log(`${name} - ${extension} - ${weight}kB`);
    });
  })
}
