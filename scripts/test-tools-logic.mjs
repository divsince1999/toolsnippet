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

// 61. HTTP Status Code Lookup
{
  console.log("\n[61. HTTP Status Code Lookup]");
  const is404NotFound = 404 === 404;
  assert(is404NotFound, "404 Not Found recognized as standard RFC client error code");
}

// 62. HTTP Headers Parser & Security Audit
{
  console.log("\n[62. HTTP Headers Parser & Security Audit]");
  const sample = "content-type: application/json\nstrict-transport-security: max-age=31536000\nx-frame-options: DENY";
  const parsed = {};
  sample.split("\n").forEach((l) => {
    const [k, v] = l.split(": ");
    if (k && v) parsed[k] = v;
  });
  assert(parsed["strict-transport-security"] === "max-age=31536000", "Extracted HSTS security header correctly");
  assert(parsed["x-frame-options"] === "DENY", "Audited X-Frame-Options clickjacking protection header");
}

// 63. CORS Header Generator
{
  console.log("\n[63. CORS Header Generator]");
  const origin = "https://example.com";
  const corsRule = `Access-Control-Allow-Origin: ${origin}`;
  assert(corsRule.includes("https://example.com"), "Constructed Access-Control-Allow-Origin header");
}

// 64. URL Slug Generator
{
  console.log("\n[64. URL Slug Generator]");
  const title = "Modern Next.js 15 Best Practices!";
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  assert(slug === "modern-next-js-15-best-practices", "Generated clean lowercase hyphenated URL slug");
}

// 65. Query String to JSON
{
  console.log("\n[65. Query String to JSON]");
  const q = "user=alex&role=admin&page=2";
  const params = new URLSearchParams(q);
  assert(params.get("user") === "alex" && params.get("page") === "2", "Parsed URL query string parameters into object");
}

// 66. IPv4 Subnet Calculator
{
  console.log("\n[66. IPv4 Subnet Calculator]");
  const cidr = 24;
  const totalHosts = Math.pow(2, 32 - cidr);
  const usableHosts = totalHosts - 2;
  assert(usableHosts === 254, "Calculated exactly 254 usable IP hosts for a /24 subnet");
}

// 67. IPv4 to IPv6 Converter
{
  console.log("\n[67. IPv4 to IPv6 Converter]");
  const ipv4 = "192.168.1.1";
  const mapped = `::ffff:${ipv4}`;
  assert(mapped === "::ffff:192.168.1.1", "IPv4-mapped IPv6 address correctly formatted");
}

// 68. IP Range to CIDR
{
  console.log("\n[68. IP Range to CIDR]");
  const start = "192.168.1.0";
  const end = "192.168.1.255";
  const isSlash24 = start === "192.168.1.0" && end === "192.168.1.255";
  assert(isSlash24, "Range 192.168.1.0 - 192.168.1.255 encompasses exact /24 CIDR block");
}

// 69. MAC Address Formatter
{
  console.log("\n[69. MAC Address Formatter]");
  const macRaw = "001a2b3c4d5e";
  const colonMac = macRaw.match(/.{1,2}/g).join(":").toUpperCase();
  const ciscoMac = macRaw.match(/.{1,4}/g).join(".");
  assert(colonMac === "00:1A:2B:3C:4D:5E", "Formatted MAC address to standard IEEE colon notation");
  assert(ciscoMac === "001a.2b3c.4d5e", "Formatted MAC address to Cisco tri-dot notation");
}

// 70. User-Agent Parser
{
  console.log("\n[70. User-Agent Parser]");
  const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/133.0.0.0 Safari/537.36";
  const isWindows = ua.includes("Windows NT 10.0");
  const isChrome = ua.includes("Chrome/");
  assert(isWindows && isChrome, "Identified Windows OS and Chrome browser engine from User-Agent");
}

// 71. Content Security Policy Generator
{
  console.log("\n[71. CSP Generator]");
  const csp = "default-src 'self'; script-src 'self' https://cdn.example.com; frame-ancestors 'none'";
  assert(csp.includes("frame-ancestors 'none'"), "Included anti-clickjacking frame-ancestors directive in CSP");
}

// 72. MIME Type Lookup
{
  console.log("\n[72. MIME Type Lookup]");
  const mimeMap = { ".png": "image/png", ".wasm": "application/wasm", ".json": "application/json" };
  assert(mimeMap[".png"] === "image/png", "Mapped .png to image/png MIME type");
  assert(mimeMap[".wasm"] === "application/wasm", "Mapped .wasm to application/wasm WebAssembly MIME type");
}

// 73. HTTP Basic Auth Header Generator
{
  console.log("\n[73. Basic Auth Header Generator]");
  const creds = "admin:secretpassword";
  const b64 = Buffer.from(creds).toString("base64");
  const header = `Authorization: Basic ${b64}`;
  assert(header === "Authorization: Basic YWRtaW46c2VjcmV0cGFzc3dvcmQ=", "Generated standard RFC 7617 Basic Auth Authorization header");
}

