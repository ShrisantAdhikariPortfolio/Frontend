import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'src/data');

export function readFallbackData<T>(fileName: string, defaultVal: T): T {
  try {
    const filePath = path.join(dataDir, fileName);
    if (!fs.existsSync(filePath)) {
      return defaultVal;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (err) {
    console.error(`Error reading fallback data from ${fileName}:`, err);
    return defaultVal;
  }
}

export function writeFallbackData<T>(fileName: string, data: T): void {
  try {
    const filePath = path.join(dataDir, fileName);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing fallback data to ${fileName}:`, err);
  }
}
