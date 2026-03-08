// Find:
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Replace with:
const key = process.env.API_KEY ?? import.meta.env.VITE_GEMINI_API_KEY;
const ai = key ? new GoogleGenAI({ apiKey: key }) : null;
