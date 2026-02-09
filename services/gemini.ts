
import { GoogleGenAI } from "@google/genai";
import { ZoneType } from "../types";

// Only initialize AI if API key is available
const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  try {
    ai = new GoogleGenAI({ apiKey });
  } catch (e) {
    console.warn("Failed to initialize Gemini AI:", e);
  }
}

// Fallback commentary when AI is not available
const FALLBACK_COMMENTS = [
  "Mitochondria at full capacity! Keep pushing!",
  "Swimming like a champion! Don't stop now!",
  "The flagellum is on fire! Go go go!",
  "Powering through the biological maze!",
  "You're making waves in this race!",
  "Cellular propulsion at maximum!",
  "Navigating like a pro!",
  "That's some serious tail action!",
  "Breaking through the barriers!",
  "Motility score: LEGENDARY!",
];

export async function getRaceCommentary(rank: number, progress: number, rhythm: number, zone: ZoneType) {
  // Return fallback if AI is not available
  if (!ai) {
    return FALLBACK_COMMENTS[Math.floor(Math.random() * FALLBACK_COMMENTS.length)];
  }

  try {
    const zoneNames: Record<ZoneType, string> = {
      vagina: 'the Acidic Vagina',
      cervix: 'the Mucus-filled Cervix',
      uterus: 'the Vast Uterus',
      tube: 'the Fallopian Tube'
    };

    const prompt = `You are a high-energy, humorous biological sports announcer for a sperm race. 
    Current Zone: ${zoneNames[zone]}.
    Current Rank: #${rank.toLocaleString()}. 
    Progress: ${Math.floor(progress)}%.
    Rhythm Score: ${rhythm}/100.
    
    Give a short, punchy (under 12 words) update about their performance using biology puns specific to this zone. 
    Be funny and intense. 
    Return ONLY the string commentary.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.9,
        topP: 0.8,
        maxOutputTokens: 50,
      }
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini Error:", error);
    return FALLBACK_COMMENTS[Math.floor(Math.random() * FALLBACK_COMMENTS.length)];
  }
}