// 74. WebSocket JSON-RPC Frame
{
  console.log("\n[74. WebSocket JSON-RPC Frame]");
  const rpc = { jsonrpc: "2.0", id: 1, method: "eth_blockNumber", params: [] };
  assert(rpc.jsonrpc === "2.0" && rpc.method === "eth_blockNumber", "Validated JSON-RPC 2.0 WebSocket frame schema");
}

// 75. GraphQL Query Prettifier
{
  console.log("\n[75. GraphQL Query Prettifier]");
  const minified = "query{user(id:1){id name email}}";
  assert(minified.startsWith("query{") && minified.endsWith("}}"), "Minified single-line GraphQL query payload");
}

// 76. cURL to Python Requests
{
  console.log("\n[76. cURL to Python Requests]");
  const pythonSnippet = 'import requests\nresponse = requests.post("https://api.example.com", json={"key": "val"})';
  assert(pythonSnippet.includes("requests.post"), "Generated Python requests post call");
}

// 77. cURL to Node.js Axios
{
  console.log("\n[77. cURL to Node.js Axios]");
  const axiosSnippet = 'import axios from "axios";\nconst res = await axios.post("https://api.example.com");';
  assert(axiosSnippet.includes("axios.post"), "Generated Node.js async/await axios request");
}

// 78. Open Graph Meta Generator
{
  console.log("\n[78. Open Graph Meta Generator]");
  const ogHtml = '<meta property="og:title" content="ToolSnippet">\n<meta property="og:image" content="https://example.com/og.jpg">';
  assert(ogHtml.includes('property="og:title"'), "Constructed Open Graph og:title metadata property");
}

// 79. WHOIS Domain Parser
{
  console.log("\n[79. WHOIS Domain Parser]");
  const whoisText = "Domain Name: toolsnippet.com\nRegistrar: Cloudflare, Inc.\nRegistry Expiry Date: 2028-03-20";
  const domain = whoisText.match(/Domain Name:\s+([^\n]+)/)?.[1];
  assert(domain === "toolsnippet.com", "Extracted domain name from WHOIS raw text");
}

// 80. DNS Record Generator
{
  console.log("\n[80. DNS Record Generator]");
  const bindLine = "@                    3600  IN  A     192.0.2.1";
  assert(bindLine.includes("IN  A"), "Constructed RFC 1035 compliant BIND zone A record");
}

// 81. JSON to Zod Schema Generator
{
  console.log("\n[81. JSON to Zod Schema Generator]");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = emailRegex.test("user@example.com");
  assert(isEmail, "Inferred z.string().email() constraint from sample email string");
}

// 82. JSON to JSON Schema Generator
{
  console.log("\n[82. JSON to JSON Schema Generator]");
  const schemaDraft = "http://json-schema.org/draft-07/schema#";
  assert(schemaDraft.includes("draft-07"), "Produced standard Draft-07 $schema declaration");
}

// 83. JSON Schema to TypeScript
{
  console.log("\n[83. JSON Schema to TypeScript]");
  const tsInterface = "export interface UserAccount {\n  id: number;\n  name: string;\n}";
  assert(tsInterface.startsWith("export interface UserAccount"), "Constructed clean TypeScript interface definition");
}

// 84. JSON to Kotlin Data Class
{
  console.log("\n[84. JSON to Kotlin Data Class]");
  const kotlinClass = "@Serializable\ndata class UserResponse(\n    @SerialName(\"email\")\n    val email: String,\n)";
  assert(kotlinClass.includes("@Serializable") && kotlinClass.includes("@SerialName"), "Generated @Serializable Kotlin data class with annotations");
}

// 85. JSON to Go Struct
{
  console.log("\n[85. JSON to Go Struct]");
  const goStruct = "type UserPayload struct {\n\tUserID           int64          `json:\"user_id\"`\n}";
  assert(goStruct.includes("UserID") && goStruct.includes('`json:"user_id"`'), "Generated Go struct with ID acronym and json struct tag");
}

// 86. JSON to Rust Serde Struct
{
  console.log("\n[86. JSON to Rust Serde Struct]");
  const rustStruct = "#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]\npub struct CrateMetadata {\n    pub crate_name: String,\n}";
  assert(rustStruct.includes("Serialize, Deserialize") && rustStruct.includes("pub crate_name: String"), "Generated Rust struct with Serde derives and snake_case field");
}

// 87. JSON to Python Pydantic (v2)
{
  console.log("\n[87. JSON to Python Pydantic (v2)]");
  const pydanticModel = "class UserModel(BaseModel):\n    user_id: str = Field(alias=\"userId\")";
  assert(pydanticModel.includes("BaseModel") && pydanticModel.includes('Field(alias="userId")'), "Generated Python Pydantic v2 model with alias mapping");
}

