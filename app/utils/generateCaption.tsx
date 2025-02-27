import axios from "axios";

const IMGFLIP_API_URL = "https://api.imgflip.com/get_memes";

export const generateAICaption = async (): Promise<string> => {
  try {
    const { data } = await axios.get(IMGFLIP_API_URL);
    const randomMeme = data.data.memes[Math.floor(Math.random() * data.data.memes.length)];
    return `AI Suggestion: ${randomMeme.name}`;
  } catch (error) {
    console.error("Failed to generate AI caption", error);
    return "AI Suggestion: Meme Magic!";
  }
};
