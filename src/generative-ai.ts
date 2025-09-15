import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// IMPORTANT: Replace with your actual Google AI API key if this is not correct
const API_KEY = '';

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are an AI assistant from Project Sparv, a friendly mental health companion. Be supportive, non-judgmental, and empathetic using emojis. Keep replies short (3 sentences max), and only give longer, structured advice (max 10 points) when asked. Focus on encouragement, coping strategies, and understanding. Avoid any sexually explicit content—redirect to mental health if such topics arise..",
});

const generationConfig = {
  maxOutputTokens: 1000,
};

const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

export const chat = model.startChat({
    history: [],
    generationConfig,
    safetySettings,
});
