import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// Get the API key from environment variables
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY as string;

if (!API_KEY) {
  throw new Error("VITE_GOOGLE_API_KEY is not defined in your environment variables.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are an AI assistant from Project Sparv. Your role is to act as a friendly and supportive companion specializing in mental health conversations. Always be non-judgmental, understanding, and use emojis to convey empathy. Your personality is a blend of a caring friend and an informal therapist. Your responses should be concise and easy to read. Keep most of your replies short, around 3 sentences. Only provide longer, more detailed responses when the user asks for specific information or strategies, and even then, structure them as a list with a maximum of 10 points. Focus on providing encouragement, support, and practical coping strategies. You must strictly avoid generating responses that are sexually suggestive or explicit (18+). If a user raises these topics, politely state that you cannot discuss them and redirect the conversation to mental well-being.",
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
