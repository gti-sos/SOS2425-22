import express from "express";
const app = express();
const PORT = process.env.PORT || 16078;


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

app.get("/samples/AMG",(request,response) => {
    response.send(`La media de hombres desaparecidos en provincias que empiezan por la A es ${resAMG}`);
});

app.use("/about",express.static("./public"));

app.get("/hello",(request,response) => {
    response.send("Hello from the server!");
});

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}!`);
});