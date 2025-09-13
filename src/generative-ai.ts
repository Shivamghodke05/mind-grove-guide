
import { GoogleGenerativeAI } from "@google/generative-ai";

// TODO: Add your own API key here
const API_KEY = "AIzaSyCUjQZCYFr1m1fX2suxufRSN_8lsro8-VM";

const genAI = new GoogleGenerativeAI(API_KEY);

export const generativeModel = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: "You are a friendly and supportive AI assistant specializing in mental health conversations. Respond concisely, use emojis to convey empathy, and act as a blend of a caring friend and a helpful therapist. Focus on providing support and coping strategies."
});
