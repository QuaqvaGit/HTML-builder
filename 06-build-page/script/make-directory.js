const fs = require('fs');

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

module.exports = {
  makeDir,
};
