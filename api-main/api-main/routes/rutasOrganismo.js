const express= require('express');
const app=express.Router();
const servicios= require('./services/servicesOrganismo')
const servicesDireccion=require('./services/servicesDireccion')
/**
 * Devuelve un listado generalizado con todos los organismo existentes en la 
 * base de datos.
 * @returns {JSON} json
 */
app.get('/',async (req,res)=>{
    try{
        let registros=await servicios.organismosListado();
        if (registros.length==0){
            throw new Error ('No se han encontrado Organismos.');
        }
        res.status(200).send(registros);
    }
    catch(error){
        if (error.message!='No se han encontrado Organismos.'){
            res.status(413).send({"Mensaje":'error inesperado'});    
        }
        res.status(404).send({"Mensaje":error.message});
    }
})

/*******************************************************************************/

/**
 * Devuelve la información del organismo que tiene número de id igual al que se 
 * pasa por parámetro.
 * @returns {JSON} json
 */
app.get('/:id',async (req,res)=>{
    try{
        if (isNaN(req.params.id) || req.params.id.replace(/ /g, "")==""){
            throw new Error ("Chequee la información ingresada")
        }
        let registros=await servicios.organismoGetter(req.params.id);
        if (registros.length==0){
            throw new Error ('No se han encontrado organismos con ese id.');
        } 
        res.status(200).send(registros);
    }
    catch(error){
        if(error.message!= 'No se han encontrado organismos con ese id.' && error.message!="Chequee la información ingresada"){
            res.status(413).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    }
})

/*******************************************************************************/
/**
 * Devuelve la información del organismo que tiene número de cuit igual al que se 
 * pasa por parámetro.
 * @returns {JSON} json
 */
app.get('/cuit/:cuit',async (req,res)=>{
    try{
        if (!isNaN(req.params.cuit) || req.params.cuit.trim()==""||req.params.cuit.replace(/ /g, "")!=req.params.cuit){
            //esta preguntando si estas mandando espacios vacios o si estas mandando algo es que un numero cuando
            //se espera un string o si se colocaron espacios intermedios cuando no son permitidos los mismos
            throw new Error ("Chequee la información ingresada")
        }
        let registros=await servicios.cuitGetter(req.params.cuit);
        if (registros.length==0){
            throw new Error ('No se han encontrado organismos con ese cuit.');
        } 
        res.status(200).send(registros);
    }
    catch(error){
        if(error.message!= 'No se han encontrado organismos con ese cuit.' && error.message!="Chequee la información ingresada"){
            res.status(413).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    }
})
/*******************************************************************************/
/**
 * Devuelve la información del organismo que tiene número de id igual al que se 
 * pasa por parámetro.
 * @returns {JSON} json
 */
 app.get('/denominacion/:denominacion',async (req,res)=>{
    try{
        if (req.params.denominacion.trim()==""|| !isNaN(parseInt(req.params.denominacion,10))){
            //esta preguntando si estas mandando espacios vacios o si estas mandando algo es que un numero cuando
            //se espera un string
            throw new Error ("Chequee la información ingresada")
        }
        let registros=await servicios.denominacionGetter(req.params.denominacion);
        if (registros.length==0){
            throw new Error ('No se han encontrado organismos con esa denominación.');
        } 
        res.status(200).send(registros);
    }
    catch(error){
        if(error.message!= 'No se han encontrado organismos con esa denominación.' && error.message!="Chequee la información ingresada"){
            res.status(404).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    }
})
/*******************************************************************************/

module.exports=app;