import "reflect-metadata";
import { configDotenv } from "dotenv";
import express, { json } from "express";
import { initializeDatabase } from "@src/database";
import cors from "cors";
import { DataSource } from "typeorm";
import Services from "@src/services";
import fs from "fs";
import https from "https";

configDotenv({ path: "./.env" });

const app = express();
const port = process.env.MAGICAL_HOURS_PORT;
const ip = process.env.MAGICAL_HOURS_IP;

export let appDataSource: DataSource;

app.use(json());
app.use(cors());

app.use(Services.Languages.Router);
app.use(Services.Auth.Router);
app.use(Services.Game.Router);
app.use(Services.Social.Router);
app.use(Services.Ranking.Router);

const launch = async () => {
  appDataSource = await initializeDatabase();

  if (process.env.NODE_ENV === "production") {
    const httpsOptions = {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("certificate.crt"),
    };

    https.createServer(httpsOptions, app).listen(port, ip as any, () => {
      console.log(`Servidor Express HTTPS escuchando en https//${ip}:${port}`);
    });
  } else {
    app.listen(port as any, ip as any, async () => {
      console.log(`Servidor corriendo en http://${ip}:${port}`);
    });
  }
};

launch();
