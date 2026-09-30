import { readFileSync, writeFileSync, copyFileSync, mkdirSync, rmSync, readdirSync, statSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import JSZip from 'jszip';

const ORIGINAL_DOCX = 'C:/Users/Usuario/Downloads/gfft10-formato-solicitud-de-devolucion-por-tramites-de-identificacion.docx';
const OUT_DOCX = 'C:/Users/Usuario/Downloads/gfft10-diligenciado-hanner-FINAL.docx';
const OUT_PDF = 'C:/Users/Usuario/Downloads/gfft10-diligenciado-hanner-FINAL.pdf';
const WORK = 'C:/Users/Usuario/AppData/Local/Temp/gfft10-fill';
const SOFFICE = 'C:\\Program Files\\LibreOffice\\program\\soffice.com';

// 1. Clean workspace and copy original
rmSync(WORK, { recursive: true, force: true });
mkdirSync(WORK, { recursive: true });
copyFileSync(ORIGINAL_DOCX, OUT_DOCX);

// 2. Unzip into work dir
execSync(`unzip -o "${OUT_DOCX}" -d "${WORK}"`, { stdio: 'inherit' });

// 3. Read document.xml
const docXmlPath = path.join(WORK, 'word', 'document.xml');
let xml = readFileSync(docXmlPath, 'utf8');

// 4. Apply replacements. Each pattern matches the exact underscore string in the docx.
const repl = [
  // Name field
  ['Yo (nombres y apellidos completos)______________________________________,',
   'Yo (nombres y apellidos completos) HANNER ANDRÉS BARROS URIETA,'],
  // C.C.
  ['identificado con C.C. N°:_______________________________,',
   'identificado con C.C. N°: 1.001.890.190,'],
  // Ciudad
  ['en la ciudad de ____________________________,',
   'en la ciudad de BARRANQUILLA,'],
  // Departamento
  ['departamento de ______________________________,',
   'departamento de ATLÁNTICO,'],
  // Día
  ['el día _______________________,',
   'el día 09,'],
  // Mes
  ['del mes __________________,',
   'del mes ENERO,'],
  // Año
  ['del año__________,',
   'del año 2026,'],
  // Valor
  ['por valor de $________________',
   'por valor de $72.450'],
  // Tipo de documento (CC / TI / RC)
  ['CC_____ Tl _____ RC _____,',
   'CC [X] Tl [ ] RC [ ],'],
  // Primera vez / Renovación / Otro
  ['por primera vez _____,', 'por primera vez [ ],'],
  ['Renovación_____', 'Renovación [ ]'],
  ['Otro (¿Cuál?) ____________.',
   'Otro (¿Cuál?) EXPEDICIÓN DE CÉDULA DIGITAL.'],
  // Motivo (75 underscores) — keep short to avoid page 2
  ['___________________________________________________________________________',
   'Pago realizado por PSE el 09/01/2026, CUS N° 2072011987, por $72.450 para Cédula Digital ante el Fondo Rotatorio de la RNEC. La cédula no ha sido entregada y he desistido del trámite; solicito la devolución del valor pagado.'],
  // Cuenta autorizada — pad with underscores to preserve original visual widths
  ['ahorros_____ ,', 'ahorros [X] ,'],
  ['corriente_____ ,', 'corriente [ ] ,'],
  ['del Banco ____________________N° _________________________',
   'del Banco NEQUI (Banco Nequi S.A.) N° 3011989727______________'],
  ['Nombre del titular de la cuenta ___________________________________',
   'Nombre del titular de la cuenta HANNER ANDRÉS BARROS URIETA______'],
  // Footer — pad each value with trailing underscores so the original wrapping is preserved.
  // Firma deliberately stays blank (will be signed by hand after printing).
  ['Dirección: ________________________________',
   'Dirección: Carrera 22 # 25-37______________'],
  ['Ciudad: ___________________________________',
   'Ciudad: Barranquilla, Atlántico____________'],
  ['Teléfono fijo____________________________',
   'Teléfono fijo: N/A_________________________'],
  ['N°:Celular:________________',
   'N°:Celular: +57 301 198 9727'],
  ['Correo Electrónico:________________________________________',
   'Correo Electrónico: hannerb48@gmail.com_______________________________'],
];

let missing = [];
for (const [find, replace] of repl) {
  if (!xml.includes(find)) {
    missing.push(find.slice(0, 60));
    continue;
  }
  xml = xml.replaceAll(find, replace);
}

if (missing.length) {
  console.error('PATTERNS NOT FOUND:');
  missing.forEach(p => console.error(' -', p));
  process.exit(1);
}

// 5. Write modified document.xml
writeFileSync(docXmlPath, xml, 'utf8');

// 6. Repack docx with JSZip ([Content_Types].xml added first)
rmSync(OUT_DOCX);
const zip = new JSZip();
function walk(dir, base = '') {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const rel = base ? `${base}/${entry}` : entry;
    if (statSync(full).isDirectory()) walk(full, rel);
    else zip.file(rel, readFileSync(full));
  }
}
// Add [Content_Types].xml first to satisfy OOXML spec
zip.file('[Content_Types].xml', readFileSync(path.join(WORK, '[Content_Types].xml')));
// Add everything else
for (const entry of readdirSync(WORK)) {
  if (entry === '[Content_Types].xml') continue;
  const full = path.join(WORK, entry);
  if (statSync(full).isDirectory()) walk(full, entry);
  else zip.file(entry, readFileSync(full));
}
const buf = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
writeFileSync(OUT_DOCX, buf);

// 7. Convert to PDF with LibreOffice
execSync(`"${SOFFICE}" --headless --convert-to pdf --outdir "C:/Users/Usuario/Downloads/" "${OUT_DOCX}"`, { stdio: 'inherit' });

console.log('\nOK:');
console.log('  docx:', OUT_DOCX);
console.log('  pdf: ', OUT_PDF);
