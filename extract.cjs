const fs = require('fs');
const lines = fs.readFileSync('C:\\Users\\blak_\\.gemini\\antigravity-ide\\brain\\6a987ef2-d8c2-4e8b-ad84-ad4fff47bd2a\\.system_generated\\logs\\transcript.jsonl', 'utf-8').trim().split('\n');
for (const line of lines) {
  if (line.includes('header/1/index.astro')) {
    try {
      const obj = JSON.parse(line);
      if (obj.tool_calls) {
        for (const tc of obj.tool_calls) {
          if (tc.name === 'write_to_file' && tc.args.TargetFile.includes('header/1/index.astro')) {
            console.log('Found write_to_file at step', obj.step_index);
            fs.writeFileSync('header-dump.txt', tc.args.CodeContent);
          }
          if (tc.name === 'multi_replace_file_content' && tc.args.TargetFile.includes('header/1/index.astro')) {
            console.log('Found multi_replace_file_content at step', obj.step_index);
            fs.appendFileSync('header-dump.txt', JSON.stringify(tc.args.ReplacementChunks, null, 2));
          }
        }
      }
    } catch (e) { }
  }
}
