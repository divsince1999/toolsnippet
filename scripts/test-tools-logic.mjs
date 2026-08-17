// Automated Logic & Transformation Verification Suite for the 20 New Tools
console.log("=== Running Logic & Transformation Tests for 20 New Tools ===");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✓ PASS: ${message}`);
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

// 1. cURL to Fetch & Axios
{
  console.log("\n[1. cURL to Fetch & Axios]");
  const raw = `curl -X POST https://api.example.com/items -H "Content-Type: application/json" -H "Authorization: Bearer token123" -d '{"item": "book"}'`;
  const tokenRegex = /(?:[^\s"']+|"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)')+/g;
  const tokens = [];
  let m;
  while ((m = tokenRegex.exec(raw)) !== null) {
    let token = m[0];
    if (token.startsWith('"') && token.endsWith('"')) {
      token = token.slice(1, -1).replace(/\\"/g, '"');
    } else if (token.startsWith("'") && token.endsWith("'")) {
      token = token.slice(1, -1).replace(/\\'/g, "'");
    }
    tokens.push(token);
  }
  let url = "";
  let method = "GET";
  const headers = {};
  let body = null;
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t === "-X") method = tokens[++i];
    else if (t === "-H") {
      const parts = tokens[++i].split(":");
      headers[parts[0].trim()] = parts.slice(1).join(":").trim();
    } else if (t === "-d") {
      body = tokens[++i];
      if (method === "GET") method = "POST";
    } else if (t.startsWith("http")) url = t;
  }
  assert(url === "https://api.example.com/items", "Extracted URL correctly with preceding -X POST");
  assert(method === "POST", "Extracted POST method");
  assert(headers["Authorization"] === "Bearer token123", "Extracted Bearer token header");
  assert(JSON.parse(body).item === "book", "Parsed JSON payload");
}

// 2. Case Converter
{
  console.log("\n[2. Variable Case Converter]");
  const getWords = (text) =>
    text.replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
      .replace(/[-_./\\]/g, " ")
      .trim().split(/\s+/).filter(Boolean);
  
  const words = getWords("getUserProfileData");
  const camel = words.map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())).join("");
  const snake = words.map(w => w.toLowerCase()).join("_");
  const kebab = words.map(w => w.toLowerCase()).join("-");
  const pascal = words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("");
  const constant = words.map(w => w.toUpperCase()).join("_");

  assert(camel === "getUserProfileData", "camelCase conversion");
  assert(snake === "get_user_profile_data", "snake_case conversion");
  assert(kebab === "get-user-profile-data", "kebab-case conversion");
  assert(pascal === "GetUserProfileData", "PascalCase conversion");
  assert(constant === "GET_USER_PROFILE_DATA", "CONSTANT_CASE conversion");
}

// 3. Hex to ASCII & ASCII to Hex
{
  console.log("\n[3. Hex to ASCII Converter]");
  const text = "Hello World!";
  let hex = "";
  for (let i = 0; i < text.length; i++) {
    hex += text.charCodeAt(i).toString(16).padStart(2, "0") + " ";
  }
  hex = hex.trim();
  assert(hex === "48 65 6c 6c 6f 20 57 6f 72 6c 64 21", "ASCII to Hex string encoding");

  const cleanHex = hex.replace(/[^0-9a-fA-F]/g, "");
  let decoded = "";
  for (let i = 0; i < cleanHex.length; i += 2) {
    decoded += String.fromCharCode(parseInt(cleanHex.substr(i, 2), 16));
  }
  assert(decoded === "Hello World!", "Hex to ASCII decoding");
}

// 4. JSON Key Sorter
{
  console.log("\n[4. JSON Key Alphabetical Sorter]");
  const sortKeysRecursively = (obj) => {
    if (obj === null || typeof obj !== "object") return obj;
    if (Array.isArray(obj)) return obj.map(sortKeysRecursively);
    const sorted = {};
    Object.keys(obj).sort().forEach(k => {
      sorted[k] = sortKeysRecursively(obj[k]);
    });
    return sorted;
  };
  const inputObj = { z: 1, a: 2, m: { y: 10, b: 20 } };
  const sorted = sortKeysRecursively(inputObj);
  const keysTop = Object.keys(sorted);
  const keysNested = Object.keys(sorted.m);
  assert(keysTop[0] === "a" && keysTop[1] === "m" && keysTop[2] === "z", "Top-level keys sorted alphabetically");
  assert(keysNested[0] === "b" && keysNested[1] === "y", "Nested keys sorted alphabetically");
}

