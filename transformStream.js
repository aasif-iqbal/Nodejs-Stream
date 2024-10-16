import http from 'http';
import fs from 'fs';

const PORT = 5000;

const server = http.createServer((req, res) => {
    
    if(req.url == '/'){
        
        console.log('ended..')    
        return res.end();        
    }

    console.log('here', req.url)
    

    // Stream Processing || video processing || audio processing
    // Task: Do upperCase all words & replace `authorship` to `**********` in sample.txt
    if(req.url == '/transform'){

    
    const sampleReadStream = fs.createReadStream('sample.txt');
    const outputWriteStream = fs.createWriteStream('output.txt');

    // pipeline(sampleFileStream,
    //     replaceWordProcessing,
    //     uppercaseWordProcessing,
    //     outputWritableStream,
    //     (err) => {
    //         if (err) {
    //             console.log('Error handling here...', err);
    //         }
    //     }
    //     )

    sampleReadStream.on('data', (chunk) => {
        // const regex = '/imagery/gi';
        const finalString = chunk.toString().replaceAll(/imagery/gi, 'abcdefg');
        
        
        // replace `authorship` to `**********` in sample.txt
        // Real time useage: Bank email where account details is hide(replace by xxxxxx)
        
        
        // g-> global, i->caseInSensetive
        console.log(finalString);
        outputWriteStream.write(finalString);
        
        
    })

}
res.end();
});

server.listen(PORT, () => {
    console.log(`server is listen to PORT ${PORT}`);
});
