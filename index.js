import express, { response } from "express";
const app = express();
const PORT = process.env.PORT || 16078;

import cors from "cors";
import { loadBackendAMG } from './src/backend/index-AMG.js';
import { loadBackendJMRL } from './src/backend/index-JMRL.js';
import { handler } from 'src/frontend/build/handler.js'

app.use(express.json());
app.use(cors());

loadBackendAMG(app);
loadBackendJMRL(app);

//app.use("/about", express.static("./about"));
//app.use("/", express.static("./public"));


app.use(handler);
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}!`);
});