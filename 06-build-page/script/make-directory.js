const fs = require('fs');

function makeDir(destination, callback) {
  fs.mkdir(destination, {recursive: true}, (err, path) => {
      if (err) throw err;
      if (path) console.log(`Folder ${destination} was created successfully!`);
      callback();
    });
}

module.exports = {
  makeDir,
};
