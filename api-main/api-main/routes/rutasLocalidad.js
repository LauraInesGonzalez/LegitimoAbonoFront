const express= require('express');
const app=express.Router();
const localidades=require('./models/modelsLocalidad');

/**
 * Devuelve un listado generalizado de todas las localidades registradas
 * en la base de datos.
 * @returns {JSON} listado generalizado de las localidades
 */

app.get("/", async (req, res) => {
    try{
        let contenido= await localidades.leer();
        if (contenido.length==0){
            throw new Error('No hay localidades')
        }
        res.status(200).json(contenido);
    }catch(e){
        if (e.message!='no hay localidades'){
            res.status(404).send({"error":"Error inesperado"})
        }
        res.status(404).send ({"error": e.message});
    }
});
/*******************************************************************************/
/**
 * Devuelve localidad con numero de id igual al que se pasa por parámetros
 * @returns {JSON} si existe devuelve la localidad con id igual al que se pasa por
 *  parametro
 */

app.get('/:id',async (req,res)=>{
    
    try{
        let contenido=await localidades.buscar(req.params.id);
        if (contenido.length==0){
            throw new Error ('localidad no encontrada');
        }
        res.json(contenido);
    }catch(e){
        if(e.message!='localidad no encontrada'){
            res.status(404).send({"error":"Error inesperado."})
        }
        res.status(404).send({"error":e.message});
    }
})
/*******************************************************************************/
/**
 * Devuelve localidad con nombre igual al que se pasa por parámetros
 * @returns {JSON} si existe devuelve la localidad con nombre igual al que se pasa
 *  por parametro
 */

app.get('/nombre/:nombre',async (req,res)=>{
    
    try{
        let contenido=await localidades.buscarNombre(req.params.nombre);
        if (contenido.length==0){
            throw new Error ('localidad no encontrada');
        }
        res.json(contenido);
    }catch(e){
        if(e.message!='localidad no encontrada'){
            res.status(404).send({"error":"Error inesperado."})
        }
        res.status(404).send({"error":e.message});
    }
})
/*******************************************************************************/
module.exports=app;