import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { request } from 'http';
import express, { response } from "express";
const app = express();
const PORT = process.env.PORT || 16078;
import { handler } from './src/frontend/build/handler.js'

import { loadBackendAMG } from './src/backend/index-AMG.js';
import { loadBackendJMRL } from './src/backend/index-JMRL.js';
loadBackendAMG(app);
loadBackendJMRL(app);

app.use(handler);

app.use(express.json());
app.use("/about", express.static("./about"));
app.use("/", express.static("./public"));

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}!`);
});