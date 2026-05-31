const fs = require('fs');
const transcriptPath = 'C:/Users/blak_/.gemini/antigravity-ide/brain/6a987ef2-d8c2-4e8b-ad84-ad4fff47bd2a/.system_generated/logs/transcript.jsonl';
const lines = fs.readFileSync(transcriptPath, 'utf-8').trim().split('\n');

for (const line of lines) {
  try {
    const log = JSON.parse(line);
    if (log.source === 'MODEL' && log.tool_calls) {
      for (const tc of log.tool_calls) {
        if (!tc.args || !tc.args.TargetFile) continue;
        let file = tc.args.TargetFile;
        if (typeof file === 'string' && file.startsWith('"')) {
            try { file = JSON.parse(file); } catch(e) {}
        }
        if (!file.includes('src') && !file.includes('landmaker.config')) continue;

        if (tc.name === 'write_to_file') {
          let content = tc.args.CodeContent;
          if (typeof content === 'string' && content.startsWith('"')) {
            try { content = JSON.parse(content); } catch(e) {}
          }
          fs.writeFileSync(file, content);
        }
        else if (tc.name === 'replace_file_content') {
          if (!fs.existsSync(file)) continue;
          let content = fs.readFileSync(file, 'utf-8');
          let target = tc.args.TargetContent;
          let repl = tc.args.ReplacementContent;
          if (typeof target === 'string' && target.startsWith('"')) { try { target = JSON.parse(target); } catch(e) {} }
          if (typeof repl === 'string' && repl.startsWith('"')) { try { repl = JSON.parse(repl); } catch(e) {} }
          
          if (content.includes(target)) {
            fs.writeFileSync(file, content.replace(target, repl));
          }
        }
        else if (tc.name === 'multi_replace_file_content') {
          if (!fs.existsSync(file)) continue;
          let content = fs.readFileSync(file, 'utf-8');
          let chunks = tc.args.ReplacementChunks;
          if (typeof chunks === 'string') { try { chunks = JSON.parse(chunks); } catch(e) {} }
          for (const chunk of chunks) {
            let target = chunk.TargetContent;
            let repl = chunk.ReplacementContent;
            if (content.includes(target)) {
              content = content.replace(target, repl);
            }
          }
          fs.writeFileSync(file, content);
        }
      }
    }
  } catch(e) {
  }
}
console.log('Restoration complete.');
