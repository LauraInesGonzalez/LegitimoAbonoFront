const express= require('express');
const app=express.Router();
const servicios= require('./services/servicesTLicitacion')

/**
 * Crea un nuevo tipo de licitación. Recibira por el body un string con 
 * el nuevo tipo de licitacion que se agregara a la base de datos.
 * En caso de que la peticion haya salido bien devolverá status 200 y
 * un json con el nuevo tipo de licitación. De existir algún error lo
 * devolverá con Status 404.
 * @returns {JSON} json
 */

app.post ('/',async (req, res)=> {
    try{
        if (!req.body.licitacion ){
            throw new Error('faltan datos');
        }
        if(req.body.licitacion.trim()==""){
            throw new Error('No se puede realizar envio de información en blanco');
        }
        let tLicitacion=req.body.licitacion.toUpperCase();
        let revisiontLicitacion=await servicios.tlicitacionGetterN(tLicitacion);
        if(revisiontLicitacion.length!=0){
            throw new Error('El tipo de licitacion ya se encuentra registrado revise los datos');
        }
        await servicios.tlicitacion(tLicitacion);
        revisiontLicitacion=await servicios.tlicitacionGetterN(tLicitacion);
        res.status(200).send(revisiontLicitacion);
    }
    catch(e){
        if (e.message=='faltan datos'||e.message=='No se puede realizar envio de información en blanco'||e.message=='El tipo de licitacion ya se encuentra registrado revise los datos'){
            res.status(404).send({"Mensaje":e.message});
        }
        res.status(404).send({"Mensaje":"Error inesperado"});
    }
 })
/*******************************************************************************/
/**
 * Devuelve un listado generalizado de los tipos de licitación que hay
 * registrados en la tabla tlicitacion.
 * @returns {JSON} json
 */
app.get('/',async (req,res)=>{
    try{
        let registros=await servicios.tlicitacionListado();
        if (registros.length==0){
            throw new Error ('No se han encontrado tipos de licitaciones.');
        }
        res.status(200).send(registros);
    }
    catch(error){
        if (error.message!='No se han encontrado tipos de licitaciones.'){
            res.status(413).send({"Mensaje":'error inesperado'});    
        }
        res.status(404).send({"Mensaje":error.message});
    }
})
/*******************************************************************************/
/**
 * Devuelve la información del tipo de licitación que tiene número de id igual al 
 * que se pasa por parámetro.
 * @returns {JSON} json
 */

app.get('/:id',async (req,res)=>{
    try{
        let registros=await servicios.tlicitacionGetter(req.params.id);
        if (registros.length==0){
            throw new Error ('No se han encontrado tipos de licitaciones con ese id.');
        } 
        res.status(200).send(registros);
    }
    catch(error){
        if(error.message!= 'No se han encontrado tipos de licitaciones con ese id.'){
            res.status(413).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    }
})

/*******************************************************************************/

/**
 * Borrado logico del tipo de licitación que tiene número de id igual al 
 * que se pasa por parámetro. Devuleve el registro con el campo eliminado en 1.
 * @returns {JSON} json
 */

app.put('/borrado/:id', async (req,res)=>{
    try{
        let registros=await servicios.tlicitacionGetter(req.params.id);
        if (registros.length==0){
            throw new Error ('No se han encontrado tipos de licitaciones con ese id.');
        } 

        registros=await servicios.tlicitacionBorrado(req.params.id)
        res.status(200).send(registros);

    } catch (error) {
        if (error.message!='No se han encontrado tipos de licitaciones con ese id.'){
            res.status(400).send({"Mensaje": "error inesperado"});
        }
        res.status(404).send({"Mensaje": error.message});
    }
});
/*******************************************************************************/
module.exports=app;