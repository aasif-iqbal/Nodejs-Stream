import http from "http";
import fs from "fs";
import { replaceWordProcessing } from "./replaceWordStream.js";
import { uppercaseWordProcessing } from "./upperCaseWordProcess.js";
import { Transform, pipeline } from "stream";

const PORT = 5000;

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    console.log("ended..");
    return res.end();
  }

  console.log("here", req.url);

  // Stream Processing || video processing || audio processing
  // Task: Do upperCase all words & replace `authorship` to `**********` in sample.txt
  if (req.url == "/transform") {
    const sampleReadStream = fs.createReadStream("sample.txt");
    const outputWriteStream = fs.createWriteStream("output.txt");

    //  Can be done by using transfrom
    // sampleReadStream.on('data', (chunk) => {
    //     // Real time useage: Bank email where account details is hide(replace by xxxxxx)
    //     const finalString = chunk.toString().replaceAll(/imagery/gi, 'abcdefg');

    //     // g-> global, i->caseInSensetive
    //     console.log(finalString);
    //     outputWriteStream.write(finalString);
    // })

    // const replaceWordProcessing = new Transform({
    //     transform(chunk, encoding, callback){
    //         const finalString = chunk.toString().replaceAll(/imagery/gi, 'XABCDEFX');
    //         callback(null, finalString);
    //     }
    // })

    
    // Bad way 
    // Problem with below method: Memory leak, & if any processing(pipe) does not work gives error then it leads to memory leak.
    //ReadableStream.pipe(writeableStream).pipe(writeableStream)
    /*
    sampleReadStream
      .pipe(replaceWordProcessing)
      .pipe(uppercaseWordProcessing)
      .pipe(outputWriteStream);
       */


      // good way to do
  pipeline(
    sampleReadStream,
    replaceWordProcessing,
    uppercaseWordProcessing,
    outputWriteStream,
    (err) => {
      if (err) {
        console.log("Error handling here...", err);
      }
    }
  );
  }
   
  

  res.end();
});

server.listen(PORT, () => {
  console.log(`server is listen to PORT ${PORT}`);
});
