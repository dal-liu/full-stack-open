import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllEntries = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
