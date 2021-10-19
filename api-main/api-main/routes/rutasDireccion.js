const express= require('express');
const app=express.Router();
const servicios= require('./services/servicesDireccion')

/**
 * Devuelve un listado generalizado de las direcciones que hay
 * registrados en la tabla direccion.
 * @returns {JSON} json
 */
app.get('/',async (req,res)=>{
    try{
        let registros=await servicios.direccionListado();
        if (registros.length==0){
            throw new Error ('No se han encontrado direcciones registradas.');
        }
        res.status(200).send(registros);
    }
    catch(error){
        if (error.message!='No se han encontrado direcciones registradas.'){
            res.status(413).send({"Mensaje":'error inesperado'});    
        }
        res.status(404).send({"Mensaje":error.message});
    }
})

/*******************************************************************************/
/**
 * Devuelve la información de la direccion que tiene número de id igual al 
 * que se pasa por parámetro.
 * @returns {JSON} json
 */

app.get('/:id',async (req,res)=>{
    try{
        let registros=await servicios.direccionGetter(req.params.id);
        if (registros.length==0){
            throw new Error ('No se han encontrado direcciones con ese id.');
        } 
        res.status(200).send(registros);
    }
    catch(error){
        if(error.message!= 'No se han encontrado direcciones con ese id.'){
            res.status(413).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    }
})

/*******************************************************************************/

module.exports=app;