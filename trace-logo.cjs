const fs = require('fs');
const potrace = require('potrace');

const inputFile = './public/logo.png';
const outputFile = './public/logo.svg';

potrace.trace(inputFile, function (err, svg) {
    if (err) throw err;
    fs.writeFileSync(outputFile, svg);
    console.log('Successfully traced logo.png to logo.svg');
});
