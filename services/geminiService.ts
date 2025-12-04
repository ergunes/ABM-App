import { GoogleGenAI, Type, Modality } from "@google/genai";
import { GeneratedExperience, Principle, Language } from "../types";
import { UI_TEXT } from "../constants";

const apiKey = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

// Helper function to decode base64 string
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Helper function to decode raw PCM audio data
export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1
): Promise<AudioBuffer> {
  const bufferToUse = data.byteLength % 2 === 0 
    ? data.buffer 
    : data.buffer.slice(0, data.byteLength - (data.byteLength % 2));
    
  const dataInt16 = new Int16Array(bufferToUse);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// Detailed context based on the official PDF descriptions
const PRINCIPLE_CONTEXTS: Record<number, string> = {
  1: "Move often and bring attention to what you feel as you move. Your brain will start building billions of new connections, creating new possibilities and transformation.",
  2: "Slow way down to learn new skills and overcome limitations. Fast you can only do what you already know. Slow stimulates the formation of rich new neural patterns.",
  3: "Introduce variation (call it play, mistakes, exploration) into everything you do. Your brain will create new possibilities in your movements, feelings, thoughts, and action.",
  4: "Reduce the force with which you move, think, and act. Develop greater sensitivity that will enhance your brain’s ability to perceive the finest of differences, and therefore learn.",
  5: "Enthusiasm is a skill you can develop. It is a choice to appreciate and take delight in the small things. It amplifies what is important and grooves in new learning in your brain.",
  6: "If you knew how to reach your goal, you’d already be there. Embrace unexpected steps and mistakes along the way. With this rich information, discover the path to achieving your goal.",
  7: "The brain is either in a learning mode—or not. Expect that you will do, think, or learn something NEW in each situation, even familiar ones, to turn your learning switch ON.",
  8: "Imagine and dream! With imagination, you can create what has never been there before. Dreams call you and guide you from your future. Both will elevate you to new heights, transcending your limitations.",
  9: "Become aware of what you are doing, sensing, thinking, and experiencing at any moment. Awareness is an action. When you are aware, you are fully alive and present."
};

export const generateExercise = async (principle: Principle, language: Language): Promise<GeneratedExperience> => {
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  // Use the ID to get the specific context from the PDF definition
  const specificContext = PRINCIPLE_CONTEXTS[principle.id] || principle.description;

  const abmMethodologyInstruction = `
    Based on the Anat Baniel Method (NeuroMovement) 9 Essentials.
    Do NOT create a fitness exercise, a stretch, or a generic meditation.
    Create a 'Micro-Experience' (Erlebnis / Deneyim) that embodies the specific essential definition below.
    
    The Essential: "${principle.title}"
    Definition from Source: "${specificContext}"
    
    Instruction: Create a brief (approx 1 min) guided experience where the user performs a very small, safe, internal or external action to FEEL this principle.
    Focus on sensation, perception, and the nervous system, not muscle building.
  `;

  // Define language-specific prompts
  const prompts = {
    tr: `${abmMethodologyInstruction}
         Kullanıcının şu an (otururken/ayaktayken) yapabileceği kısa bir "Deneyim" (Experience) tasarla.
         Mekanik bir egzersiz değil, bir keşif olsun.
         Ses tonu: Nazik, davetkar, yavaş.
         Çıktı dili: Türkçe.`,
    en: `${abmMethodologyInstruction}
         Design a short "Experience" that the user can do right now (sitting/standing).
         Not a mechanical exercise, but an exploration/discovery.
         Tone: Gentle, inviting, slow.
         Output language: English.`,
    de: `${abmMethodologyInstruction}
         Entwerfe ein kurzes "Erlebnis" (keine Übung!), das der Benutzer jetzt sofort (im Sitzen/Stehen) machen kann.
         Es soll keine mechanische Wiederholung sein, sondern eine Entdeckung.
         Tonfall: Sanft, einladend, langsam.
         Ausgabesprache: Deutsch.`
  };

  const currentPrompt = prompts[language];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: currentPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Experience title" },
            content: { type: Type.STRING, description: "Step by step instructions for the experience" },
            duration: { type: Type.STRING, description: "Estimated duration" },
          },
          required: ["title", "content", "duration"],
        },
      },
    });

    if (response.text) {
      let jsonStr = response.text.trim();
      // Cleanup Markdown code blocks if present
      if (jsonStr.startsWith('```json')) {
        jsonStr = jsonStr.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      return JSON.parse(jsonStr) as GeneratedExperience;
    }
    throw new Error("Empty response from AI");
  } catch (error) {
    console.error("Gemini Error:", error);
    const fallback = UI_TEXT[language];
    return {
      title: fallback.fallbackTitle,
      content: fallback.fallbackContent,
      duration: fallback.fallbackDuration
    };
  }
};

export const generateExerciseAudio = async (text: string, language: Language): Promise<Uint8Array | null> => {
  if (!apiKey) {
    console.error("API Key not found for Audio");
    return null;
  }

  const toneInstruction = {
    tr: "Lütfen bu metni çok yavaş, nazik, sakinleştirici ve meditatif bir ses tonuyla oku. Cümleler arasında belirgin esler ver: ",
    en: "Please read this text in a very slow, gentle, soothing, and meditative tone. Pause clearly between sentences: ",
    de: "Bitte lesen Sie diesen Text in einem sehr langsamen, sanften, beruhigenden und meditativen Ton. Mach deutliche Pausen: "
  };

  const promptText = `${toneInstruction[language]} "${text}"`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: promptText }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return decode(base64Audio);
    }
    return null;
  } catch (error) {
    console.error("Gemini TTS Error:", error);
    return null;
  }
};