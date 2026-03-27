const fs = require('fs');
const path = require('path');
const axios = require('axios');
const sharp = require('sharp');
const { encode } = require('blurhash');

const INPUT_FILE = path.join(__dirname, '../assets/without_logo.min.json');
const OUTPUT_FILE = path.join(__dirname, '../assets/withLogoBlurHash.min.json');
const OUTPUT_FILE2 = path.join(__dirname, '../assets/withLogoBlurHash2.min.json');
const LOGO_URL_PREFIX = 'https://cdn.jsdelivr.net/gh/ahmeterenodaci/New-York-Stock-Exchange--NYSE--including-Symbols-and-Logos/logos/_';
const CONCURRENCY_LIMIT = 10;

async function getBlurHash(symbol) {
  const url = `${LOGO_URL_PREFIX}${symbol}.png`;
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer', timeout: 5000 });
    const buffer = Buffer.from(response.data);

    const { data, info } = await sharp(buffer)
      .raw()
      .ensureAlpha()
      .resize(32, 32, { fit: 'inside' })
      .toBuffer({ resolveWithObject: true });

    const hash = encode(new Uint8ClampedArray(data), info.width, info.height, 4, 3);
    return hash;
  } catch (error) {
    // console.error(`Failed to compute blurhash for ${symbol}: ${error.message}`);
    return null;
  }
}


async function main() {
  console.log('Reading input file...');
  const data = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
  const total = data.length;
  const results = [];

  console.log(`Processing ${total} items with concurrency limit ${CONCURRENCY_LIMIT}...`);

  for (let i = 0; i < total; i += 1) {
    // const batch = data.slice(i, i + CONCURRENCY_LIMIT);
    // const promises = batch.map(async (item) => {
    if (!data[i].blurhash) {
      data[i].blurhash = await getBlurHash(data[i].symbol);
    }
    // return { ...item, blurhash };
    // });

    // const batchResults = await Promise.all(promises);
    // results.push(...batchResults);

    if (i % 100 === 0 || i + 1 === total) {
      console.log(`Processed ${Math.min(i + CONCURRENCY_LIMIT, total)} / ${total} items...`);
    }
  }

  console.log('Writing output file...');
  fs.writeFileSync(OUTPUT_FILE2, JSON.stringify(data, null, 2));
  console.log(`Done! Output saved to ${OUTPUT_FILE}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
