// FUNCIONES PARA LEER Y PARSEAR EL CSV RESPECTIVAMENTE
const { readFileSync } = require('fs');
const { parse } = require('csv-parse/sync');

//LEEMOS EL CSV
let fileContent = readFileSync('input-JMRL.csv', 'utf-8');
//PARSEAMOS EL CONTENIDO DEL CSV A UNA LISTA DE OBJETOS
let csvContent = parse(fileContent, {
    columns: true,
    cast: (value, context) => {
        if (context.column == 'creation_year') return Number(value)
        if (context.column == 'id') return Number(value)
        if (context.column == 'portalId') return Number(value)
        if (context.column == 'postal_code') return Number(value)
        if (context.column == 'latitude') return Number(value)
        if (context.column == 'length') return Number(value)
        return value
    }
});

//FUNCIÓN PARA HACER LA MEDIA DE LAS LATITUDES
function averageLatitude(){
    let lat = [];
    let sum = 0;
    //RECORREMOS CADA OBJETO DE LA LISTA
    for (let i = 0; i < csvContent.length; i++) {
        //SELECCIONAMOS UNA COLUMNA CON DATOS NUMÉRICOS Y GUARDAMOS LOS DISTINTOS VALORES
        lat[i]=csvContent[i].latitude;
    }
    //RECORREMOS LA LISTA CON LOS DATOS NÚMERICOS Y LOS SUMAMOS
    for (let i = 0; i < lat.length; i++) {
        sum += lat[i]
    }
    //HACEMOS LA MEDIA
    return sum/lat.length
}

//IMPRIMIMOS POR PANTALLA LA FUNCIÓN PARA COMPROBAR QUE FUNCIONA
console.log(averageLatitude())