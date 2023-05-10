const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');
const writeText = fs.createWriteStream(filePath);

process.stdout.write('Enter your text:');
process.stdin.on('data', function (data) {
    if (data.toString().trim() === 'exit') {
        process.stdout.write('Bye')
        process.exit();
    }
      writeText.write(data);
 });
 
 process.on('SIGINT', function(){
    process.stdout.write('See you')
    process.exit();
 });
