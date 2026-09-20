import "dotenv/config";
import { createApp } from "./app.js";
import { query } from "./db.js";

const port = Number(process.env.PORT ?? 3000);

createApp({ query }).listen(port, () => {
  console.log(`UV Move API escuchando en http://localhost:${port}`);
});