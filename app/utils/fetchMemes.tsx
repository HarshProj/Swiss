import axios from "axios";

const MEME_API_URL = "https://api.imgflip.com/get_memes";

export const fetchMemes = async (page: number) => {
  try {
    const { data } = await axios.get(MEME_API_URL);
    return data.data.memes.slice(page * 10, (page + 1) * 10); // Load 10 memes per page
  } catch (error) {
    console.error("Error fetching memes:", error);
    return [];
  }
};
