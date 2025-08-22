const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const gatewayRoutes = require("./gateway/gateway.routes");

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// API Gateway routes
app.use("/api", gatewayRoutes);

app.get("/", (req, res) => res.send("Order Management API is running 🚀"));

module.exports = app;
