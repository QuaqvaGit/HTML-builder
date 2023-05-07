const fs = require('fs');
const path = require('path');

const FILE_NAME = 'text.txt';
const fileStream = fs.createReadStream(path.resolve(__dirname, FILE_NAME), 'utf-8');

let data = '';
fileStream.on('data', (chunk) => data += chunk);
fileStream.on('end', () => console.log(`В файле ${FILE_NAME} содержится сообщение:\n${data}`));
