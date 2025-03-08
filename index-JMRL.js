import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export { averageLatitude2 }

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
function averageLatitude2(){
    let sum = 0;
    //HACEMOS UN ARRAY SOLO CON LAS LATITUDES (MAP) Y SUMAMOS TODOS SUS ELEMENTOS (REDUCE)
    let lat = csvContent.map((x) => x.latitude)
                        .reduce((sum, value) => sum + value, sum);
    //DEVOLVEMOS LA MEDIA
    return lat/csvContent.length;
}

//IMPRIMIMOS POR PANTALLA LA FUNCIÓN PARA COMPROBAR QUE FUNCIONA
console.log(averageLatitude2());