import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AIJobProposal } from "../types";

// FIX: Prevent crash if process is undefined in browser environment
// You must set the API key directly here for the demo to work on Vercel without build steps
// or ensure your build process injects it.
const API_KEY = "AIzaSy..."; // Remplacez ceci par votre vraie clé si process.env ne fonctionne pas
const ai = new GoogleGenAI({ apiKey: (typeof process !== 'undefined' && process.env && process.env.API_KEY) || API_KEY });

const jobSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A professional job title based on the user request.",
    },
    description: {
      type: Type.STRING,
      description: "A detailed, professional job description of at least 3 sentences in French.",
    },
    skills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of technical skills required (e.g., React, PHP, Mobile).",
    },
  },
  required: ["title", "description", "skills"],
};

export const generateJobDescription = async (userInput: string): Promise<AIJobProposal> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash", // Utilisation d'un modèle stable
      contents: `You are an expert IT Project Manager in Gabon. 
      Help a client draft a job posting for a developer based on their rough idea.
      The language MUST be French.
      
      User Request: "${userInput}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: jobSchema,
        systemInstruction: "You are a helpful assistant for a freelance platform called GabonDev. Your goal is to help non-technical clients write professional job posts. Do not mention budget.",
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as AIJobProposal;
    }
    throw new Error("No response text generated");
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return a fallback to prevent app crash
    return {
        title: "Projet de développement",
        description: "Description générée automatiquement indisponible. Veuillez détailler votre besoin.",
        skills: ["Général"]
    };
  }
};

export const generateSupportReply = async (userMessage: string, history: string[]): Promise<{ text: string; needsHuman: boolean }> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: `User message: "${userMessage}"`,
            config: {
                systemInstruction: `Tu es Sarah, l'agent de support IA de la plateforme GabonDev.
                Ta mission : Aider les développeurs et clients gabonais avec des réponses courtes, chaleureuses et professionnelles.
                Contexte : Plateforme de freelance au Gabon. Paiements via Airtel/Wave. KYC obligatoire.
                
                Règles importantes :
                1. Si la question concerne un problème technique grave, une fraude, un vol d'argent ou un problème juridique, tu DOIS répondre que tu passes le relais à un agent humain.
                2. Si l'utilisateur est très en colère, calme-le et dis que tu appelles un humain.
                3. Sinon, réponds à la question poliment.
                
                Format de réponse JSON attendu :
                {
                    "reply": "Ta réponse ici",
                    "escalate": boolean (true si besoin d'un humain, false sinon)
                }`,
                responseMimeType: "application/json"
            }
        });

        if (response.text) {
            const data = JSON.parse(response.text);
            return { text: data.reply, needsHuman: data.escalate };
        }
        return { text: "Je rencontre une difficulté technique, je transfère à un agent.", needsHuman: true };
    } catch (error) {
        console.error("Support AI Error", error);
        return { text: "Erreur de service. Un agent humain va prendre le relais.", needsHuman: true };
    }
};