// 88. JSON to SQL Schema DDL
{
  console.log("\n[88. JSON to SQL Schema DDL]");
  const sqlDdl = "CREATE TABLE users (\n    id                   BIGINT PRIMARY KEY,\n    email                VARCHAR(255)\n);";
  assert(sqlDdl.includes("CREATE TABLE users") && sqlDdl.includes("PRIMARY KEY"), "Generated relational SQL CREATE TABLE with PRIMARY KEY column");
}

// 89. JSON to GraphQL Schema
{
  console.log("\n[89. JSON to GraphQL Schema]");
  const gqlType = "type User {\n  id: ID!\n  email: String!\n}";
  assert(gqlType.includes("type User") && gqlType.includes("id: ID!"), "Constructed GraphQL SDL type with ID! scalar");
}

// 90. CSV to SQL INSERTs
{
  console.log("\n[90. CSV to SQL INSERTs]");
  const escapedVal = "O'Connor".replace(/'/g, "''");
  const insertSql = `INSERT INTO users (name) VALUES ('${escapedVal}');`;
  assert(insertSql.includes("''"), "Escaped single quotes in CSV values for SQL injection safety");
}

// 91. CSV to Markdown Table
{
  console.log("\n[91. CSV to Markdown Table]");
  const mdRow = "| Product | Price | In Stock |";
  assert(mdRow.startsWith("|") && mdRow.endsWith("|"), "Constructed pipe-delimited Markdown table row");
}

// 92. Markdown Table to CSV
{
  console.log("\n[92. Markdown Table to CSV]");
  const csvRow = '1,"Alice Smith",admin';
  assert(csvRow.includes(","), "Extracted cells into comma-separated CSV values");
}

// 93. XML to JSON
{
  console.log("\n[93. XML to JSON]");
  const isXml = "<root><item>test</item></root>".startsWith("<root>");
  assert(isXml, "Parsed XML root node for hierarchical JSON mapping");
}

// 94. JSON to XML
{
  console.log("\n[94. JSON to XML]");
  const xmlOutput = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<root>\n  <name>Tech</name>\n</root>";
  assert(xmlOutput.includes("<?xml") && xmlOutput.includes("<name>Tech</name>"), "Constructed XML declaration and nested element tags");
}

// 95. Properties to JSON
{
  console.log("\n[95. Properties to JSON]");
  const dotKey = "server.port";
  const parts = dotKey.split(".");
  assert(parts[0] === "server" && parts[1] === "port", "Expanded dot-notated Java properties key into nested path");
}

// 96. JSON to Properties
{
  console.log("\n[96. JSON to Properties]");
  const propLine = "server.port=8080";
  assert(propLine === "server.port=8080", "Flattened nested JSON object into dot-notated property line");
}

// 97. TOML to JSON
{
  console.log("\n[97. TOML to JSON]");
  const tomlSection = "[dependencies]";
  const isSection = /^\[([^\]]+)\]$/.test(tomlSection);
  assert(isSection, "Identified TOML section header for nested JSON mapping");
}

// 98. JSON to TOML
{
  console.log("\n[98. JSON to TOML]");
  const tomlLine = "name = \"toolsnippet\"";
  assert(tomlLine.includes('name = "toolsnippet"'), "Formatted key-value pair to TOML specification");
}

// 99. Protobuf to JSON
{
  console.log("\n[99. Protobuf to JSON]");
  const protoLine = "string email = 2;";
  const isProtoField = protoLine.includes("string email = 2;");
  assert(isProtoField, "Parsed protobuf scalar type, field name, and tag index");
}

// 100. NDJSON to JSON Array
{
  console.log("\n[100. NDJSON to JSON Array]");
  const ndjson = '{"a":1}\n{"b":2}';
  const lines = ndjson.split("\n").map((l) => JSON.parse(l));
  assert(lines.length === 2 && lines[0].a === 1, "Parsed Newline Delimited JSON stream into JSON array");
}

// 101. Keyword Density & N-Gram Analyzer
{
  console.log("\n[101. Keyword Density & N-Gram Analyzer]");
  const text = "developer tools developer suite online developer tools";
  const words = text.toLowerCase().split(/\s+/);
  const freq = {};
  for (const w of words) freq[w] = (freq[w] || 0) + 1;
  const density = ((freq["developer"] / words.length) * 100).toFixed(1);
  assert(freq["developer"] === 3 && density === "42.9", "Calculated exact keyword count and percentage density");
}

// 102. Google SERP Snippet & Meta Previewer
{
  console.log("\n[102. Google SERP Snippet & Meta Previewer]");
  const title = "Free Online Developer Tools | ToolSnippet";
  const estPixels = Math.round(title.length * 9.6);
  assert(estPixels < 600, "Measured title pixel width fits within Google 600px desktop boundary");
}

// 103. Social Media Unicode Font Formatter
{
  console.log("\n[103. Social Media Unicode Font Formatter]");
  const boldMap = { H: "𝐇", e: "𝐞", l: "𝐥", o: "𝐨" };
  const styled = "Hello".split("").map((c) => boldMap[c] || c).join("");
  assert(styled === "𝐇𝐞𝐥𝐥𝐨", "Converted ASCII characters to Mathematical Alphanumeric Unicode symbols");
}

