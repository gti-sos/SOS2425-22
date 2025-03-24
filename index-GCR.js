const { parse } = require("csv-parse/sync")
const { readFileSync } = require("fs")

//lee el archivo csv
const fileContent = readFileSync('input-GCR.csv', 'utf-8')
//parsea los datos
const csvContent = parse(fileContent, {columns: true})


function mediaScam(datos, buscaProvincia) {
    let cuenta = 0
    let acumulador = 0  
    datos.filter(n=>n.province == buscaProvincia).forEach(n => {
        acumulador = acumulador + Number(n.scam)
        cuenta += 1
    });
    return (acumulador/cuenta)
}

console.log(mediaScam(csvContent, "Badajoz"))