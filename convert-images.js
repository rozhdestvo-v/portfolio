const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'src', 'images');
const files = fs.readdirSync(imagesDir).filter(f => f.match(/\.(png|jpg|jpeg|webp)$/i));

const output = [];

files.forEach(file => {
  const filePath = path.join(imagesDir, file);
  const data = fs.readFileSync(filePath);
  const base64 = data.toString('base64');
  const ext = path.extname(file).toLowerCase();
  const mime = ext === '.png' ? 'image/png' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/webp';
  const varName = file.replace(/\./g, '_').replace(/^[0-9]/, '_$&');
  output.push({ name: varName, base64: `data:${mime};base64,${base64}` });
});

console.log(JSON.stringify(output, null, 2));