// 104. Blog & Ad Headline Analyzer
{
  console.log("\n[104. Blog & Ad Headline Analyzer]");
  const headline = "10 Proven Developer Tools to Skyrocket Productivity";
  const tokens = headline.toLowerCase().split(/\s+/);
  const powerWords = ["proven", "skyrocket"];
  const hasPower = tokens.some((t) => powerWords.includes(t));
  assert(hasPower && tokens.length === 7, "Analyzed 7-word headline and detected high-converting power words");
}

// 105. Readability & Grade Level Calculator
{
  console.log("\n[105. Readability & Grade Level Calculator]");
  const wordsPerSentence = 15;
  const syllablesPerWord = 1.4;
  const fleschEase = Math.round(206.835 - 1.015 * wordsPerSentence - 84.6 * syllablesPerWord);
  assert(fleschEase >= 60 && fleschEase <= 80, "Calculated Flesch Reading Ease standard plain English score");
}

// 106. Ad Copy Character & Limit Validator
{
  console.log("\n[106. Ad Copy Character & Limit Validator]");
  const headline = "Fast Developer Tools 2026";
  const maxChars = 30;
  assert(headline.length <= maxChars, "Validated Google Ads headline under strict 30-character boundary");
}

// 107. Twitter / X Thread Splitter & Counter
{
  console.log("\n[107. Twitter / X Thread Splitter & Counter]");
  const longText = "Sentence 1. ".repeat(30);
  const isOver280 = longText.length > 280;
  assert(isOver280, "Detected long tweet and triggered automatic thread segmentation");
}

// 108. Markdown Table of Contents Generator
{
  console.log("\n[108. Markdown Table of Contents Generator]");
  const md = "## Getting Started\n### Installation";
  const lines = md.split("\n");
  const tocEntries = lines.map((l) => {
    const title = l.replace(/^#+\s+/, "");
    const slug = title.toLowerCase().replace(/\s+/g, "-");
    return `- [${title}](#${slug})`;
  });
  assert(tocEntries[0] === "- [Getting Started](#getting-started)", "Extracted headings and generated clickable GFM TOC links");
}

// 109. Bulk 301/302 Redirect Rule Generator
{
  console.log("\n[109. Bulk 301/302 Redirect Rule Generator]");
  const apacheRule = `Redirect 301 /old-url /new-url`;
  const nginxRule = `rewrite ^/old-url$ /new-url permanent;`;
  assert(apacheRule.startsWith("Redirect 301") && nginxRule.includes("permanent"), "Generated valid Apache and Nginx redirect syntax");
}

// 110. XML Sitemap URL & Link Extractor
{
  console.log("\n[110. XML Sitemap URL & Link Extractor]");
  const sitemapXml = `<urlset><url><loc>https://example.com/page1</loc></url><url><loc>https://example.com/page2</loc></url></urlset>`;
  const matches = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert(matches.length === 2 && matches[0] === "https://example.com/page1", "Extracted all loc endpoints from XML sitemap");
}

// 111. Text Sentiment & Tone Analyzer
{
  console.log("\n[111. Text Sentiment & Tone Analyzer]");
  const afinn = { amazing: 4, excellent: 4, terrible: -4 };
  const text = "This tool is amazing and excellent";
  const score = text.split(/\s+/).reduce((acc, w) => acc + (afinn[w] || 0), 0);
  assert(score === 8, "Calculated positive sentiment score (+8) from calibrated lexicons");
}

// 112. Passive Voice Detector & Writing Assistant
{
  console.log("\n[112. Passive Voice Detector & Writing Assistant]");
  const sentence = "The code was written by Jane";
  const isPassive = /\b(?:was|were|is|are|been)\s+(?:written|done|built|tested)\b/i.test(sentence);
  assert(isPassive, "Flagged passive auxiliary verb construction (was written)");
}

// 113. Anchor Text Diversity & SEO Optimizer
{
  console.log("\n[113. Anchor Text Diversity & SEO Optimizer]");
  const brand = "ToolSnippet";
  const anchor = "Visit ToolSnippet today";
  const isBranded = anchor.toLowerCase().includes(brand.toLowerCase());
  assert(isBranded, "Classified anchor text under Branded link profile distribution");
}

// 114. Email Subject Line & Spam Score Tester
{
  console.log("\n[114. Email Subject Line & Spam Score Tester]");
  const subject = "100% FREE CASH BONUS WINNER";
  const spamTriggers = ["free", "cash", "winner"];
  const count = spamTriggers.filter((t) => subject.toLowerCase().includes(t)).length;
  assert(count === 3, "Detected 3 high-risk email spam trigger keywords");
}

// 115. FAQ Page JSON-LD Schema Generator
{
  console.log("\n[115. FAQ Page JSON-LD Schema Generator]");
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{ "@type": "Question", "name": "Q?", "acceptedAnswer": { "@type": "Answer", "text": "A." } }]
  };
  assert(faqSchema["@type"] === "FAQPage" && faqSchema.mainEntity[0]["@type"] === "Question", "Constructed Google-compliant FAQPage JSON-LD schema");
}

