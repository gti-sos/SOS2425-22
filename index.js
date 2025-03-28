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

// Obtener datos por provincia
app.get(BASE_API + API_AMG + '/:province', (req, res) => {
    const province = req.params.province;
    const result = db_AMG.find(entry => entry.province === province);
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
    const exists = db_AMG.some(entry => entry.province === newEntry.province);
    if (exists) {
        return res.sendStatus(409); // Conflict si ya existe el recurso
    }

    // Agregar el nuevo recurso
    db_AMG.push(newEntry);
    res.sendStatus(201); // Created
});

app.post(BASE_API + API_AMG + "/:province", (req, res) => {
    res.sendStatus(405);
});


// Actualizar un registro existente
app.put(BASE_API + API_AMG + '/:province', (req, res) => {
    const province = req.params.province;
    const index = db_AMG.findIndex(entry => entry.province === province);

    // Verificar que el 'province' en el cuerpo de la solicitud coincida con el 'province' en la URL
    if (index !== -1) {
        if (req.body.province !== province) {
            res.sendStatus(400);
        }
        db_AMG[index] = req.body;
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

app.put(BASE_API + API_AMG, (req, res) => {
    res.sendStatus(405);
});

// Eliminar un registro
app.delete(BASE_API + API_AMG + '/:province', (req, res) => {
    const province = req.params.province;

    // Buscar el índice del recurso a eliminar
    const index = db_AMG.findIndex(entry => entry.province === province);

    if (index !== -1) {
        // Si se encuentra el recurso, eliminarlo
        db_AMG.splice(index, 1);
        res.sendStatus(200); // OK
    } else {
        // Si no se encuentra el recurso, devolver un 404
        res.sendStatus(404); // Not Found
    }
});

app.delete(BASE_API + API_AMG, (req, res) => {
    // Verificar que db_AMG no sea undefined y sea un arreglo antes de vaciarlo
    if (Array.isArray(db_AMG)) {
        db_AMG.length = 0;  // Vaciar el arreglo sin perder la referencia
        res.sendStatus(200); // OK
    } else {
        res.sendStatus(500); // Internal Server Error si algo va mal con la lista
    }
});



import { averageLatitude2, csvContent } from "./index-JMRL.js"
import { stringify } from 'querystring';
let resJMRL = averageLatitude2();
let dataJMRL = csvContent;
const recurso = "/ministry-of-justice-in-zaragoza";

// TAREA JMRL - L04
app.get("/samples/JMRL", (request, response) => {
    response.send(`La media de la latitud de los centros jurídicos de Zaragoza es ${resJMRL}`);
});

// TAREA 11 JMRL - L05
app.get(BASE_API + recurso, (request, response) => {
    let dataJMRLFilter = dataJMRL;
    let {province, creation_year, id, portalId, postal_code, latitude, 
            lenght, title, equipment_type, public_titularity, street_address, geometry} = request.query;

    if (province!==undefined){
        dataJMRLFilter=dataJMRLFilter.filter(stat => stat.province.toLowerCase() === province.toLowerCase());
    }if (creation_year!==undefined){
        dataJMRLFilter=dataJMRLFilter.filter(stat => stat.creation_year === Number(creation_year));
    }if (portalId!==undefined){
        dataJMRLFilter=dataJMRLFilter.filter(stat => stat.portalId === Number(portalId));
    }if (postal_code!==undefined){
        dataJMRLFilter=dataJMRLFilter.filter(stat => stat.postal_code === Number(postal_code));
    }

    response.send(dataJMRLFilter);
    response.send(console.log(Array.isArray(dataJMRL))); // Comprueba si es de verdad un array
    (console.log(typeof(dataJMRL))); 
});

// TAREA 13 JMRL - L05
app.get(BASE_API + recurso + "/loadInitialData", (request, response) =>  {
    console.log("New GET to /loadInitialData");
    let initialData = [];
    if (initialData.length === 0) {
        for (let i = 0; i<10; i++){
                initialData[i] = dataJMRL[i]
        }
    }

    response.send(initialData);
    response.sendStatus(200);
});
 
// TAREA 14 JMRL - L05
// PETICION DELETE A RECURSO "/ministry-of-justice-in-zaragoza"
app.delete(BASE_API + recurso, (request, response) => {
    dataJMRL = [];
    console.log("Todos los datos han sido eliminados.");
    response.sendStatus(200); 
});

//PETICION POST A RECURSO "/ministry-of-justice-in-zaragoza"
app.post(BASE_API + recurso,(request, response) => {
    let {province,creation_year,id,portalId,postal_code,latitude,length,title,equipment_type,public_titularity,street_address,geometry} = request.body

    if (province === undefined || creation_year === undefined || id === undefined || portalId=== undefined || 
        postal_code === undefined || latitude === undefined || length === undefined || title === undefined || 
        equipment_type === undefined || public_titularity === undefined || street_address === undefined || geometry === undefined) {
            return response.sendStatus(400);

    } if(dataJMRL.some(row => row.id === id)){
        return response.sendStatus(409);
    }

    let newRow = request.body
    dataJMRL.push(newRow)
    response.sendStatus(201);
});

//PETICION PUT (NO SE PUEDE HACER) A RECURSO "/ministry-of-justice-in-zaragoza"
app.put(BASE_API + recurso, (request, response) => {
    response.sendStatus(405);
});

//PETICION GET A RECURSO "../id" 
app.get(BASE_API + recurso +"/:id", (request, response) => {
    let id2 = Number(request.params.id); 
    let object = dataJMRL.find(object => object.id === id2);
    
    if (!object) {
        return response.sendStatus(404);
    }

    response.send(object);
    response.sendStatus(200);
});

//PETICION POST (NO SE PUEDE HACER) A RECURSO "../id"
app.post(BASE_API + recurso + "/:id", (request, response) => {    
    response.sendStatus(405);
});

//PETICION PUT A RECURSO "../id"
app.put(BASE_API + recurso +"/:id", (request, response) => {
    let {province, creation_year, id, portalId, postal_code, latitude, 
            lenght, title, equipment_type, public_titularity, street_address, geometry} = request.body;
    let id2 = request.params.id;    
    
    if (id !== Number(id2)) {
        return response.sendStatus(400);
    }
    
    let i = dataJMRL.findIndex(object => object.id === Number(id2));
    if (i === -1) {
        return response.sendStatus(404);
    }
    dataJMRL[i] = request.body;

    response.sendStatus(200);
});

//DELETE DE UN DATO ESPECIFICO (../id)
app.delete(BASE_API + recurso + "/:id", (request, response) => {
    let id2 = request.params.id;    
    let i = dataJMRL.findIndex(object => object.id === Number(id2));
    
    if (i === -1) {
        return response.sendStatus(404);
    }

    dataJMRL=dataJMRL.filter(sanction => sanction.id !== Number(id2));
    response.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}!`);
});