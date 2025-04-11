import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_API_URL); // Replace with your backend URL

// Register user after login
export const registerUser = (userId) => {
  if (userId) {
    socket.emit("register", userId);
  }
};

// Listen for notifications
export const listenToNotifications = (callback) => {
  socket.on("notification", callback);
};

export default socket;