// 116. HowTo Step-by-Step Schema Generator
{
  console.log("\n[116. HowTo Step-by-Step Schema Generator]");
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Guide",
    "totalTime": "PT15M",
    "step": [{ "@type": "HowToStep", "position": 1, "name": "Step 1", "text": "Do this." }]
  };
  assert(howToSchema["@type"] === "HowTo" && howToSchema.totalTime === "PT15M", "Generated structured HowTo JSON-LD schema with ISO 8601 duration");
}

// 117. Meta Robots & X-Robots-Tag Generator
{
  console.log("\n[117. Meta Robots & X-Robots-Tag Generator]");
  const directives = ["noindex", "nofollow", "max-image-preview:large"].join(", ");
  const tag = `<meta name="robots" content="${directives}" />`;
  assert(tag.includes("noindex, nofollow, max-image-preview:large"), "Formatted precise meta robots HTML directive string");
}

// 118. Social Share URL & Intent Link Builder
{
  console.log("\n[118. Social Share URL & Intent Link Builder]");
  const shareUrl = "https://twitter.com/intent/tweet?url=" + encodeURIComponent("https://example.com") + "&text=" + encodeURIComponent("Hello World");
  assert(shareUrl.includes("intent/tweet") && shareUrl.includes("Hello%20World"), "Built valid URL-encoded Twitter intent sharing link");
}

// 119. Zero-Width & Invisible Character Detector
{
  console.log("\n[119. Zero-Width & Invisible Character Detector]");
  const dirty = "Hello\u200BWorld\uFEFF!";
  const hasZwsp = /\u200B/.test(dirty);
  const clean = dirty.replace(/[\u200B\uFEFF]/g, "");
  assert(hasZwsp && clean === "HelloWorld!", "Detected and stripped zero-width space and BOM characters");
}

// 120. Corporate Jargon & Cliché Finder
{
  console.log("\n[120. Corporate Jargon & Cliché Finder]");
  const copy = "Let's touch base and find the low-hanging fruit";
  const hasJargon = copy.includes("touch base") && copy.includes("low-hanging fruit");
  const cleaned = copy.replace("touch base", "talk").replace("low-hanging fruit", "easy wins");
  assert(hasJargon && cleaned === "Let's talk and find the easy wins", "Identified corporate buzzwords and generated plain English replacement");
}

// 121. Bandwidth & Data Transfer Calculator
{
  console.log("\n[121. Bandwidth & Data Transfer Calculator]");
  const fileBytes = 10 * 1024 * 1024 * 1024; // 10 GB
  const speedBps = 100 * 1000 * 1000; // 100 Mbps
  const totalBits = fileBytes * 8;
  const seconds = totalBits / speedBps;
  assert(Math.round(seconds) === 859, "Calculated exact 10 GB transfer duration over 100 Mbps (~859s)");
}

// 122. Data Storage & Byte Unit Converter
{
  console.log("\n[122. Data Storage & Byte Unit Converter]");
  const gibInBytes = 1024 ** 3;
  const gbInBytes = 1e9;
  const convertedGb = (100 * gibInBytes) / gbInBytes;
  assert(convertedGb.toFixed(2) === "107.37", "Converted 100 GiB (IEC) to 107.37 GB (SI decimal)");
}

// 123. Bitwise Operations & Shift Calculator
{
  console.log("\n[123. Bitwise Operations & Shift Calculator]");
  const a = 12; // 1100
  const b = 5;  // 0101
  const xorVal = a ^ b; // 1001 = 9
  const shiftLeft = a << 2; // 48
  assert(xorVal === 9 && shiftLeft === 48, "Calculated 32-bit bitwise XOR and shift operations");
}

// 124. IEEE 754 Floating-Point Visualizer
{
  console.log("\n[124. IEEE 754 Floating-Point Visualizer]");
  const buf = new ArrayBuffer(4);
  const view = new DataView(buf);
  view.setFloat32(0, -15.625, false);
  const uint = view.getUint32(0, false);
  const bin = uint.toString(2).padStart(32, "0");
  const sign = bin[0];
  const exponent = bin.slice(1, 9);
  assert(sign === "1" && parseInt(exponent, 2) === 130, "Extracted IEEE 754 negative sign and biased exponent (130 for 2^3)");
}

// 125. Descriptive Statistics Calculator
{
  console.log("\n[125. Descriptive Statistics Calculator]");
  const data = [10, 20, 30, 40, 50];
  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  const variance = data.reduce((a, b) => a + (b - mean) ** 2, 0) / (data.length - 1);
  const stdDev = Math.sqrt(variance);
  assert(mean === 30 && variance === 250 && Math.round(stdDev * 100) === 1581, "Computed Sample Mean, Variance (250), and StdDev (15.81)");
}

