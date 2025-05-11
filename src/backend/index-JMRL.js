// IMPORT PARA USAR REQUIRE
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// FUNCIONES PARA LEER Y PARSEAR EL CSV RESPECTIVAMENTE
const { readFileSync } = require('fs');
const { parse } = require('csv-parse/sync');

// IMPORTAMOS LAS FUNCIONES PARA LA BASE DE DATOS
import dataStore from "nedb";
import { basename } from 'path';

import path from "path";
import request from 'request';

//LEEMOS EL CSV
let fileContent = readFileSync('src/backend/input-JMRL.csv', 'utf-8');
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
        if (context.column == 'year') return Number(value)
        if (context.column == 'num_workers') return Number(value)
        return value
    }
});

const BASE_API = "/api/v2";
const recurso = "/ministry-of-justice-in-zaragoza";
const db = new dataStore();

// FUNCION loadInitialData()
function loadInitialDataJMRL(){
    let datos = csvContent.slice(0, 10);
    return datos;
}

db.insert(csvContent, (err, newDocs) => {
    if (err) {
        return res.status(500).send("Error al insertar los datos,");
    }
});

function loadBackendJMRL(app) {
    // API JMRL
    app.get(BASE_API + "/ministry-of-justice-in-zaragoza/docs", (request, response) => {
        response.redirect("https://documenter.getpostman.com/view/42360434/2sB2cUC3wh");
    });

    // loadInitialData()
    app.get(BASE_API + recurso + "/loadInitialData", (request, response) => {
        // COMPROBAMOS LA BD
        db.count({}, (err, count) => {
            if (err) {
                return response.status(500).send("Error al comprobar la base de datos");
            }
            if (count > 0) {
                return response.status(400).json({message: "Ya hay datos"});
            }

            let initialData = loadInitialDataJMRL();
            // INSERTAMOS DATOS
            db.insert(initialData, (err, newDocs) => {
                if(err) {
                    return response.status(500).send("Error al insertar en la base de datos");
                }
                //RECUPERAMOS DATOS
                db.find({}, (err, data) => {
                    if (err) {
                        return response.status(500).send("Error al recuperar los datos");
                    }
                    response.send(JSON.stringify(data.map((d) => {
                        delete d._id;
                        return d;
                    }), null, 2));
                });
            });  
        });
    });

    // GET PARA LOS DATOS (CON PAGINACION)
    app.get(BASE_API + recurso, (request, response) => {
        let {province,creation_year,id,portalId,postal_code,latitude,length,title,equipment_type,public_titularity,street_address,year,num_workers,from,to,limit,offset } = request.query;
        let query = {};

        if (province) {
            query.province = province;
        }
        if (creation_year) {
            query.creation_year = Number(creation_year);
        }
        if (id) {
            query.id = Number(id);
        }
        if (portalId) {
            query.portalId = Number(portalId);
        }
        if(postal_code) {
            query.postal_code = Number(postal_code);
        }
        if(latitude) {
            query.latitude = Number(latitude);
        }
        if(length) {
            query.length = Number(length);
        }
        if (title) {
            query.title = title;
        }
        if (equipment_type) {
            query.equipment_type = equipment_type;
        }
        if (public_titularity) {
            query.public_titularity = public_titularity;
        }
        if (street_address) {
            query.street_address = street_address;
        }
        if(year) {
            query.year = Number(year);
        }
        if(num_workers) {
            query.num_workers = Number(num_workers);
        }
        if (from || to) {
            query.id = {};
            if (from) query.id.$gte = Number(from);
            if (to) query.id.$lte = Number(to);
        }

        let d = db.find(query);
        
        // APLICAMOS PAGINACION SI VIENE POR QUERY
        if (offset !== undefined) {
            d = d.skip(Number(offset));
        }
        if (limit !== undefined) {
            d = d.limit(Number(limit));
        }

        d.exec((err, data) => {
            if (err) {
                return response.status(500).send("Error al acceder a la base de datos");
            }
            // ELIMINAMOS _ID DE CADA OBJETO
            const nuevo = data.map(({_id, ...rest}) => rest);

            response.send(JSON.stringify(nuevo));
        });
    });

    // POST A TODOS LOS DATOS
    app.post(BASE_API + recurso, (request, response) => {
        let {province,creation_year,id,portalId,postal_code,latitude,length,title,equipment_type,public_titularity,street_address,year,num_workers} = request.body;
        // VALIDAR PETICION
        if (province === undefined || creation_year === undefined || id === undefined || portalId=== undefined || 
            postal_code === undefined || latitude === undefined || length === undefined || title === undefined || 
            equipment_type === undefined || public_titularity === undefined || street_address === undefined ||
            year === undefined || num_workers === undefined) {
                return response.sendStatus(400);
        }

        // COMPROBAMOS SI YA EXISTE UN REGISTRO CON EL MISMO ID
        db.findOne({ province: province, year:year, id:id }, (err, existingData) => {
            if (err) {
                return response.status(500).send("Error al acceder a la base de datos");
            }
            if (existingData) {
                return response.sendStatus(409);
            }

            db.insert(request.body, (err, newData) => {
                if (err) {
                    return response.status(500).send("Error al insertar el dato");
                }
                response.sendStatus(201);
            });
        });
    });

    // FALLO PUT A TODOS LOS DATOS
    app.put(BASE_API + recurso, (request, response) => {
        response.sendStatus(405);
    });

    //DELETE A TODOS LOS DATOS
    app.delete(BASE_API + recurso, (request, response) => {
        db.remove({}, {multi:true});
        console.log("Los datos han sido eliminados");
        response.sendStatus(200);
    });

    //GET A DATO ESPECIFICO
    app.get(BASE_API + recurso + "/:province/:year/:id", (request, response) => {
        let paramId = Number(request.params.id);
        let paramProv = request.params.province;
        let paramYear = Number(request.params.year);
        db.findOne({ province: paramProv, year:paramYear, id:paramId }, (err, data) => {
            if (err) {
                return response.status(500).send("Error al acceder a los datos");
            }
            if (!data) {
                return response.sendStatus(404);
            }
            
            // ELIMINAMOS _ID
            let { _id, ...sinId } = data;
            response.status(200).json(sinId);
        });
    });

    //FALLO DE POST A UN DATO ESPECIFICO
    app.post(BASE_API + recurso + "/:province/:year/:id", (request, response) => {
        response.sendStatus(405);
    });

    //PUT A UN DATO ESPECIFICO
    app.put(BASE_API + recurso + "/:province/:year/:id", (request, response) => {
        let paramId = Number(request.params.id);
        let paramProv = request.params.province;
        let paramYear = Number(request.params.year);

        let datoAct = request.body.id;
        let datoAct2 = request.body.province;
        let datoAct3 = request.body.year;

        //VERIFICAMOS QUE COINCIDAN LOS IDs
        if (datoAct !== paramId || datoAct2 !== paramProv || datoAct3 !== paramYear) {
            return response.sendStatus(400);
        }

        db.update({ province: paramProv, year:paramYear, id:paramId }, request.body, {}, (err, reemplazo) => {
            if (err) {
                return response.status(500).send("Error al actualizar el dato");
            }
            if (reemplazo === 0) {
                return response.sendStatus(404);
            }
            response.sendStatus(200);
        });
    });

    //DELETE DE UN DATO ESPECIFICO
    app.delete(BASE_API + recurso + "/:province/:year/:id", (request, response) => {
        let paramId = Number(request.params.id);
        let paramProv = request.params.province;
        let paramYear = Number(request.params.year);

        db.remove({ province: paramProv, year:paramYear, id:paramId }, {}, (err, datoElim) => {
            if (err) {
                response.status(500).send("No se ha podido eliminar el dato");
                console.error(`ERROR: ${err}`);
            } else {
                if (datoElim === 0) {
                    response.sendStatus(404);
                } else {
                    response.sendStatus(200);
                }
            }
        });
    });

    var paths='/api/dummy-products';
    var apiServerHost = 'https://dummyjson.com/products';

    app.use(paths, function(req, res) {
        var url = apiServerHost + req.url;
        console.log('piped: ' + req.url);
        req.pipe(request(url)).pipe(res);
    });
};


//EXPORTAMOS LAS DISTINTAS FUNCIONES
export { loadBackendJMRL, csvContent, loadInitialDataJMRL }