"use strict";
/*
    How to use:
    $ node index.js < inputFile: input sbgn xml file-name or file-path> < outputFile: output file-path to save>

    params:
    inputFile = 'activated_stat1alpha_induction_of_the_irf1_gene.xml'
    outputFile = 'cyGraph.txt'
*/
//-- package use
let fs = require('fs');
let UseFunction = require('./useFunction');
//-- main
//params
let myArgs = process.argv.slice(2);
let inputFile = myArgs[0]; // inputFile = 'activated_stat1alpha_induction_of_the_irf1_gene.xml';
let outputFile = myArgs[1]; // outputFile = 'cyGraph.txt'
if (!inputFile || !outputFile) {
    throw new Error('Sorry, plz give me Input File Path & Out File Path !!');
}
try {
    inputFile = myArgs[0]; //file name or path
    fs.readFile(inputFile, 'utf8', (err, data) => {
        if (err) {
            throw new Error(`-- Read File Error: ${err}`);
        }
        let { code, msg } = UseFunction.processTheSbgnXmlFile(data);
        if (code === 500) {
            throw new Error(msg);
        }
        //output to JSON string!
        fs.writeFileSync(outputFile, JSON.stringify(msg));
    });
}
catch (e) {
    throw new Error(`-- Read The SbgnXml File Error: ${e}`);
}
