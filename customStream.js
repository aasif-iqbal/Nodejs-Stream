import { Readable, Writable } from 'stream';

const readableStream = new Readable({
    highWaterMark: 2, // 2 bytes
    read(){}
});

const writableStream = new Writable({
    // write: function(){}
    write(buffer_data){
        console.log(buffer_data.toString());
    }
});

// console.log(readableStream); // here buffer is empty 

readableStream.on('data', (chunk) => {
    console.log('Data coming..', chunk.toString());

    writableStream.write(chunk);
    console.log(writableStream);
})

let text = 'hello how are you';
readableStream.push(text);

// console.log('read-buffer',readableStream); 
// here buffer: [ <Buffer 68 65 6c 6c 6f 20 68 6f 77 20 61 72 65 20 79 6f 75> ]

// HighWaterMark return bool value, if limits goes to above 2
console.log(readableStream.push(text)) // false , it mean we can not push more data on buffer limit excied to 2 bytes. 

/*
    create custom writable stream
*/ 

// const writableStream = new Writable({
//     // write: function(){}
//     write(buffer_data){
//         console.log(buffer_data.toString());
//     }
// });

// writableStream.write('Hello world');