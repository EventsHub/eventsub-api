import cors from "cors";
import express from "express";
import { createServer } from "http";

import logger from "./services/logger.service";
import corsConfig from "./config/cors.config";

import routes from "./routes";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(logger);
app.use(cors(corsConfig));
app.use(routes)

const server = createServer(app);

export default server;