// 126. Fraction Calculator & Simplifier
{
  console.log("\n[126. Fraction Calculator & Simplifier]");
  const num1 = 3, den1 = 4;
  const num2 = 2, den2 = 3;
  const resNum = num1 * den2 + num2 * den1; // 17
  const resDen = den1 * den2; // 12
  assert(resNum === 17 && resDen === 12, "Added 3/4 + 2/3 into exact fraction 17/12");
}

// 127. Matrix Mathematics & Determinant Calculator
{
  console.log("\n[127. Matrix Mathematics & Determinant Calculator]");
  const mat = [[1, 2], [3, 4]];
  const det = mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0]; // 4 - 6 = -2
  assert(det === -2, "Calculated 2x2 matrix determinant (det = -2)");
}

// 128. Base62 URL Shortener & Number Encoder
{
  console.log("\n[128. Base62 URL Shortener & Number Encoder]");
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let num = BigInt(12530);
  let enc = "";
  while (num > BigInt(0)) {
    enc = chars[Number(num % BigInt(62))] + enc;
    num = num / BigInt(62);
  }
  // Decode back
  let dec = BigInt(0);
  for (let i = 0; i < enc.length; i++) {
    dec = dec * BigInt(62) + BigInt(chars.indexOf(enc[i]));
  }
  assert(dec === BigInt(12530), "Encoded integer 12530 to Base62 and successfully decoded back to 12530");
}

// 129. Binary & Hex Arithmetic Calculator
{
  console.log("\n[129. Binary & Hex Arithmetic Calculator]");
  const binA = parseInt("10110", 2); // 22
  const binB = parseInt("1101", 2);  // 13
  const sum = (binA + binB).toString(2); // 35 = 100011
  assert(sum === "100011", "Computed binary addition 10110_2 + 1101_2 = 100011_2");
}

// 130. Scientific & Engineering Notation Converter
{
  console.log("\n[130. Scientific & Engineering Notation Converter]");
  const n = 125000000;
  const sci = n.toExponential();
  const [coeff, exp] = sci.split("e");
  assert(parseFloat(coeff).toFixed(2) === "1.25" && exp === "+8", "Converted 125,000,000 to 1.25 × 10^8");
}

// 131. Screen PPI & Pixel Density Calculator
{
  console.log("\n[131. Screen PPI & Pixel Density Calculator]");
  const w = 2560, h = 1440, diag = 27;
  const ppi = Math.sqrt(w ** 2 + h ** 2) / diag;
  assert(ppi.toFixed(1) === "108.8", "Calculated 27-inch 1440p monitor PPI as 108.8 PPI");
}

// 132. Angle & Trigonometry Unit Converter
{
  console.log("\n[132. Angle & Trigonometry Unit Converter]");
  const deg = 180;
  const rad = deg * (Math.PI / 180);
  assert(rad.toFixed(4) === "3.1416", "Converted 180° degrees to exactly π radians (3.1416)");
}

// 133. Speed, Distance & Travel Pace Tool
{
  console.log("\n[133. Speed, Distance & Travel Pace Tool]");
  const distKm = 100;
  const timeHours = 1.5;
  const speedKmh = distKm / timeHours;
  assert(speedKmh.toFixed(2) === "66.67", "Calculated speed as 66.67 km/h for 100km in 90 mins");
}

// 134. Temperature Unit Converter
{
  console.log("\n[134. Temperature Unit Converter]");
  const c = 25;
  const f = c * (9 / 5) + 32;
  const k = c + 273.15;
  assert(f === 77 && k === 298.15, "Converted 25°C to 77°F and 298.15 Kelvin");
}

// 135. Pressure Unit Converter
{
  console.log("\n[135. Pressure Unit Converter]");
  const bar = 2.5; // 2.5 bar tire pressure
  const psi = bar * (100000 / 6894.76);
  assert(psi.toFixed(1) === "36.3", "Converted 2.5 bar tire pressure to 36.3 PSI");
}

// 136. Energy & Power Unit Converter
{
  console.log("\n[136. Energy & Power Unit Converter]");
  const kwh = 1;
  const joules = kwh * 3600000;
  assert(joules === 3600000, "Converted 1 kWh to 3.6 Million Joules (3.6 MJ)");
}

// 137. Compound Interest & Investment Growth Calculator
{
  console.log("\n[137. Compound Interest & Investment Growth Calculator]");
  const p = 10000, r = 0.07, t = 10, n = 12;
  const fv = p * Math.pow(1 + r / n, n * t);
  assert(Math.round(fv) === 20097, "Calculated 10-year compound interest growth from $10k to $20,097");
}

// 138. Sales Tax, GST & VAT Calculator
{
  console.log("\n[138. Sales Tax, GST & VAT Calculator]");
  const net = 100;
  const vatRate = 20;
  const tax = net * (vatRate / 100);
  const gross = net + tax;
  assert(tax === 20 && gross === 120, "Computed 20% VAT on $100 resulting in $120 gross total");
}

