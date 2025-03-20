import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import { request } from 'http';
import express, { response } from "express";
const app = express();
const cool = require("cool-ascii-faces")
const PORT = process.env.PORT || 16078;
const BASE_API = "/api/v1"

app.use(express.json());
app.use("/about", express.static("./public"));

app.get("/cool", (request,response) => {
    response.send(cool());
});

import { datos_AMG } from "./index-AMG.js";
const dat_AMG = datos_AMG;
const resAMG = mediaMissingMenAMG(dat_AMG);

function mediaMissingMenAMG(dat_AMG){
    let ac = 0;
    let lista = dat_AMG;
    lista.filter(n=>n.province.startsWith("A")) 
    .forEach(n => {
        ac = ac + n.missing_men;
    });
    return ac/lista.length; 
};

app.get("/samples/AMG", (request,response) => {
    response.send(`La media de hombres desaparecidos en provincias que empiezan por la A es ${resAMG}`);
});

// TAREA L04 JMRL
import { averageLatitude2, csvContent } from "./index-JMRL.js"
let resJMRL = averageLatitude2();
let dataJMRL = csvContent;
const recurso = "/ministry-of-justice-in-zaragoza";
app.get("/samples/JMRL", (request,response) => {
    response.send(`La media de la latitud de los centros jurídicos de Zaragoza es ${resJMRL}`);
});

// TAREA 11 JMRL - L05
app.get(BASE_API + recurso, (request, response) => {
    console.log("New GET to /ministry-of-justice-in-zaragoza");
    response.send(JSON.stringify(dataJMRL));
});

// TAREA 13 JMRL - L05
let initialData = [];
app.get(BASE_API + recurso + "/loadInitialData", (request, response) =>  {
    console.log("New GET to /loadInitialData");
    if (initialData.length === 0) {
        for (let i = 0; i<10; i++){
                initialData[i] = dataJMRL[i]
        }
        response.send()
    }

    response.send(JSON.stringify(initialData));
});




app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}!`);

});