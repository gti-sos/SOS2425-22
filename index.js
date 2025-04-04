import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { request } from 'http';
import express, { response } from "express";
const app = express();
const PORT = process.env.PORT || 16078;
const BASE_API = "/api/v1";
import { loadBackendAMG } from './src/backend/index-AMG.js';

app.use(express.json());
app.use("/about", express.static("./public"));

loadBackendAMG(app);



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