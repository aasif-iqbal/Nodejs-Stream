import { Transform }from 'stream';

const uppercaseWordProcessing = new Transform({
    
    transform(chunks, encoding, callback) {
        const finalString = chunks.toString().upperCase();
    } 
})

export {
    uppercaseWordProcessing
}