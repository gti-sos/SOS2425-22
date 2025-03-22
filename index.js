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

//DATOS JMRL
import { averageLatitude2, csvContent } from "./index-JMRL.js"
let resJMRL = averageLatitude2();
let dataJMRL = csvContent;
const recurso = "/ministry-of-justice-in-zaragoza";

// TAREA JMRL - L04
app.get("/samples/JMRL", (request, response) => {
    response.send(`La media de la latitud de los centros jurídicos de Zaragoza es ${resJMRL}`);
});

// TAREA 11 JMRL - L05
app.get(BASE_API + recurso, (request, response) => {
    console.log("New GET to /ministry-of-justice-in-zaragoza");
    response.send(JSON.stringify(dataJMRL));
    response.sendStatus(200);
});

// TAREA 13 JMRL - L05
let initialData = [];
app.get(BASE_API + recurso + "/loadInitialData", (request, response) =>  {
    console.log("New GET to /loadInitialData");
    if (initialData.length === 0) {
        for (let i = 0; i<10; i++){
                initialData[i] = dataJMRL[i]
        }
    }

    response.send(initialData);
    response.sendStatus(200);
});
 
// TAREA 14 JMRL - L05
// PETICION  DELETE A RECURSO "/ministry-of-justice-in-zaragoza"
app.delete(BASE_API + recurso, (request, response) => {
    dataJMRL = [];
    console.log("Todos los datos han sido eliminados.");
    response.sendStatus(200); 
});

//PETICION POST A RECURSO "/ministry-of-justice-in-zaragoza"
app.post(BASE_API + recurso,(request, response) => {
    console.log("POST to /contacts");
    console.log(`<${request.body}>`);

    let newMinistery = request.body;
    contacts.push(newMinistery);
    response.sendStatus(201);
});

//PETICION PUT (NO SE PUEDE HACER) A RECURSO "/ministry-of-justice-in-zaragoza"
app.put(BASE_API + recurso, (request, response) => {
    response.sendStatus(405);
});

//PETICION GET A RECURSO "../creation_year" 
app.get(BASE_API + recurso +"/:creation_year", (request, response) => {
    let creationYear = Number(request.params.creation_year); 
    let object = dataJMRL.filter((x) => (x).creation_year === creationYear);
    
    if (!object) {
        return response.sendStatus(404);
    }

    response.send(object);
    response.sendStatus(200);
});

//PETICION POST (NO SE PUEDE HACER) A RECURSO "../creation_year"
app.post(BASE_API + recurso + "/:creation_year", (request, response) => {    
    response.sendStatus(405);
});

//PETICION PUT A RECURSO "../creation_year"
app.put(BASE_API + recurso +"/:creation_year", (request, response) => {
    let {province, creation_year, id, portalId, postal_code, latitude, 
            lenght, title, equipment_type, public_titularity, street_address, geometry} = req.body;
    let creationYear = req.params.creation_year;    
    
    if (creation_year !== Number(creationYear)) {
        return res.sendStatus(400);
    }
    
    let i = dataJMRL.findIndex(object => object.creation_year === Number(creationYear));
    if (i === -1) {
        return response.sendStatus(404);
    }
    siniestralidadData2023[i] = req.body;

    response.sendStatus(200);
});

//DELETE DE UN DATO ESPECIFICO
app.delete(BASE_API + recurso + "/:creation_year", (request, response) => {
    let creationYear = request.params.creation_year;    
    let i = dataJMRL.findIndex(object => object.creation_year === Number(creationYear));
    
    if (i === -1) {
        return res.sendStatus(404);
    }

    dataJMRL=dataJMRL.filter(sanction => sanction.creation_year !== Number(creationYear));
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}!`);

});