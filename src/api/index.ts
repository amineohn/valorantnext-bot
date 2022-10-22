import axios from "axios";

export const getMaps = async (language: string) => {
  const response = await axios.get(
    `https://valorant-api.com/v1/maps?language=${language}`
  );
  return response.data;
};

export const getAccount = async (name: string, tag: string) => {
  const response = await axios.get(
    `https://api.henrikdev.xyz/valorant/v1/account/${name}/${tag}`
  );
  return response.data;
};

export const getMMR = async (name: string, tag: string) => {
  const response = await axios.get(
    `https://api.henrikdev.xyz/valorant/v1/mmr/eu/${name}/${tag}`
  );
  return response.data;
};
