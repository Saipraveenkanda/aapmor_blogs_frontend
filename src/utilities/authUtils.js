import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export let token = Cookies.get("jwtToken");

export const getUserFromToken = () => {
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
