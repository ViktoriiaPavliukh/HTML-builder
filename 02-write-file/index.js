const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'text.txt');
const writeText = fs.createWriteStream(filePath, { flags: 'a'});

console.log('Please enter text');

const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '',
});

interface.on('line', (input) => {
  if(input.toLowerCase() === 'exit') {
    console.log('Bye');
    process.exit(0);
  } else {
    writeText.write(`${input}\n`)
  }
})

process.on('SIGINT', () => {
  process.stdout.write('See you!\n');
  writeText.end(() => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  process.stdout.write('See you!\n');
  writeText.end(() => {
    process.exit(0);
  });
});
