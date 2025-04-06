// IMPORT PARA USAR REQUIRE
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// FUNCIONES PARA LEER Y PARSEAR EL CSV RESPECTIVAMENTE
const { readFileSync } = require('fs');
const { parse } = require('csv-parse/sync');

// IMPORTAMOS LAS FUNCIONES PARA LA BASE DE DATOS
import dataStore from "nedb";
import { basename } from 'path';

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
        return value
    }
});

const BASE_API = "/api/v1";
const recurso = "/ministry-of-justice-in-zaragoza";
const db = new dataStore();

// FUNCION loadInitialData()
function loadInitialDataJMRL(){
    let csvContent = csvContent.slice(0, 10);
    return csvContent;
}

db.insert(csvContent, (err, newDocs) => {
    if (err) {
        return res.status(500).send("Error al insertar los datos,");
    }
});

function loadBackendJMRL(app) {
    // API JMRL
    app.get(BASE_API + recurso + "/docs", (request, response) => {
        response.redirect("URL a POSTMAN");
    })

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

            let initialData = loadInitialData();
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
        let { creation_year, id, portalId, postal_code, from, to, limit, offset } = request.query;
        let query = {};

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
            d = d.limit(Numer(limit));
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
        let {province,creation_year,id,portalId,postal_code,latitude,length,title,equipment_type,public_titularity,street_address,geometry} = request.body;
        // VALIDAR PETICION
        if (province === undefined || creation_year === undefined || id === undefined || portalId=== undefined || 
            postal_code === undefined || latitude === undefined || length === undefined || title === undefined || 
            equipment_type === undefined || public_titularity === undefined || street_address === undefined || geometry === undefined) {
                return response.sendStatus(400);
        }

        // COMPROBAMOS SI YA EXISTE UN REGISTRO CON EL MISMO ID
        db.findOne({ id: id }, (err, existingData) => {
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
    app.get(BASE_API + recurso + "/:id", (request, response) => {
        let parametroId = Number(request.params.id);
        db.findOne({ id: parametroId }, (err, data) => {
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

    // POST PARA VOLVER A LA VERSION PREVIA DE LA BASE DE DATOS
    app.post(BASE_API + recurso + "/reset", (request, response) => {
        db.remove({}, { multi: true }, (err) => {
            if (err) {
                return response.status(500).send("Error al volver al version anterior de la base de datos");
            }
            db.insert(csvContent, (err) => {
                if (err) {
                    return response.status(500).send("Error al restaurar la version anterior de la base de datos");
                }
                response.status(200).send("La base de datos volvio a su version previa");
            });
        });
    });

    //FALLO DE POST A UN DATO ESPECIFICO
    app.post(BASE_API + recurso + ":/id", (request, response) => {
        res.sendStatus(405);
    });

    //PUT A UN DATO ESPECIFICO
    app.put(BASE_API + recurso + ":id", (request, response) => {
        let parametroId = Number(request.params.id);
        let datoAct = request.body;

        //VERIFICAMOS QUE COINCIDAN LOS IDs
        if (datoAct !== parametroId) {
            return res.sendStatus(400);
        }

        db.update({ id: parametroId }, datoAct, {}, (err, reemplazo) => {
            if (err) {
                return response.status(500).send("Error al actualizar el dato");
            }
            if (reemplazo === 0) {
                return res.sendStatus(404);
            }
            res.sendStatus(200);
        });
    });

    //DELETE DE UN DATO ESPECIFICO
    app.delete(BASE_API + recurso + ":/id", (request, response) => {
        let parametroId = Number(request.params.id);

        db.remove({ id: parametroId }, {}, (err, datoElim) => {
            if (err) {
                response.status(500).send("No se ha podido eliminar el dato");
                console.error(`ERROR: ${err}`);
            } else {
                if (datoElim === 0) {
                    res.sendStatus(404);
                } else {
                    res.sendStatus(200);
                }
            }
        });
    });

};

//EXPORTAMOS LAS DISTINTAS FUNCIONES
export { loadBackendJMRL, csvContent, loadInitialDataJMRL }