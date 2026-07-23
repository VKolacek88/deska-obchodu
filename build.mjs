// Sestaví z index-source.html jeden samostatný soubor dist/index.html
// (vloží dovnitř React, ReactDOM, Supabase a předkompiluje JSX), bez závislosti na CDN.
import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire(import.meta.url);
const babel = require('@babel/core');

const html = fs.readFileSync('index-source.html', 'utf8');
const start = html.indexOf('<script type="text/babel"');
const openEnd = html.indexOf('>', start) + 1;
const end = html.indexOf('</script>', openEnd);
const jsx = html.slice(openEnd, end);

const { code } = babel.transformSync(jsx, {
  presets: [['@babel/preset-react', { runtime: 'classic', development: false }]],
  compact: false,
});

const react = fs.readFileSync('node_modules/react/umd/react.production.min.js', 'utf8');
const reactDom = fs.readFileSync('node_modules/react-dom/umd/react-dom.production.min.js', 'utf8');
const supa = fs.readFileSync('node_modules/@supabase/supabase-js/dist/umd/supabase.js', 'utf8');

const out = `<!doctype html>
<html lang="cs">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>Deska obchodu</title>
<style>
html,body,#root{height:100%;margin:0}
body{background:#dde2da}
.nacitani{display:flex;align-items:center;justify-content:center;height:100%;font-family:system-ui,sans-serif;color:#5a675f;font-size:14px}
</style>
</head>
<body>
<div id="root"><div class="nacitani">Načítám…</div></div>
<script>${react}</script>
<script>${reactDom}</script>
<script>${supa}</script>
<script>${code}</script>
</body>
</html>`;

fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/index.html', out);
console.log('OK: dist/index.html', (out.length / 1024).toFixed(0) + ' KB');
