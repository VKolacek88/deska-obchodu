# Deska obchodu

Interní přehledová deska (úkoly, nabídky, projekty, majetek, ETERN) pro obchodní
oddělení. Data i přihlašování běží na Supabase; tohle je jen webová aplikace nad tím.

## Jak to funguje
- `index-source.html` — čitelný zdrojový kód aplikace (tady se dělají úpravy).
- `build.mjs` — sestaví z něj jeden samostatný soubor `dist/index.html`.
- Netlify po každém pushi spustí `npm install && npm run build` a nasadí `dist/`.

## Úprava
1. Uprav `index-source.html`.
2. Commitni a pushni. Netlify sestaví a nasadí sám.
   (Lokálně vyzkoušíš: `npm install && npm run build`, pak otevři `dist/index.html`.)

## Nastavení Supabase
Adresa projektu a veřejný "publishable" klíč jsou vloženy přímo v `index-source.html`
(sekce "připojení k databázi"). Jsou určené pro použití v prohlížeči; přístup k datům
chrání přihlášení a pravidla (RLS) na straně Supabase.
