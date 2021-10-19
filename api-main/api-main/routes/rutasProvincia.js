const express= require('express');
const app=express.Router();
const provincias=require('./models/modelsProvincia');

/**
 * Devuelve un listado generalizado de todas las provincias registradas
 * en la base de datos.
 * @returns {JSON} listado generalizado de las provincias
 */
app.get("/", async (req, res) => {
    try{
        let contenido= await provincias.leer();
        if (contenido.length==0){
            throw new Error('No hay provincias')
        }
        res.status(200).json(contenido);
    }catch(e){
        if (e.message!='no hay provincias'){
            res.status(404).send({"error":"Error inesperado"})
            return;
        }
        res.status(404).send ({"error": e.message});
    }
});
/*******************************************************************************/
/**
 * Devuelve provincia con numero de id igual al que se pasa por parámetros
 * @returns {JSON} si existe devuelve la provincia con id igual al que se pasa 
 * por parametro
 */
app.get('/:id',async (req,res)=>{
    
    try{
        let contenido=await provincias.buscar(req.params.id);
        if (contenido.length==0){
            throw new Error ('provincia no encontrada');
        }
        res.json(contenido);
    }catch(e){
        if(e.message!='provincia no encontrada'){
            res.status(404).send({"error":"Error inesperado."})
            return;
        }
        res.status(404).send({"error":e.message});
    }
})
/*******************************************************************************/
/**
 * Devuelve provincia con nombre igual al que se pasa por parámetros
 * @returns {JSON} si existe devuelve la provincia con nombre igual al que se
 *  pasa por parametro
 */
app.get('/nombre/:nombre',async (req,res)=>{
    
    try{
        let contenido=await provincias.buscarNombre(req.params.nombre);
        if (contenido.length==0){
            throw new Error ('provincia no encontrada');
        }
        res.json(contenido);
    }catch(e){
        if(e.message!='provincia no encontrada'){
            res.status(404).send({"error":"Error inesperado."})
            return;
        }
        res.status(404).send({"error":e.message});
    }
})
/*******************************************************************************/
module.exports=app;