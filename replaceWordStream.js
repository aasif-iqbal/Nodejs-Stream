import { Transform } from 'stream';

const replaceWordProcessing = new Transform({

    transform(chunk, encoding, callback){

        //simulate error    
        // replaceWordProcessing.emit('error', new Error('something went wrong'))

            const finalString = chunk.toString().replaceAll(/imagery/gi, 'X-ABCDEF-X');
            callback(null, finalString);
        }
})

export {
    replaceWordProcessing
}