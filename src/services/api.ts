import axios, { type AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
});
export { api };
