import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_API_URL, {
  withCredentials: true,
});

console.log(process.env.REACT_APP_API_URL, "API URL IN SOCKET");
// Register user after login
export const registerUser = (userId) => {
  if (userId) {
    socket.emit("register", userId);
  }
};

// Listen for notifications
export const listenToNotifications = (callback) => {
  socket.on("notification", callback);
  // socket.on("recent-activity", callback);
};

// Get Recent Activity
export const getRecentActivity = (data) => {
  socket.on("recent-activity", data);
};

export default socket;
