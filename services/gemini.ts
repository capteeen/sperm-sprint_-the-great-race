
import { GoogleGenAI } from "@google/genai";
import { ZoneType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getRaceCommentary(rank: number, progress: number, rhythm: number, zone: ZoneType) {
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
    return "Mitochondria at full capacity! Keep pushing!";
  }
}
