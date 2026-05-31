const fs = require('fs');
const path = require('path');
function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (full.endsWith('.astro') || full.endsWith('.ts') || full.endsWith('.json')) {
      let content = fs.readFileSync(full, 'utf-8').trim();
      if (content.startsWith('"') && content.endsWith('"')) {
        try {
          let p = JSON.parse(content);
          if (typeof p === 'string') {
            fs.writeFileSync(full, p);
            console.log('Fixed', full);
          }
        } catch(e) {
          console.log('JSON parse failed for', full);
        }
      }
    }
  }
}
walk('src');
