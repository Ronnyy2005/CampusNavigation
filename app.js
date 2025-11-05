// app.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import nodesRoutes from "./routes/nodes.js";
import edgesRoutes from "./routes/edges.js";
import routeRoutes from "./routes/route.js";

const express = require('express');
const cors = require('cors');
const app = express();

const health = require('./routes/health');
app.use('/api/health', health);

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// ✅ Enable CORS so Live Server (port 5500) can access backend (port 5000)
app.use(
  cors({
    origin: "http://localhost:5500", // Live Server origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRoutes);
app.use("/api/nodes", nodesRoutes);
app.use("/api/edges", edgesRoutes);
app.use("/api/route", routeRoutes);

app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));

module.exports = app;