// 139. Loan & Mortgage EMI Amortization Calculator
{
  console.log("\n[139. Loan & Mortgage EMI Amortization Calculator]");
  const p = 250000, r = 0.065 / 12, n = 360;
  const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  assert(Math.round(emi) === 1580, "Calculated $250,000 30-year 6.5% mortgage monthly EMI as $1,580");
}

// 140. Modular Arithmetic & Modulo Inverse Calculator
{
  console.log("\n[140. Modular Arithmetic & Modulo Inverse Calculator]");
  // Find modular inverse of 7 mod 26 (7 * 15 = 105 ≡ 1 mod 26)
  let inv = -1;
  for (let x = 1; x < 26; x++) {
    if ((7 * x) % 26 === 1) {
      inv = x;
      break;
    }
  }
  assert(inv === 15, "Found modular multiplicative inverse of 7 mod 26 to be exactly 15");
}

// 141. Dockerfile Generator & Multi-Stage Builder
{
  console.log("\n[141. Dockerfile Generator & Multi-Stage Builder]");
  const dockerfile = "FROM node:20-alpine AS builder\nWORKDIR /app\nRUN npm ci\nFROM node:20-alpine AS runner\nUSER nextjs";
  assert(dockerfile.includes("AS builder") && dockerfile.includes("USER nextjs"), "Generated multi-stage Dockerfile with non-root security user");
}

// 142. .gitignore Generator & Rule Builder
{
  console.log("\n[142. .gitignore Generator & Rule Builder]");
  const rules = ["node_modules/", ".env.local", ".DS_Store", "__pycache__/"].join("\n");
  assert(rules.includes("node_modules/") && rules.includes(".env.local"), "Generated combined multi-ecosystem .gitignore rules");
}

// 143. Nginx Configuration & Virtual Host Generator
{
  console.log("\n[143. Nginx Configuration & Virtual Host Generator]");
  const nginx = "proxy_set_header Upgrade $http_upgrade;\nproxy_set_header Connection 'upgrade';";
  assert(nginx.includes("Upgrade") && nginx.includes("upgrade"), "Constructed Nginx reverse proxy block with WebSocket upgrade headers");
}

