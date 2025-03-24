import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import { request } from 'http';
import express, { response } from "express";
const app = express();
const cool = require("cool-ascii-faces")
const PORT = process.env.PORT || 16078;
const BASE_API = "/api/v1";

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

//API AMG
const API_AMG = "/missing-people-stats";  
let db_AMG = [];

app.get(BASE_API + API_AMG, (request,response) => {
    response.send(JSON.stringify(db_AMG));
});

app.get(BASE_API + API_AMG + "/loadInitialData", (request,response) =>{
    if(db_AMG.length === 0){
        db_AMG = datos_AMG;
    }
    response.send(JSON.stringify(db_AMG));

});

// Obtener todos los datos
app.get('/missing-people', (req, res) => {
    res.send(datos_AMG);
});

// Obtener datos por provincia
app.get(BASE_API + API_AMG + '/:province', (req, res) => {
    const province = req.params.province;
    const result = datos_AMG.find(entry => entry.province === province);
    result ? res.send(result) : res.sendStatus(404);
});

// Agregar un nuevo registro
app.post(BASE_API + API_AMG, (req, res) => {
    const newEntry = req.body;

    // Verificar que los datos obligatorios estén presentes
    if (!newEntry || !newEntry.year || !newEntry.province || !newEntry.total_population) {
        return res.sendStatus(400); // Bad Request si faltan datos obligatorios
    }

    // Verificar si ya existe un recurso con el mismo 'province'
    const exists = datos_AMG.some(entry => entry.province === newEntry.province);
    if (exists) {
        return res.sendStatus(409); // Conflict si ya existe el recurso
    }

    // Agregar el nuevo recurso
    datos_AMG.push(newEntry);
    res.sendStatus(201); // Created
});

app.post(BASE_API + API_AMG + "/:province", (req, res) => {
    const province = req.params.province;
    const newEntry = req.body;

    // Verificar que los datos obligatorios estén presentes
    if (!newEntry || !newEntry.year || !newEntry.province || !newEntry.total_population) {
        return res.sendStatus(400); // Bad Request si faltan datos obligatorios
    }

    // Verificar si el 'province' en el cuerpo de la solicitud coincide con el 'province' en la URL
    if (newEntry.province !== province) {
        return res.sendStatus(400); // Bad Request si no coinciden
    }

    // Verificar si ya existe un recurso con el mismo 'province'
    const exists = datos_AMG.some(entry => entry.province === province);
    if (exists) {
        return res.sendStatus(409); // Conflict si ya existe el recurso
    }

    // Agregar el nuevo recurso
    datos_AMG.push(newEntry);
    res.sendStatus(201); // Created
});


// Actualizar un registro existente
app.put(BASE_API + API_AMG + '/:province', (req, res) => {
    const province = req.params.province;
    const index = datos_AMG.findIndex(entry => entry.province === province);

    // Verificar que el 'province' en el cuerpo de la solicitud coincida con el 'province' en la URL
    if (index !== -1) {
        if (req.body.province !== province) {
            res.sendStatus(405);
        }
        datos_AMG[index] = req.body;
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

// Eliminar un registro
app.delete(BASE_API + API_AMG + '/:province', (req, res) => {
    const province = req.params.province;

    // Buscar el índice del recurso a eliminar
    const index = datos_AMG.findIndex(entry => entry.province === province);

    if (index !== -1) {
        // Si se encuentra el recurso, eliminarlo
        datos_AMG.splice(index, 1);
        res.sendStatus(200); // OK
    } else {
        // Si no se encuentra el recurso, devolver un 404
        res.sendStatus(404); // Not Found
    }
});

app.delete(BASE_API + API_AMG, (req, res) => {
    // Verificar que datos_AMG no sea undefined y sea un arreglo antes de vaciarlo
    if (Array.isArray(datos_AMG)) {
        datos_AMG.length = 0;  // Vaciar el arreglo sin perder la referencia
        res.sendStatus(200); // OK
    } else {
        res.sendStatus(500); // Internal Server Error si algo va mal con la lista
    }
});



// TAREA L04 JMRL
import { averageLatitude2, csvContent } from "./index-JMRL.js"
import { stringify } from 'querystring';
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
        response.send(initialData)
    }

    response.send(JSON.stringify(initialData));
});




app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}!`);

});