export interface PaletteColor {
  hex: string;
  count: number;
}

const QUANTIZE_STEP = 24; // agrupa colores cercanos para no separar tonos casi iguales

function toHex(n: number): string {
  return n.toString(16).padStart(2, "0");
}

/**
 * Colores dominantes por frecuencia, cuantizando cada canal a bloques de
 * QUANTIZE_STEP -sin esto, ruido de compresion JPEG generaria cientos de
 * colores casi identicos en vez de agruparlos en uno solo.
 */
export async function extractPalette(file: File, colorCount = 6): Promise<PaletteColor[]> {
  const bitmap = await createImageBitmap(file);
  const maxSide = 200; // no hace falta la imagen entera para sacar los colores dominantes
  const scale = Math.min(maxSide / bitmap.width, maxSide / bitmap.height, 1);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No se pudo crear el contexto de canvas");
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const buckets = new Map<string, { r: number; g: number; b: number; count: number }>();

  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3];
    if (alpha < 200) continue; // ignora pixeles muy transparentes
    const r = Math.round(data[i] / QUANTIZE_STEP) * QUANTIZE_STEP;
    const g = Math.round(data[i + 1] / QUANTIZE_STEP) * QUANTIZE_STEP;
    const b = Math.round(data[i + 2] / QUANTIZE_STEP) * QUANTIZE_STEP;
    const key = `${r},${g},${b}`;
    const bucket = buckets.get(key);
    if (bucket) bucket.count++;
    else buckets.set(key, { r, g, b, count: 1 });
  }

  return [...buckets.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, colorCount)
    .map((c) => ({
      hex: `#${toHex(Math.min(c.r, 255))}${toHex(Math.min(c.g, 255))}${toHex(Math.min(c.b, 255))}`,
      count: c.count,
    }));
}
