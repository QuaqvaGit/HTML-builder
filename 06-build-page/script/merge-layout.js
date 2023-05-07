const path = require('path');
const fs = require('fs');

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

module.exports = {
    mergeHTML
}