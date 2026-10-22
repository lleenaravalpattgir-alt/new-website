import fs from 'fs';

const xml = fs.readFileSync('roadmap_temp/word/document.xml', 'utf8');
l
// Replace paragraphs and line breaks
let text = xml
  .replace(/<w:p[ >]/g, '\n\n')
  .replace(/<w:br[ \/]*>/g, '\n')
  .replace(/<w:tab[ \/]*>/g, '\t')
  .replace(/<[^>]+>/g, '')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&apos;/g, "'");

// Clean up extra blank lines
const lines = text.split('\n').map(l => l.trim()).filter((l, i, arr) => l.length > 0 || (i > 0 && arr[i-1].length > 0));
const cleanText = lines.join('\n');

fs.writeFileSync('Rise_Advisory_Growth_Roadmap_Extracted.txt', cleanText, 'utf8');
console.log('Saved extracted roadmap text. Length:', cleanText.length, 'characters.');
