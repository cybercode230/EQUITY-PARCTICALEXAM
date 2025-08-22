const redis = require("../../config/redis");

const QueueService = {
  // Add a notification to Redis list
  addNotification: async (message) => {
    await redis.lpush("notifications", message); // LPUSH adds to the head
    console.log("📢 Notification added to Redis:", message);
  },

  // Get all notifications
  getNotifications: async () => {
    const notifications = await redis.lrange("notifications", 0, -1); // get all items
    return notifications;
  },

  // Optionally, clear notifications
  clearNotifications: async () => {
    await redis.del("notifications");
    console.log("🗑️ Notifications cleared");
  }
};

module.exports = QueueService;
