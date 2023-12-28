const fs = require('fs');
const UglifyJS = require('uglify-js');

const inputFile = 'widget.js';
const outputFile = 'widget.min.js';

const code = fs.readFileSync(inputFile, 'utf8');

const options = {
    // comments: 'all',
    compress: {
        sequences: false,
    },
    mangle: {
        reserved: ['DiscordWidget', 'create', 'delete'],
    },
};

const result = UglifyJS.minify(code, options);

if (result.error) {
    console.error(`UglifyJS Error: ${result.error.message}`);
} else {
    fs.writeFileSync(
        outputFile, 
        result.code
            .replace(/\n/g, '')
        , 
        'utf8'
    );
    console.log('Code minified successfully.');
}