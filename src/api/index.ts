import axios from "axios";

export const getMaps = async (language: string) => {
  const response = await axios.get(
    `https://valorant-api.com/v1/maps?language=${language}`
  );
  return response.data;
};
