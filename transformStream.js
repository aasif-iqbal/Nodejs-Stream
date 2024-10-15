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
    const outputWriteStream = fs.createWriteStream('output.txt', sampleReadStream);


    sampleReadStream.on('data', (chunk) => {
        const upperCaseSample = chunk.toString().toUpperCase();
        console.log(upperCaseSample);
        
        // replace `authorship` to `**********` in sample.txt
        const finalString = upperCaseSample.replaceAll('/authorship/gi', 'xxxx**@$**xxx') // g-> global, i->caseInSensetive

        outputWriteStream.write(finalString);
        return res.end();
        
    })

}

});

server.listen(PORT, () => {
    console.log(`server is listen to PORT ${PORT}`);
});
