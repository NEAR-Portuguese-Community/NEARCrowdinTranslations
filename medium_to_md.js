const mediumToMarkdown = require('medium-to-markdown');

mediumToMarkdown.convertFromUrl('<medium-link>')
.then(function (markdown) {
  console.log(markdown);
});

// Install dependencies: npm i medium-to-markdown
// How to execute: node medium_to_md.js > <target-file>.md

// More info: https://www.npmjs.com/package/medium-to-markdown
