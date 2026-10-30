import sharp from 'sharp';

// Generate a local social card from vector artwork; no remote image requests.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#080808"/>
<g stroke="#262626" fill="none"><path d="M70 70h1060M70 550h1060"/><circle cx="995" cy="285" r="110"/><ellipse cx="995" cy="285" rx="46" ry="110" transform="rotate(45 995 285)"/><ellipse cx="995" cy="285" rx="46" ry="110" transform="rotate(-45 995 285)"/></g>
<g font-family="Arial,Helvetica,sans-serif"><text x="70" y="115" fill="#aaa" font-size="16" letter-spacing="3">SOFTWARE DEVELOPER</text><text x="65" y="270" fill="#f2f2f2" font-size="112" font-weight="500" letter-spacing="-6">Adrián</text><text x="65" y="385" fill="#999" font-size="112" font-weight="500" letter-spacing="-6">Barrios.</text><text x="70" y="470" fill="#ddd" font-size="26">Backend · Data · AI</text><text x="70" y="585" fill="#aaa" font-size="14">PROYECTOS / ARQUITECTURA / SOFTWARE</text></g></svg>`;
await sharp(Buffer.from(svg)).png().toFile('public/og.png');
console.log('Generated public/og.png (1200 × 630)');
