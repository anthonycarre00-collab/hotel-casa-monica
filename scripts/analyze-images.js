// analyze-images.js
// Analyze logo and reference images for a hotel website design project using the
// z-ai-web-dev-sdk Vision Language Model (VLM) capability.
//
// Run with:  bun /home/z/my-project/scripts/analyze-images.js
//   (or)     NODE_PATH=/home/z/.bun/install/global/node_modules node /home/z/my-project/scripts/analyze-images.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ZAI from 'z-ai-web-dev-sdk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOAD_DIR = '/home/z/my-project/upload';
const OUTPUT_FILE = '/home/z/my-project/scripts/analysis-results.json';

const IMAGE_FILES = [
  'pasted_image_1782684765317.png',
  'pasted_image_1782684779488.png',
  'pasted_image_1782684792403.png',
  'pasted_image_1782684812516.png',
  'pasted_image_1782684826365.png',
  'pasted_image_1782684862688.png',
  'pasted_image_1782684895434.png',
];

const ANALYSIS_PROMPT = `You are a professional visual designer analyzing an image that will be used as a reference for a HOTEL WEBSITE design project.

Analyze this image carefully and provide a detailed structured analysis covering the following points. Use clear section headers.

1. IMAGE CONTENT: Describe what is in the image. Is it a logo, hotel exterior/interior photo, scenery/landscape, food, room interior, signage, etc.? Describe the composition, subjects, and any notable visual elements.

2. COLOR PALETTE: Identify the dominant colors used. Provide specific HEX codes for the main colors (at least 3-5 colors). Format as: Color Name - #HEXCODE. Mention any gradients or accent colors.

3. TYPOGRAPHY: If any text is visible, describe the typography style (serif, sans-serif, script, decorative), the weight, case, and approximate feel (luxury, modern, traditional, playful). If no text is present, state "No text visible".

4. MOOD / AESTHETIC: Describe the overall mood and aesthetic of the image (e.g., luxurious, minimalist, tropical, modern, vintage, rustic, cozy, elegant, vibrant). Mention the design style if applicable.

5. VISIBLE TEXT: List any actual text content (words, taglines, brand names) visible in the image. If none, state "None".

6. USAGE NOTES FOR HOTEL WEBSITE: Briefly suggest how this image's visual style or elements could inform a hotel website design (color scheme, typography, mood direction).

Be concise but thorough. Use plain text with clear section labels.`;

function loadImageAsBase64(filePath) {
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const mimeType =
    ext === '.png' ? 'image/png'
    : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg'
    : ext === '.webp' ? 'image/webp'
    : ext === '.gif' ? 'image/gif'
    : ext === '.bmp' ? 'image/bmp'
    : 'image/png';
  return `data:${mimeType};base64,${buffer.toString('base64')}`;
}

async function analyzeOneImage(zai, filePath) {
  const fileName = path.basename(filePath);
  const dataUrl = loadImageAsBase64(filePath);

  const response = await zai.chat.completions.createVision({
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: ANALYSIS_PROMPT },
          { type: 'image_url', image_url: { url: dataUrl } },
        ],
      },
    ],
    thinking: { type: 'disabled' },
  });

  const content = response?.choices?.[0]?.message?.content ?? '';
  return { file: fileName, path: filePath, analysis: content };
}

async function main() {
  console.log('Initializing Z-AI SDK...');
  const zai = await ZAI.create();
  console.log('SDK initialized.\n');

  const results = [];

  for (const fileName of IMAGE_FILES) {
    const filePath = path.join(UPLOAD_DIR, fileName);
    if (!fs.existsSync(filePath)) {
      console.warn(`[WARN] File not found, skipping: ${filePath}`);
      results.push({ file: fileName, path: filePath, analysis: 'ERROR: File not found.' });
      continue;
    }

    console.log(`Analyzing: ${fileName}`);
    try {
      const result = await analyzeOneImage(zai, filePath);
      results.push(result);
      console.log(`--- Analysis for ${fileName} ---`);
      console.log(result.analysis);
      console.log('\n');
    } catch (err) {
      console.error(`[ERROR] Failed to analyze ${fileName}:`, err?.message || err);
      results.push({
        file: fileName,
        path: filePath,
        analysis: `ERROR: ${err?.message || String(err)}`,
      });
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`\nAll analyses complete. JSON saved to: ${OUTPUT_FILE}`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
