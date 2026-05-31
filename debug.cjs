const fs = require('fs');
const content = fs.readFileSync('src/layouts/Layout.astro', 'utf-8');
console.log('Starts with quote?', content.startsWith('"'));
console.log('First 5 chars:', content.substring(0, 5));
console.log('Ends with quote?', content.trim().endsWith('"'));
console.log('Last 5 chars:', content.trim().slice(-5));
