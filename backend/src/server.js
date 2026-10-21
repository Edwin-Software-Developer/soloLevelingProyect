import express from "express";
import cors from "cors";
import { characters, moments } from "./data.js";

const app = express();
const port = Number(process.env.PORT ?? 3001);

app.use(cors());
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.get("/api/characters", (_request, response) => {
  response.json(characters);
});

app.get("/api/characters/:id", (request, response) => {
  const character = characters.find((item) => item.id === request.params.id);
  if (!character) {
    response.status(404).json({ error: "Cazador no encontrado." });
    return;
  }
  response.json(character);
});

app.get("/api/moments", (_request, response) => {
  response.json(moments);
});

app.get("/api/moments/:id", (request, response) => {
  const moment = moments.find((item) => item.id === request.params.id);
  if (!moment) {
    response.status(404).json({ error: "Momento no encontrado." });
    return;
  }
  response.json(moment);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Solo Leveling API disponible en http://localhost:${port}`);
});
