let datos_AMG = [{
    year:2023,
    province:"Albacete",
    missing_men:95,
    missing_women:78,
    missing_unknown:0,
    total_population:368464
},{
    year:2023,
    province:"Alicante",
    missing_men:459,
    missing_women:331,
    missing_unknown:0,
    total_population:1881762
},{
    year:2023,
    province:"Almeria",
    missing_men:164,
    missing_women:97,
    missing_unknown:0,
    total_population:731792
},{
    year:2023,
    province:"Araba",
    missing_men:35,
    missing_women:29,
    missing_unknown:0,
    total_population:333626
},{
    year:2023,
    province:"Asturias",
    missing_men:251,
    missing_women:353,
    missing_unknown:0,
    total_population:1011792
},{
    year:2023,
    province:"Avila",
    missing_men:36,
    missing_women:22,
    missing_unknown:0,
    total_population:158421
},{
    year:2023,
    province:"Badajoz",
    missing_men:47,
    missing_women:73,
    missing_unknown:0,
    total_population:669943
},{
    year:2023,
    province:"Balears",
    missing_men:485,
    missing_women:345,
    missing_unknown:0,
    total_population:1173008
},{
    year:2023,
    province:"Barcelona",
    missing_men:1462,
    missing_women:993,
    missing_unknown:0,
    total_population:5714730
},{
    year:2023,
    province:"Bizkaia",
    missing_men:91,
    missing_women:89,
    missing_unknown:0,
    total_population:1154334
},{
    year:2023,
    province:"Burgos",
    missing_men:66,
    missing_women:38,
    missing_unknown:0,
    total_population:356055
}];

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