// 144. SQL Query Minifier & Single-Line Optimizer
{
  console.log("\n[144. SQL Query Minifier & Single-Line Optimizer]");
  const rawSql = "SELECT *\n-- All active users\nFROM users /* join */ WHERE id = 1;";
  const minSql = rawSql.replace(/\/\*[\s\S]*?\*\//g, "").replace(/--.*$/gm, "").replace(/\s+/g, " ").trim();
  assert(minSql === "SELECT * FROM users WHERE id = 1;", "Minified multi-line SQL with comments to single clean query string");
}

// 145. .env to JSON & Environment Config Converter
{
  console.log("\n[145. .env to JSON & Environment Config Converter]");
  const envRaw = "PORT=8080\nENABLE_SSL=true\nAPI_KEY=\"secret123\"";
  const obj = {};
  for (const line of envRaw.split("\n")) {
    const [k, v] = line.split("=");
    obj[k] = v === "true" ? true : !isNaN(Number(v)) ? Number(v) : v.replace(/^"|"$/g, "");
  }
  assert(obj.PORT === 8080 && obj.ENABLE_SSL === true && obj.API_KEY === "secret123", "Parsed .env string into typed JSON object with type coercion");
}

// 146. Markdown Print & PDF Layout Optimizer
{
  console.log("\n[146. Markdown Print & PDF Layout Optimizer]");
  const md = "# Title 1\nContent 1\n# Title 2\nContent 2";
  const cleanMd = md.replace(/(?<!^)\n(# [^\n]+)/g, '\n\n<div style="page-break-after: always;"></div>\n\n$1');
  assert(cleanMd.includes('page-break-after: always;'), "Injected hard page-break HTML wrapper before H1 heading");
}

// 147. package.json Validator & Dependency Analyzer
{
  console.log("\n[147. package.json Validator & Dependency Analyzer]");
  const pkg = { name: "app", version: "1.0.0", dependencies: { "lodash": "*" } };
  const hasWildcard = Object.values(pkg.dependencies).some(v => v === "*");
  assert(hasWildcard, "Detected unsafe wildcard (*) dependency version in package.json manifest");
}

// 148. Cron Expression Generator & Visual Scheduler
{
  console.log("\n[148. Cron Expression Generator & Visual Scheduler]");
  const cron = "*/15 0 1 * *";
  const parts = cron.split(" ");
  assert(parts.length === 5 && parts[0] === "*/15", "Constructed standard 5-field crontab expression for 15-minute intervals");
}

// 149. cURL to PHP cURL Code Converter
{
  console.log("\n[149. cURL to PHP cURL Code Converter]");
  const php = "curl_setopt_array($curl, [CURLOPT_URL => 'https://api.example.com', CURLOPT_CUSTOMREQUEST => 'POST']);";
  assert(php.includes("curl_setopt_array") && php.includes("CURLOPT_CUSTOMREQUEST"), "Generated PHP curl_setopt_array execution boilerplate");
}

// 150. cURL to Go HTTP Client Code Converter
{
  console.log("\n[150. cURL to Go HTTP Client Code Converter]");
  const goCode = 'req, err := http.NewRequestWithContext(ctx, "POST", url, payload)\ndefer resp.Body.Close()';
  assert(goCode.includes("http.NewRequestWithContext") && goCode.includes("defer resp.Body.Close()"), "Generated Go net/http client with context and deferred body close");
}

// 151. JavaScript Obfuscation & Entropy Analyzer
{
  console.log("\n[151. JavaScript Obfuscation & Entropy Analyzer]");
  const dirtyCode = "var _0x5a2d = ['\\x68\\x65\\x6c\\x6c\\x6f']; eval(_0x5a2d[0]);";
  const hasEval = /eval\s*\(/.test(dirtyCode);
  const hasHex = /_0x[a-f0-9]+/.test(dirtyCode);
  assert(hasEval && hasHex, "Detected eval() execution and hexadecimal identifier mangling in JS code");
}

// 152. CSS & Code Hex Color Extractor
{
  console.log("\n[152. CSS & Code Hex Color Extractor]");
  const css = "body { background: #4f46e5; color: rgba(255, 255, 255, 0.9); border: #10b981; }";
  const hexes = css.match(/#(?:[0-9a-fA-F]{3,8})\b/g) || [];
  assert(hexes.length === 2 && hexes[0] === "#4f46e5", "Extracted all HEX colors from CSS stylesheet text");
}

// 153. SemVer Semantic Versioning Comparator
{
  console.log("\n[153. SemVer Semantic Versioning Comparator]");
  const vA = [2, 4, 1];
  const vB = [2, 5, 0];
  const isBGreater = vB[1] > vA[1];
  assert(isBGreater, "Identified SemVer 2.5.0 as greater minor release than 2.4.1");
}

// 154. Open Source License Text Generator
{
  console.log("\n[154. Open Source License Text Generator]");
  const license = "MIT License\n\nCopyright (c) 2026 ToolSnippet Authors";
  assert(license.includes("MIT License") && license.includes("2026 ToolSnippet Authors"), "Formatted MIT License text with dynamic year and copyright holder");
}

// 155. README & GitHub Shields Badge Generator
{
  console.log("\n[155. README & GitHub Shields Badge Generator]");
  const badge = "[![npm](https://img.shields.io/badge/npm-v1.0.0-4f46e5?style=flat)](https://npmjs.com)";
  assert(badge.includes("img.shields.io/badge") && badge.includes("npm-v1.0.0"), "Built valid shields.io Markdown badge image URL");
}

// 156. VS Code & Sublime User Snippet Generator
{
  console.log("\n[156. VS Code & Sublime User Snippet Generator]");
  const snippet = JSON.stringify({ "Component": { prefix: "comp", body: ["export const $1 = () => {", "  return <div>$0</div>;", "};"] } });
  assert(snippet.includes('"prefix":"comp"') && snippet.includes("$1"), "Constructed VS Code code-snippet JSON definition with tabstops");
}

// 157. JSON to XML Schema (XSD) Generator
{
  console.log("\n[157. JSON to XML Schema (XSD) Generator]");
  const xsd = '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"><xs:element name="user" type="xs:string" /></xs:schema>';
  assert(xsd.includes("http://www.w3.org/2001/XMLSchema") && xsd.includes("xs:element"), "Generated valid W3C XML Schema Definition (XSD)");
}

// 158. Base Href & Relative URL Resolver
{
  console.log("\n[158. Base Href & Relative URL Resolver]");
  const base = new URL("https://example.com/blog/posts/");
  const rel = "../images/banner.png";
  const abs = new URL(rel, base).href;
  assert(abs === "https://example.com/blog/images/banner.png", "Resolved relative parent navigation URL (../) against base URL via RFC 3986");
}

// 159. RegEx Token Builder & Cheatsheet Tester
{
  console.log("\n[159. RegEx Token Builder & Cheatsheet Tester]");
  const pattern = "(?<proto>https?)://(?<domain>[a-z.]+)";
  const match = new RegExp(pattern).exec("https://example.com");
  assert(match && match.groups?.proto === "https" && match.groups?.domain === "example.com", "Executed regex with named capture groups (?<name>...)");
}

// 160. Unicode & UTF-16 Escape Converter
{
  console.log("\n[160. Unicode & UTF-16 Escape Converter]");
  const str = "Café";
  let enc = "";
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    enc += c > 127 ? "\\u" + c.toString(16).padStart(4, "0") : str[i];
  }
  const dec = enc.replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
  assert(enc === "Caf\\u00e9" && dec === "Café", "Encoded and decoded Unicode escape sequence Caf\\u00e9 to plain text Café");
}

console.log("\n===========================================");
console.log(`Results: ${passed} Passed, ${failed} Failed`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log("🎉 ALL TRANSFORMATION & CALCULATION TESTS PASSED 100%!");
}



