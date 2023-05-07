const path = require('path');
const fs = require('fs');
const { stdout, stdin } = process;

const FILE_NAME = 'output.txt';
const FILE_PATH = path.resolve(__dirname, FILE_NAME);
fs.writeFile(FILE_PATH,
    '',
    (err) => {
      if (err) throw err;
      console.log(`--- ${FILE_NAME} успешно создан ---`);
      main();
    });

function main() {
  console.log('Привет! Готовы записать пару строк??');
  const fileStream = fs.createWriteStream(FILE_PATH, 'utf-8');  

  process.on('exit', () => stdout.write('\nЗавершение работы...'));
  process.on('SIGINT', () => process.exit(0));
  
  stdout.write('Введите текст для записи >> ');
  stdin.on('data', (data) => {
    if (data.toString().trim() === 'exit') process.exit(0);
    else {
      fileStream.write(data);
      stdout.write('Введите текст для записи >> ');
    }
  });
}


