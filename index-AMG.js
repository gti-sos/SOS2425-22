let datos_AMG = [{'year': 2017, 'province': 'Albacete', 'missing_men': 89, 'missing_women': 79, 'missing_unknown': 0, 'total_population': 390032},
    {'year': 2017, 'province': 'Alicante', 'missing_men': 514, 'missing_women': 352, 'missing_unknown': 0, 'total_population': 1825332},
    {'year': 2017, 'province': 'Almería', 'missing_men': 370, 'missing_women': 137, 'missing_unknown': 0, 'total_population': 706672},
    {'year': 2017, 'province': 'Araba', 'missing_men': 29, 'missing_women': 12, 'missing_unknown': 0, 'total_population': 326574},
    {'year': 2017, 'province': 'Asturias', 'missing_men': 216, 'missing_women': 222, 'missing_unknown': 0, 'total_population': 1034960},
    {'year': 2017, 'province': 'Ávila', 'missing_men': 30, 'missing_women': 34, 'missing_unknown': 0, 'total_population': 16070},
    {'year': 2017, 'province': 'Badajoz', 'missing_men': 55, 'missing_women': 48, 'missing_unknown': 0, 'total_population': 679884},
    {'year': 2017, 'province': 'Balears (Illes)', 'missing_men': 517, 'missing_women': 502, 'missing_unknown': 2, 'total_population': 1115999},
    {'year': 2017, 'province': 'Barcelona', 'missing_men': 1688, 'missing_women': 1276, 'missing_unknown': 0, 'total_population': 5576037},
    {'year': 2017, 'province': 'Bizkaia', 'missing_men': 104, 'missing_women': 94, 'missing_unknown': 0, 'total_population': 1148302}];

function mediaMissingMen(dat){
    let ac = 0;
    let lista = dat;
    lista.filter(n=>n.province.startsWith("A")) 
    .forEach(n => {
        ac = ac + n.missing_men;
    });
    return ac/lista.length; 
};

console.log(mediaMissingMen(datos_AMG));



export {datos_AMG};