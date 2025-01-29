import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

// Safely parse the user from localStorage
let user = null;
try {
  user = JSON.parse(localStorage.getItem("persist:root"))?.user;
} catch (error) {
  console.error("Error parsing user from localStorage:", error);
}

const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken || "";  // Fallback to empty string if TOKEN is undefined

console.log("Access Token:", TOKEN);  // Log the token to verify it

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// Add a check to ensure token is defined before setting headers
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
});
