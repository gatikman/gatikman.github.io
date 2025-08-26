#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  // Paths
  const repoRoot = path.resolve(__dirname, '..');
  const publicDir = path.join(repoRoot, 'public');
  const mdPath = path.join(publicDir, 'files', 'resume.md');
  const photoPath = path.join(publicDir, 'images', 'photo.png');
  const outPdf = path.join(publicDir, 'files', 'resume.pdf');

  // Read content
  const [md, photoExists] = await Promise.all([
    fs.readFile(mdPath, 'utf8'),
    fs
      .stat(photoPath)
      .then(() => true)
      .catch(() => false),
  ]);

  if (!photoExists) {
    throw new Error(`Photo not found at ${photoPath}`);
  }

  // Configure marked for GFM
  marked.setOptions({
    gfm: true,
    breaks: false,
    headerIds: true,
    mangle: false,
  });

  const htmlFromMd = marked.parse(md);

  const photoFileUrl = new URL(`file://${photoPath}`);

  // Parse Technical Skills section into structured data
  function parseSkills(markdown) {
    const lines = markdown.split(/\r?\n/);
    const startIdx = lines.findIndex((l) => l.trim().toLowerCase().startsWith('### technical skills'));
    if (startIdx === -1) return [];
    // capture until next ### heading or end
    let i = startIdx + 1;
    const section = [];
    while (i < lines.length) {
      const line = lines[i];
      if (/^###\s+/i.test(line)) break;
      if (line.trim()) section.push(line.trim());
      i++;
    }

    // Helper to split by commas outside parentheses
    const splitSmart = (s) => {
      const out = []; let buf = ''; let depth = 0;
      for (const ch of s) {
        if (ch === '(') depth++;
        if (ch === ')') depth = Math.max(0, depth - 1);
        if (ch === ',' && depth === 0) { out.push(buf.trim()); buf = ''; }
        else { buf += ch; }
      }
      if (buf.trim()) out.push(buf.trim());
      return out;
    };

    const skills = [];
    for (const l of section) {
      const m = /^-\s*\*\*(.+?)\*\*:?\s*(.+)?$/.exec(l);
      if (!m) continue;
      const labelRaw = m[1].trim();
      const itemsRaw = (m[2] || '').trim();
      if (!itemsRaw) { skills.push({ label: labelRaw, items: [] }); continue; }

      const tokens = splitSmart(itemsRaw);
      const items = [];
      for (let t of tokens) {
        t = t.trim().replace(/^[-–•]\s*/, '');
        // Expand patterns like "Node.js (Fastify)" or "Unit Testing (Jest, React Testing Library)"
        const pm = /^(.*?)\s*\((.+)\)$/.exec(t);
        if (pm) {
          const base = pm[1].trim();
          if (base) items.push(base);
          splitSmart(pm[2]).forEach((x) => items.push(x.trim()));
        } else {
          items.push(t);
        }
      }

      // Normalize label e.g., "Backend (supporting experience)" -> "Backend"
      const label = labelRaw.replace(/\s*\(.+?\)\s*$/, '').trim();
      // Deduplicate while preserving order
      const seen = new Set();
      const uniq = items.filter((x) => {
        const key = x.replace(/\s+/g, ' ').trim();
        if (!key) return false;
        if (seen.has(key.toLowerCase())) return false;
        seen.add(key.toLowerCase());
        return true;
      });
      skills.push({ label, items: uniq });
    }
    return skills;
  }

  const skills = parseSkills(md);

  // HTML template with modern, printable styling (A4)
  const html = `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Resume — Frontend Developer</title>
      <style>
        :root {
          --bg: #ffffff;
          --ink: #0f172a; /* slate-900 */
          --sub: #334155; /* slate-700 */
          --muted: #475569; /* slate-600 */
          --line: #e2e8f0; /* slate-200 */
          --brand1: #0ea5e9; /* sky-500 */
          --brand2: #7c3aed; /* violet-600 */
        }
        @page { size: A4; margin: 16mm; }
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; }
        body {
          background: var(--bg);
          color: var(--ink);
          font: 12px/1.5 -apple-system, BlinkMacSystemFont, Segoe UI, Inter, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .sheet {
          display: grid;
          grid-template-columns: 1fr 200px;
          gap: 20px;
        }
        header {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: 1fr 160px;
          gap: 20px;
          align-items: center;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--line);
        }
        .title {
          margin: 0 0 6px 0;
          font-weight: 900;
          font-size: 26px;
          letter-spacing: -0.02em;
          background: linear-gradient(90deg, var(--ink), var(--brand1) 45%, var(--brand2));
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .subtitle { margin: 0; color: var(--sub); font-weight: 600; }
        .photo {
          width: 110px;
          height: 110px;
          object-fit: cover;
        }
        .content { grid-column: 1 / -1; display: grid; grid-template-columns: 1fr 200px; gap: 18px; }
        .main { padding-top: 12px; }
        .aside { padding-top: 12px; display: flex; flex-direction: column; gap: 8px; }
        .aside-section {
          border-radius: 12px;
          background: linear-gradient(#ffffff,#ffffff) padding-box,
                      linear-gradient(120deg, rgba(14,165,233,0.6), rgba(124,58,237,0.6)) border-box;
          border: 1px solid transparent;
          padding: 10px 12px;
          break-inside: avoid;
        }
        .aside-title {
          margin: 0 0 4px 0; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted);
        }
        .chips { display: flex; flex-wrap: wrap; gap: 4px; }
        .chip {
          display: inline-block; padding: 3px 8px; border-radius: 999px; border: 1px solid var(--line); color: var(--muted);
          background: rgba(2,6,23,0.02);
        }
        /* Markdown typography */
        .md h2 { font-size: 16px; margin: 14px 0 8px; letter-spacing: -0.01em; }
        .md h3 { font-size: 13px; margin: 10px 0 4px; }
        .md p { margin: 6px 0; color: var(--sub); }
        .md ul { margin: 6px 0 8px 18px; }
        .md li { margin: 3px 0; }
        .md hr { border: none; border-top: 1px solid var(--line); margin: 12px 0; }
        .md a { color: var(--brand1); text-decoration: none; border-bottom: 1px solid rgba(14,165,233,0.35); }
        .section { margin-bottom: 8px; }
      </style>
    </head>
    <body>
      <div class="sheet">
        <header>
          <div>
            <h1 class="title">Alejandro Gatica</h1>
            <p class="subtitle">Frontend Developer · React · TypeScript</p>
          </div>
          <img class="photo" src="${photoFileUrl.href}" alt="Profile photo" />
        </header>
        <div class="content">
          <div class="main md">${htmlFromMd}</div>
          <aside class="aside">
            ${skills
              .map((group) => `
                <section class="aside-section">
                  <h4 class="aside-title">${group.label}</h4>
                  <div class="chips">
                    ${group.items
                      .map((it) => `<span class="chip">${it.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</span>`) 
                      .join('')}
                  </div>
                </section>
              `)
              .join('')}
          </aside>
        </div>
      </div>
    </body>
  </html>`;

  // Write a temp HTML to load via file:// to ensure local assets resolve
  const tmpHtmlPath = path.join(publicDir, 'files', '__resume_preview.html');
  await fs.writeFile(tmpHtmlPath, html, 'utf8');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--font-render-hinting=medium'],
  });
  try {
    const page = await browser.newPage();
    await page.goto(`file://${tmpHtmlPath}`, { waitUntil: 'networkidle0' });
    await page.pdf({
      path: outPdf,
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', right: '10mm', bottom: '12mm', left: '10mm' },
    });
    console.log(`✅ Resume PDF generated at: ${outPdf}`);
  } finally {
    await browser.close();
    // Clean up temp file
    await fs.unlink(tmpHtmlPath).catch(() => {});
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
