import http from 'http';
import fs from 'fs';

const PORT = 5000;

const server = http.createServer((req, res) => {
    
    if(req.url == '/'){
        
        console.log('ended..')    
        return res.end();        
    }

    console.log('here', req.url)
    // download file - bad way
    // const file = fs.readFileSync('sample.txt');
    // return  res.end(file);

    // download file - good way
    if(req.url == '/read'){
        const readableStream = fs.createReadStream('sample.txt');
        // readableStreams -> writeableStreams   (we create pipe's here)
        readableStream.pipe(res);
    }
    
    // for mp4 - good way
    if(req.url == '/video'){
        const readableStream = fs.createReadStream('sample.mp4');
        res.writeHead(200, {'content-type':'video/mp4'});
        readableStream.pipe(res);
    }

    // copy big file - bad way
    if(req.url == '/copy'){
        const file = fs.readFileSync('sample.txt');
        fs.writeFileSync('output.txt', file);
        console.log('copy data...');
        res.end();
    }   

    // copy big file - good way
    if(req.url == '/copy-str'){
        const readStream = fs.createReadStream('sample.txt');
        const writeStream = fs.createWriteStream('output.txt');

        readStream.on('data', (chunk)=>{
            console.log('chunk:----------',chunk.toString());
            writeStream.write(chunk);
        })
        res.end();
    }

    // Stream Processing || video processing || audio processing


});

server.listen(PORT, () => {
    console.log(`server is listen to PORT ${PORT}`);
});
