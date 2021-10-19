const express= require('express');
const app=express.Router();
const servicios= require('./services/servicesDashboard')

/**
 * Se devuelve la cantidad de legitimos abonos cargados por usuario, se mostraran solo los diez que mas
 * cargaron.
 */
app.get('/legabusuarios',async (req,res)=>{
    try{
        let consulta=await servicios.getLegABusuarios();
        if (consulta.length==0){
            throw new Error ("No se han encontrado Legitimos abonos")
        }
        res.status(200).send(consulta);
    }catch(error){
        if(error.message!= "No se han encontrado Legitimos abonos"){
            res.status(413).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    } 
})

/**
 * Se devuelve la cantidad de usuarios internos, cantidad de usuarios internos habilitados y cantidad de usuarios
 * internos inhabilitados.
 */
 app.get('/usuarioscount',async (req,res)=>{
    try{
        let consulta=await servicios.getUsuariosCount();
        if (consulta.length==0){
            throw new Error ("No se han encontrado no se han encontrado usuarios")
        }
        res.status(200).send(consulta);
    }catch(error){
        console.log(error)
        if(error.message!= "No se han encontrado no se han encontrado usuarios"){
            res.status(413).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    } 
})
/**
 * Se devuelve la cantidad de proveedores, cantidad de proveedores habilitados y cantidad de proveedores
 * inhabilitados.
 */
 app.get('/proveedorescount',async (req,res)=>{
    try{
        let consulta=await servicios.getProveedoresCount();
        if (consulta.length==0){
            throw new Error ("No se han encontrado no se han encontrado proveedores")
        }
        res.status(200).send(consulta);
    }catch(error){
        if(error.message!= "No se han encontrado no se han encontrado proveedores"){
            res.status(413).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    } 
})
/**
 * Se devuelve la cantidad de proveedores segun la provincia de donde provienen
 */
 app.get('/proveedorescountprov',async (req,res)=>{
    try{
        let consulta=await servicios.getProveedoresCountProv();
        if (consulta.length==0){
            throw new Error ("No se han encontrado no se han encontrado proveedores")
        }
        res.status(200).send(consulta);
    }catch(error){
        if(error.message!= "No se han encontrado no se han encontrado proveedores"){
            res.status(413).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    } 
})
/**
 * Se devuelve la cantidad de legitimos abonos que tienen los organismos
 */
 app.get('/countlaorg',async (req,res)=>{
    try{
        let consulta=await servicios.getLAorganismo();
        if (consulta.length==0){
            throw new Error ("No se han encontrado no se han encontrado legitimos abonos")
        }
        res.status(200).send(consulta);
    }catch(error){
        if(error.message!= "No se han encontrado no se han encontrado legitimos abonos"){
            res.status(413).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    } 
})
module.exports=app;