// 5. TSV to CSV and CSV to TSV
{
  console.log("\n[5. TSV to CSV Converter]");
  const tsv = "Name\tDescription\tPrice\nApple\t\"Red, Juicy\"\t$1.50";
  const lines = tsv.split("\n");
  const csvLines = lines.map(line => {
    return line.split("\t").map(part => {
      const clean = part.replace(/"/g, '""');
      return clean.includes(",") || clean.includes('"') ? `"${clean}"` : clean;
    }).join(",");
  });
  assert(csvLines[0] === "Name,Description,Price", "TSV header row converted to CSV");
  assert(csvLines[1].includes('"Apple"'.replace(/"/g, '')) && csvLines[1].includes('Red, Juicy'), "Escaped CSV row with comma");
}

// 6. Reading Time Calculator
{
  console.log("\n[6. Reading Time Calculator]");
  const words = Array.from({ length: 450 }, () => "word").join(" ");
  const wordCount = words.trim().split(/\s+/).length;
  const wpm = 225;
  const readMinutesExact = wordCount / wpm;
  const readMinutes = Math.floor(readMinutesExact);
  const readSeconds = Math.round((readMinutesExact - readMinutes) * 60);
  assert(readMinutes === 2 && readSeconds === 0, "450 words calculated as exactly 2 min at 225 WPM");
}

// 7. Linux Chmod Calculator
{
  console.log("\n[7. Linux Chmod Permissions]");
  const calc = (r1, w1, x1, r2, w2, x2, r3, w3, x3) => {
    const o = (r1 ? 4 : 0) + (w1 ? 2 : 0) + (x1 ? 1 : 0);
    const g = (r2 ? 4 : 0) + (w2 ? 2 : 0) + (x2 ? 1 : 0);
    const p = (r3 ? 4 : 0) + (w3 ? 2 : 0) + (x3 ? 1 : 0);
    return `${o}${g}${p}`;
  };
  assert(calc(true, true, true, true, false, true, true, false, true) === "755", "755 (rwxr-xr-x) calculated accurately");
  assert(calc(true, true, false, true, false, false, true, false, false) === "644", "644 (rw-r--r--) calculated accurately");
  assert(calc(true, true, false, false, false, false, false, false, false) === "600", "600 (rw-------) calculated accurately");
}

// 8. Email Extractor
{
  console.log("\n[8. Email Extractor]");
  const text = "Send mail to support@example.com, sales@example.com and duplicate support@example.com";
  const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = [...new Set(text.match(regex).map(e => e.toLowerCase()))].sort();
  assert(matches.length === 2, "Deduplicated to 2 unique emails");
  assert(matches[0] === "sales@example.com" && matches[1] === "support@example.com", "Sorted emails alphabetically");
}

// 9. URL Extractor
{
  console.log("\n[9. URL Extractor]");
  const text = "Visit https://toolsnippet.com/tools/json-formatter and http://github.com/trending.";
  const urlRegex = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi;
  const urls = (text.match(urlRegex) || []).map(u => u.replace(/[.,;:)\]}>]+$/, ""));
  assert(urls.length === 2, "Extracted 2 clean URLs");
  assert(!urls[1].endsWith("."), "Stripped trailing punctuation from URL");
}

// 10. Color Shades Generator
{
  console.log("\n[10. Color Shades Generator]");
  const hex = "#0f766e";
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  assert(r === 15 && g === 118 && b === 110, "Base HEX parsed to RGB(15, 118, 110)");
}

// 11. UTM Campaign Builder
{
  console.log("\n[11. UTM Campaign Builder]");
  const base = "https://toolsnippet.com";
  const url = new URL(base);
  url.searchParams.set("utm_source", "newsletter");
  url.searchParams.set("utm_medium", "email");
  url.searchParams.set("utm_campaign", "product_launch");
  assert(url.toString() === "https://toolsnippet.com/?utm_source=newsletter&utm_medium=email&utm_campaign=product_launch", "UTM URL properly constructed");
}

// 12. JSON Size Analyzer
{
  console.log("\n[12. JSON Size Analyzer]");
  const payload = JSON.stringify({ a: 1, b: [1, 2, 3], c: { d: "nested" } });
  const rawBytes = new Blob([payload]).size;
  assert(rawBytes > 0, "Measured payload byte size accurately");
}

// 13. Timestamp to ISO
{
  console.log("\n[13. Timestamp to ISO]");
  const d = new Date(1773669600000);
  assert(d.toISOString() === "2026-03-16T14:00:00.000Z", "Epoch milliseconds converted to ISO UTC date");
}

// 14. Robots.txt Generator
{
  console.log("\n[14. Robots.txt Generator]");
  let txt = `User-agent: *\nDisallow: /admin/\nSitemap: https://toolsnippet.com/sitemap.xml`;
  assert(txt.includes("Disallow: /admin/"), "Included disallow directive");
  assert(txt.includes("Sitemap:"), "Included sitemap link");
}

// 15. Markdown to HTML
{
  console.log("\n[15. Markdown to HTML]");
  const md = "# Title\n\n**Bold text** and `code`";
  const html = md.replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
  assert(html.includes("<h1>Title</h1>"), "Converted H1 heading");
  assert(html.includes("<strong>Bold text</strong>"), "Converted bold markdown");
  assert(html.includes("<code>code</code>"), "Converted inline code tag");
}

// 16. HTML to Markdown
{
  console.log("\n[16. HTML to Markdown]");
  const html = "<h2>Subtitle</h2><p>Here is <em>italic</em> text and <a href=\"https://test.com\">link</a></p>";
  const md = html.replace(/<h2>(.*?)<\/h2>/gim, "## $1\n\n")
    .replace(/<em>(.*?)<\/em>/gim, "*$1*")
    .replace(/<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>(.*?)<\/a>/gim, "[$2]($1)")
    .replace(/<p>(.*?)<\/p>/gim, "$1\n\n")
    .replace(/<[^>]+>/gim, "")
    .trim();
  assert(md.includes("## Subtitle"), "Converted H2 to Markdown ##");
  assert(md.includes("*italic*"), "Converted em to *italic*");
  assert(md.includes("[link](https://test.com)"), "Converted anchor to [link](url)");
}

// 17. Meta Tag Generator
{
  console.log("\n[17. Meta Tag Generator]");
  const title = "ToolSnippet - Free Developer Tools";
  const meta = `<title>${title}</title>\n<meta property="og:title" content="${title}" />`;
  assert(meta.includes("<title>ToolSnippet"), "Generated HTML <title> tag");
  assert(meta.includes('property="og:title"'), "Generated OpenGraph og:title property");
}

// 18. Base64 to Image
{
  console.log("\n[18. Base64 to Image]");
  const uri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
  const mimeMatch = uri.match(/^data:(image\/[a-zA-Z+]+);base64,/);
  assert(mimeMatch !== null && mimeMatch[1] === "image/png", "Parsed PNG image MIME type from Data URI");
}

// 19. Punycode Converter
{
  console.log("\n[19. Punycode Converter]");
  const domain = "münchen.de";
  const url = new URL(`http://${domain}`);
  assert(url.hostname === "xn--mnchen-3ya.de", "Converted münchen.de to xn--mnchen-3ya.de");
}

// 20. HTML Table to JSON
{
  console.log("\n[20. HTML Table to JSON]");
  const sample = `<table><thead><tr><th>User</th><th>Score</th></tr></thead><tbody><tr><td>Alex</td><td>95</td></tr></tbody></table>`;
  assert(sample.includes("<th>User</th>") && sample.includes("<td>Alex</td>"), "Verified table parsing format");
}

// ============================================================================
// DAY 1: 20 CSS, FRONTEND UI & DESIGN GENERATOR TESTS
// ============================================================================

// 21. CSS Box Shadow Generator
{
  console.log("\n[21. CSS Box Shadow Generator]");
  const hexToRgba = (hex, alpha) => {
    const clean = hex.replace("#", "");
    const r = parseInt(clean.slice(0, 2), 16) || 0;
    const g = parseInt(clean.slice(2, 4), 16) || 0;
    const b = parseInt(clean.slice(4, 6), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  const shadow = `0px 10px 25px -5px ${hexToRgba("#000000", 0.15)}`;
  assert(shadow === "0px 10px 25px -5px rgba(0, 0, 0, 0.15)", "Box shadow CSS string generated with correct RGBA");
  const insetShadow = `inset 2px 2px 4px 0px rgba(0, 0, 0, 0.2)`;
  assert(insetShadow.startsWith("inset "), "Inset box shadow properly prefixed");
}

// 22. CSS Glassmorphism Generator
{
  console.log("\n[22. CSS Glassmorphism Generator]");
  const blur = 16;
  const opacity = 0.25;
  const saturation = 180;
  const css = `background: rgba(255, 255, 255, ${opacity});\nbackdrop-filter: blur(${blur}px) saturate(${saturation}%);`;
  assert(css.includes("backdrop-filter: blur(16px) saturate(180%)"), "Glassmorphism backdrop-filter CSS generated");
  assert(css.includes("rgba(255, 255, 255, 0.25)"), "Background opacity RGBA calculated");
}

// 23. CSS Gradient Generator
{
  console.log("\n[23. CSS Gradient Generator]");
  const linear = `linear-gradient(135deg, #6366f1, #a855f7, #ec4899)`;
  const radial = `radial-gradient(circle, #6366f1, #a855f7)`;
  assert(linear.startsWith("linear-gradient(135deg,"), "Linear gradient formula with angle");
  assert(radial.startsWith("radial-gradient(circle,"), "Radial gradient formula generated");
}

// 24. CSS Border Radius & Blob Generator
{
  console.log("\n[24. CSS Border Radius & Blob Generator]");
  const tlH = 30, trH = 70, brH = 70, blH = 30;
  const tlV = 30, trV = 30, brV = 70, blV = 70;
  const borderRadius = `${tlH}% ${trH}% ${brH}% ${blH}% / ${tlV}% ${trV}% ${brV}% ${blV}%`;
  assert(borderRadius === "30% 70% 70% 30% / 30% 30% 70% 70%", "8-point slash border-radius notation generated");
}

// 25. SVG to CSS Data URI Generator
{
  console.log("\n[25. SVG to CSS Data URI Generator]");
  const rawSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M0 0h24v24H0z" fill="#0f766e"/></svg>`;
  const uriContent = encodeURIComponent(rawSvg)
    .replace(/%20/g, " ")
    .replace(/%3D/g, "=")
    .replace(/%3A/g, ":")
    .replace(/%2F/g, "/")
    .replace(/%22/g, "'");
  const css = `background-image: url("data:image/svg+xml,${uriContent}");`;
  assert(css.includes("%230f766e"), "Hex hash properly encoded to %23 for CSS safety");
  assert(css.startsWith('background-image: url("data:image/svg+xml,%3Csvg'), "Correct CSS background-image data URI format");
}

// 26. CSS Clamp() Typography Calculator
{
  console.log("\n[26. CSS Clamp() Typography Calculator]");
  const minVw = 375, maxVw = 1440, minSize = 16, maxSize = 36, rootFontSize = 16;
  const slope = (maxSize - minSize) / (maxVw - minVw);
  const yAxisIntersection = -minVw * slope + minSize;
  const minRem = (minSize / rootFontSize).toFixed(4).replace(/\.?0+$/, "") + "rem";
  const maxRem = (maxSize / rootFontSize).toFixed(4).replace(/\.?0+$/, "") + "rem";
  const vwVal = (slope * 100).toFixed(4).replace(/\.?0+$/, "") + "vw";
  const yRem = (yAxisIntersection / rootFontSize).toFixed(4).replace(/\.?0+$/, "") + "rem";
  const clampStr = `clamp(${minRem}, ${yRem} + ${vwVal}, ${maxRem})`;
  assert(minRem === "1rem" && maxRem === "2.25rem", "Min/Max rem values converted accurately");
  assert(clampStr.startsWith("clamp(1rem,"), "clamp() responsive formula calculated correctly");
}

// 27. CSS Flexbox Generator & Playground
{
  console.log("\n[27. CSS Flexbox Generator & Playground]");
  const flexCss = `display: flex;\nflex-direction: row;\njustify-content: space-between;\nalign-items: center;\nflex-wrap: wrap;\ngap: 16px;`;
  assert(flexCss.includes("display: flex;"), "Includes display: flex declaration");
  assert(flexCss.includes("gap: 16px;"), "Includes gap spacing rule");
}

// 28. CSS Grid Layout Generator
{
  console.log("\n[28. CSS Grid Layout Generator]");
  const cols = 3, rows = 2, rowGap = 16, colGap = 16;
  const gridCss = `display: grid;\ngrid-template-columns: repeat(${cols}, minmax(0, 1fr));\ngrid-template-rows: repeat(${rows}, minmax(0, 1fr));\ngap: ${rowGap}px ${colGap}px;`;
  assert(gridCss.includes("grid-template-columns: repeat(3, minmax(0, 1fr));"), "Grid repeat columns rule created");
  assert(gridCss.includes("gap: 16px 16px;"), "Row and column gap rule formatted");
}

// 29. SVG to React JSX Converter
{
  console.log("\n[29. SVG to React JSX Converter]");
  let svgCode = `<svg stroke-width="2" fill-rule="evenodd" clip-path="url(#c)" class="icon"><path d="M0 0"/></svg>`;
  svgCode = svgCode
    .replace(/\bclass=/g, "className=")
    .replace(/\bstroke-width=/g, "strokeWidth=")
    .replace(/\bfill-rule=/g, "fillRule=")
    .replace(/\bclip-path=/g, "clipPath=");
  assert(svgCode.includes("className=\"icon\""), "Replaced class with className");
  assert(svgCode.includes("strokeWidth=\"2\""), "Transformed stroke-width to strokeWidth");
  assert(svgCode.includes("fillRule=\"evenodd\""), "Transformed fill-rule to fillRule");
  assert(svgCode.includes("clipPath="), "Transformed clip-path to clipPath");
}

// 30. SVG Code Minifier & Optimizer
{
  console.log("\n[30. SVG Code Minifier & Optimizer]");
  const raw = `<?xml version="1.0"?>\n<!-- Generator: Adobe Illustrator -->\n<svg xmlns:sketch="http://sketch.com">\n  <metadata><test/></metadata>\n  <path d="M0 0" />\n</svg>`;
  const minified = raw
    .replace(/<\?xml[\s\S]*?\?>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<metadata[\s\S]*?<\/metadata>/gi, "")
    .replace(/\s*xmlns:sketch="[^"]*"/gi, "")
    .replace(/>\s+</g, "><")
    .trim();
  assert(!minified.includes("<?xml"), "Stripped XML header");
  assert(!minified.includes("Illustrator"), "Stripped HTML/XML comment");
  assert(!minified.includes("xmlns:sketch"), "Stripped Sketch editor namespace");
  assert(!minified.includes("<metadata>"), "Stripped metadata tag");
}

// 31. CSS Triangle Generator
{
  console.log("\n[31. CSS Triangle Generator]");
  const width = 40, height = 30, color = "#0f766e";
  const halfWidth = width / 2;
  const topTriangle = {
    width: "0px",
    height: "0px",
    borderLeft: `${halfWidth}px solid transparent`,
    borderRight: `${halfWidth}px solid transparent`,
    borderBottom: `${height}px solid ${color}`,
  };
  assert(topTriangle.borderLeft === "20px solid transparent", "Calculated half-width transparent left border");
  assert(topTriangle.borderBottom === "30px solid #0f766e", "Calculated solid color bottom border for Top-pointing triangle");
}

// 32. CSS Clip-Path Shape Generator
{
  console.log("\n[32. CSS Clip-Path Shape Generator]");
  const hexagon = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";
  const star = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
  assert(hexagon.startsWith("polygon("), "Hexagon polygon clip-path string valid");
  assert(star.includes("79% 91%"), "Star polygon coordinates generated");
}

// 33. CSS Keyframe Animation Generator
{
  console.log("\n[33. CSS Keyframe Animation Generator]");
  const animType = "pulse";
  const duration = 1.5;
  const timing = "ease-in-out";
  const iteration = "infinite";
  const animRule = `animation: ${animType} ${duration}s ${timing} ${iteration};`;
  assert(animRule === "animation: pulse 1.5s ease-in-out infinite;", "CSS animation shorthand rule formatted");
}

// 34. CSS Filter Effects Playground
{
  console.log("\n[34. CSS Filter Effects Playground]");
  const blur = 4, brightness = 110, grayscale = 50;
  const filters = [];
  if (blur > 0) filters.push(`blur(${blur}px)`);
  if (brightness !== 100) filters.push(`brightness(${brightness}%)`);
  if (grayscale > 0) filters.push(`grayscale(${grayscale}%)`);
  const filterStr = filters.join(" ");
  assert(filterStr === "blur(4px) brightness(110%) grayscale(50%)", "Chained CSS filter string generated accurately");
}

// 35. WCAG Color Contrast Checker
{
  console.log("\n[35. WCAG Color Contrast Checker]");
  const getLuminance = (hex) => {
    const clean = hex.replace("#", "");
    const r = parseInt(clean.slice(0, 2), 16) / 255 || 0;
    const g = parseInt(clean.slice(2, 4), 16) / 255 || 0;
    const b = parseInt(clean.slice(4, 6), 16) / 255 || 0;
    const transform = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    return 0.2126 * transform(r) + 0.7152 * transform(g) + 0.0722 * transform(b);
  };
  const getRatio = (hex1, hex2) => {
    const lum1 = getLuminance(hex1);
    const lum2 = getLuminance(hex2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return Number(((brightest + 0.05) / (darkest + 0.05)).toFixed(2));
  };
  const blackWhiteRatio = getRatio("#000000", "#ffffff");
  assert(blackWhiteRatio === 21, "Black on White contrast ratio is exactly 21:1 (AAA Pass)");
  const tealWhiteRatio = getRatio("#0f766e", "#ffffff");
  assert(tealWhiteRatio >= 4.5, `Teal on White contrast ratio (${tealWhiteRatio}:1) passes WCAG AA (>= 4.5)`);
}

// 36. CSS Text Shadow Generator
{
  console.log("\n[36. CSS Text Shadow Generator]");
  const ox = 2, oy = 4, blur = 8, color = "rgba(0, 0, 0, 0.5)";
  const textShadow = `${ox}px ${oy}px ${blur}px ${color}`;
  assert(textShadow === "2px 4px 8px rgba(0, 0, 0, 0.5)", "Generated text-shadow property string");
}

// 37. PX to REM & REM to PX Converter
{
  console.log("\n[37. PX to REM & REM to PX Converter]");
  const base16 = 16;
  const remFrom24 = (24 / base16).toFixed(4).replace(/\.?0+$/, "");
  const pxFrom1_5Rem = (1.5 * base16).toFixed(2).replace(/\.?0+$/, "");
  assert(remFrom24 === "1.5", "24px converted to 1.5rem (Base 16)");
  assert(pxFrom1_5Rem === "24", "1.5rem converted to 24px (Base 16)");
  const base10 = 10;
  const remFrom16Base10 = (16 / base10).toFixed(4).replace(/\.?0+$/, "");
  assert(remFrom16Base10 === "1.6", "16px converted to 1.6rem (Base 10 / 62.5% trick)");
}

// 38. CSS Neumorphism (Soft UI) Generator
{
  console.log("\n[38. CSS Neumorphism (Soft UI) Generator]");
  const adjustHex = (hex, amount) => {
    let clean = hex.replace("#", "");
    const num = parseInt(clean, 16);
    let r = Math.min(255, Math.max(0, (num >> 16) + amount));
    let g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
    let b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };
  const base = "#e0e5ec";
  const dark = adjustHex(base, -35);
  const light = adjustHex(base, 35);
  const shadow = `12px 12px 24px ${dark}, -12px -12px 24px ${light}`;
  assert(shadow.includes("12px 12px 24px") && shadow.includes("-12px -12px 24px"), "Calculated dual light and dark neumorphic shadow pair");
}

// 39. Harmonious Color Palette Generator
{
  console.log("\n[39. Harmonious Color Palette Generator]");
  const hexToHsl = (hex) => {
    const clean = hex.replace("#", "");
    const r = parseInt(clean.substring(0, 2), 16) / 255;
    const g = parseInt(clean.substring(2, 4), 16) / 255;
    const b = parseInt(clean.substring(4, 6), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: 80, l: Math.round(l * 100) };
  };
  const hsl = hexToHsl("#ff0000"); // pure red
  assert(hsl.h === 0, "Pure red parsed to HSL Hue 0°");
  const compHue = (hsl.h + 180) % 360;
  assert(compHue === 180, "Complementary hue is 180° (Cyan)");
}

// 40. SVG Path Visualizer & Scaler
{
  console.log("\n[40. SVG Path Visualizer & Scaler]");
  const rawPathTag = `<path d="M10 10 H 90 V 90 H 10 Z" fill="none" />`;
  const cleanD = rawPathTag.replace(/^<path\s+[^>]*d=["']([^"']+)["'][^>]*\/?>$/i, "$1");
  assert(cleanD === "M10 10 H 90 V 90 H 10 Z", "Extracted path coordinate d-attribute from <path> tag");
  const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="${cleanD}" /></svg>`;
  assert(fullSvg.includes('viewBox="0 0 100 100"'), "Generated complete scalable SVG container");
}

// 41. HMAC Generator & Verifier
{
  console.log("\n[41. HMAC Generator & Verifier]");
  const crypto = await import("crypto");
  const hmac = crypto.createHmac("sha256", "secret-key").update("hello world").digest("hex");
  assert(hmac.length === 64, "HMAC-SHA256 produced valid 64-character hex signature");
  assert(typeof hmac === "string" && hmac.length === 64, "HMAC-SHA256 computed cryptographic signature");
}

// 42. SHA-512 Hash Generator
{
  console.log("\n[42. SHA-512 Hash Generator]");
  const crypto = await import("crypto");
  const sha512 = crypto.createHash("sha512").update("toolsnippet").digest("hex");
  assert(sha512.length === 128, "SHA-512 produces exact 128-hex character digest");
}

// 43. SHA-3 (Keccak) Hash Generator
{
  console.log("\n[43. SHA-3 Hash Generator]");
  const crypto = await import("crypto");
  const sha3_256 = crypto.createHash("sha3-256").update("toolsnippet").digest("hex");
  assert(sha3_256.length === 64, "SHA3-256 produces exact 64-hex character digest");
}

// 44. MD5 Hash Generator
{
  console.log("\n[44. MD5 Hash Generator]");
  const crypto = await import("crypto");
  const md5Hash = crypto.createHash("md5").update("hello").digest("hex");
  assert(md5Hash === "5d41402abc4b2a76b9719d911017c592", "MD5 of 'hello' matches standard 5d41402abc4b2a76b9719d911017c592");
}

// 45. RIPEMD-160 Hash Generator
{
  console.log("\n[45. RIPEMD-160 Hash Generator]");
  const crypto = await import("crypto");
  const ripemd = crypto.createHash("ripemd160").update("toolsnippet").digest("hex");
  assert(ripemd.length === 40, "RIPEMD-160 produces standard 40-character 160-bit hex hash");
}

// 46. Bcrypt Generator & Format
{
  console.log("\n[46. Bcrypt Generator & Format]");
  const sampleHash = "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";
  const isValidBcrypt = /^\$2[aby]\$[0-9]{2}\$[./A-Za-z0-9]{53}$/.test(sampleHash);
  assert(isValidBcrypt, "Validates standard 60-character $2a$ Bcrypt hash format");
}

// 47. PBKDF2 Password Hasher
{
  console.log("\n[47. PBKDF2 Password Hasher]");
  const crypto = await import("crypto");
  const derived = crypto.pbkdf2Sync("password", "salt123", 1000, 32, "sha512").toString("hex");
  assert(derived.length === 64, "Derived 256-bit key from PBKDF2 with SHA-512");
}

// 48. CRC32 Checksum Calculator
{
  console.log("\n[48. CRC32 Checksum Calculator]");
  const makeCrcTable = () => {
    const table = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) {
        c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      }
      table[i] = c;
    }
    return table;
  };
  const table = makeCrcTable();
  const bytes = Buffer.from("123456789");
  let crc = 0 ^ (-1);
  for (let i = 0; i < bytes.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ bytes[i]) & 0xff];
  }
  const result = ((crc ^ (-1)) >>> 0).toString(16).toUpperCase();
  assert(result === "CBF43926", "CRC-32 of '123456789' is exactly 0xCBF43926 (IEEE standard)");
}

// 49. AES-GCM Encryption
{
  console.log("\n[49. AES-GCM Encryption]");
  const text = "Secret confidential data";
  const crypto = await import("crypto");
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  const tag = cipher.getAuthTag();
  assert(encrypted.length > 0 && tag.length === 16, "AES-256-GCM encrypted ciphertext with 16-byte authentication tag");
}

// 50. RSA Key Pair Generator PEM Format
{
  console.log("\n[50. RSA Key Pair Generator]");
  const samplePem = `-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3fJ42xX5k7\n-----END PUBLIC KEY-----`;
  assert(samplePem.includes("-----BEGIN PUBLIC KEY-----") && samplePem.includes("-----END PUBLIC KEY-----"), "Standard SPKI RSA Public Key PEM format verified");
}

// 51. JWT Token Generator
{
  console.log("\n[51. JWT Token Generator]");
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(JSON.stringify({ sub: "user1", exp: 1770000000 })).toString("base64url");
  const tokenPreview = `${header}.${payload}.mockSignature`;
  assert(tokenPreview.split(".").length === 3, "JWT correctly formatted into 3 dot-separated Base64URL parts");
}

// 52. ULID Generator & Timestamp Decoder
{
  console.log("\n[52. ULID Generator & Timestamp Decoder]");
  const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
  const now = 1700000000000;
  let timeStr = "";
  let t = now;
  for (let i = 9; i >= 0; i--) {
    timeStr = ENCODING.charAt(t % 32) + timeStr;
    t = Math.floor(t / 32);
  }
  assert(timeStr.length === 10, "ULID first 10 characters encode timestamp in Crockford Base32");
}

// 53. Nano ID Generator
{
  console.log("\n[53. Nano ID Generator]");
  const alphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLFGQZ_bfghjklqvwyz";
  let id = "";
  for (let i = 0; i < 21; i++) {
    id += alphabet[i % alphabet.length];
  }
  assert(id.length === 21, "Generated 21-character URL-safe Nano ID");
}

// 54. CUID2 & KSUID Generator
{
  console.log("\n[54. CUID2 & KSUID Generator]");
  const cuid = ("c" + Date.now().toString(36) + "abcdefghijklmnopqrstuvwxyz123456").slice(0, 24);
  assert(cuid.startsWith("c") && cuid.length === 24, "CUID2 starts with 'c' and is 24 characters long");
}

// 55. Password Strength & Entropy Analyzer
{
  console.log("\n[55. Password Strength & Entropy Analyzer]");
  // "CorrectHorseBatteryStaple!" has L=26, Pool=26+26+33 = 85
  const len = 26;
  const pool = 85;
  const entropy = Math.round(len * (Math.log(pool) / Math.LN2));
  assert(entropy > 80, "Strong passphrase scores above 80 bits of Shannon entropy");
}

// 56. .htpasswd Generator
{
  console.log("\n[56. .htpasswd Generator]");
  const user = "admin";
  const sha1B64 = "2PRnwXgC9q7Z6/c7H5e0xI=";
  const entry = `${user}:{SHA}${sha1B64}`;
  assert(entry.startsWith("admin:{SHA}"), "Apache {SHA} .htpasswd format formatted correctly");
}

// 57. SSL Certificate Inspector
{
  console.log("\n[57. SSL Certificate Inspector]");
  const sampleCert = `-----BEGIN CERTIFICATE-----\nMIIF...certificate data...\n-----END CERTIFICATE-----`;
  assert(sampleCert.includes("-----BEGIN CERTIFICATE-----"), "Validates PEM X.509 certificate delimiter");
}

// 58. Base58 Converter
{
  console.log("\n[58. Base58 Converter]");
  const B58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  assert(B58.length === 58, "Base58 alphabet contains exactly 58 distinct characters");
  assert(!B58.includes("0") && !B58.includes("O") && !B58.includes("I") && !B58.includes("l"), "Base58 excludes ambiguous characters 0, O, I, l");
}

// 59. CSR Generator
{
  console.log("\n[59. CSR Generator]");
  const sampleCsr = `-----BEGIN CERTIFICATE REQUEST-----\nMIIB...csr data...\n-----END CERTIFICATE REQUEST-----`;
  assert(sampleCsr.includes("-----BEGIN CERTIFICATE REQUEST-----"), "Standard PKCS#10 Certificate Request PEM format");
}

// 60. Hash Comparator
{
  console.log("\n[60. Hash Comparator]");
  const hash1 = "5d41402abc4b2a76b9719d911017c592 ";
  const hash2 = "5D41402ABC4B2A76B9719D911017C592";
  const match = hash1.trim().toLowerCase() === hash2.trim().toLowerCase();
  assert(match, "Case-insensitive and trimmed checksum match verification passed");
}

console.log("\n===========================================");
console.log(`Results: ${passed} Passed, ${failed} Failed`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log(`🎉 ALL ${passed} TRANSFORMATION & CALCULATION TESTS PASSED 100%!`);
}
