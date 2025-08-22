const AuthService = require("./auth.service");
const QueueService = require("../queue/queue.service");

const AuthController = {
  register: async (req, res) => {
    try {
      const user = await AuthService.register(req.body);

      // Send notification to admin and user
      await QueueService.addNotification(`New user registered: ${user.username} (${user.role})`);

      res.status(201).json({ success: true, message: "User registered", user });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { token, user } = await AuthService.login(req.body);
      res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // 1h
      await QueueService.addNotification(`User logged in: ${user.username}`);
      res.json({ success: true, token, user });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
};

module.exports = AuthController;
