import fs from 'fs';

// Take input data from the user using console and write it into file
// const writableStream = fs.createWriteStream('log.txt');
// process.stdin.pipe(writableStream);

// console.log() internally uses the readableStream 
// Read from file
const readableStream = fs.createReadStream('log.txt');
readableStream.pipe(process.stdout);

