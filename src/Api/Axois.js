import axios from "axios";
import Cookie from "universal-cookie";
import { baseuRL } from "./Api";
const cookie = new Cookie();
const token = cookie.get("token");
export const Axios = axios.create({
  baseURL: baseuRL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
