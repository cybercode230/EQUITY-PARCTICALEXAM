const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("./auth.model");
const redis = require("../../config/redis");
const db = require("../../config/db"); // knex instance

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const JWT_EXPIRES_IN = "1h";

const AuthService = {
  async register({ username, email, password, role }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [userId] = await Users.create({ username, email, password_hash: hashedPassword, role });
    return { id: userId, username, email, role };
  },

  async login({ email, password }) {
    const user = await Users.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Store token in Redis
    // await redis.set(`user:${user.id}:token`, token, "EX", 3600);    
    await redis.set(`user:${user.id}:token`, token, "EX", 3600);


    // Store in sessions table
    await db("sessions").insert({
      user_id: user.id,
      jwt_token: token,
      expires_at: new Date(Date.now() + 3600 * 1000) // 1h
    });

    return { token, user };
  },

  async verifyToken(token) {
    try {
      const payload = jwt.verify(token, JWT_SECRET);

      // Verify Redis session
      const redisToken = await redis.get(`user:${payload.id}:token`);
      if (redisToken !== token) throw new Error("Session expired");

      return payload;
    } catch (err) {
      throw new Error("Unauthorized");
    }
  }
};

module.exports = AuthService;
