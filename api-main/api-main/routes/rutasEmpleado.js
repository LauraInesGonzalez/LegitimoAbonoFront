const express= require('express');
const app=express.Router();
const servicios= require('./services/servicesEmpleado')
const serviceOrganismo= require('./services/servicesOrganismo')
/**
 * Agrega un nuevo Empleado a la tabla empleados.
 * @returns {JSON} json que contiene el nuevo empleado agregado.
 */
app.post('/',async(req,res)=>{
    try{
        //controla que todos los campos necesarios vengan sin estar vacios
        if(!req.body.cuil||!isNaN(req.body.cuil)||req.body.cuil.trim()==""||!req.body.apellido||!isNaN(req.body.apellido)
        ||req.body.apellido.trim()==""|| !req.body.nombre||!isNaN(req.body.nombre)||req.body.nombre.trim()==""||
        !req.body.mail||!isNaN(req.body.mail)||req.body.mail.trim()==""||!req.body.idOrganismo||isNaN(req.body.idOrganismo)||
        !req.body.cargo||!isNaN(req.body.cargo)||req.body.cargo.trim()==""){
            throw new Error("Revise la información ingresada");
        }
        //me fijo si el empleado ya se encuentra registrado
        let buscarxcuil=await servicios.cuilGetter(req.body.cuil);
        if (buscarxcuil.length!=0){
            throw new Error("El empleado ya se encuentra registrado");
        }
        //me fijo si el organismo esta en los registros
        let organismo=await serviceOrganismo.organismoGetter(req.body.idOrganismo);
        if (organismo.length==0){
            throw new Error("El organismo ingresado es incorrecto");
        }
        let empleadoReg={
            "cuil":req.body.cuil,
            "apellido":req.body.apellido.toUpperCase(),
            "nombre":req.body.nombre.toUpperCase(),
            "mail":req.body.mail.toUpperCase(),
            "idOrganismo":organismo.id,
            "cargo":req.body.cargo.toUpperCase()
        }
        await servicios.empleadoIngreso (empleadoReg);
        res.json(empleadoReg);
    }catch(e){
        if(e.message!="Revise la información ingresada" && e.message!="El organismo ingresado es incorrecto"
        && e.message!="El empleado ya se encuentra registrado"){
            res.status(404).json({"error":"Error inesperado"})
            return;
        }
        res.status(404).json({"error":e.message});
    }
})

/**
 * Devuelve un listado general de todo los empleados que hay registrados 
 * en la tabla de empleados con toda su información.
 * @returns {JSON} json
 */

app.get('/',async (req,res)=>{
    try{
        let registros=await servicios.empleadosListado();
        if (registros.length==0){
            throw new Error ('No se han encontrado Empleados.');
        }
        res.status(200).send(registros);
    }
    catch(error){
        if (error.message!='No se han encontrado Empleados.'){
            res.status(413).send({"Mensaje":'error inesperado'});    
        }
        res.status(404).send({"Mensaje":error.message});
    }
})

/*******************************************************************************/

/**
 * Devuelve la información del empleado que tiene número de id igual al que se 
 * pasa por parámetro.
 * @returns {JSON} json
 */

app.get('/:id',async (req,res)=>{
    try{
        let registros=await servicios.empleadoGetter(req.params.id);
        if (registros.length==0){
            throw new Error ('No se han encontrado empleados con ese id.');
        } 
        res.status(200).send(registros);
    }
    catch(error){
        if(error.message!= 'No se han encontrado empleados con ese id.'){
            res.status(413).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    }
})

/*******************************************************************************/

/**
 * Devuelve la información del empleado que tiene número de cuil igual al que se 
 * pasa por parámetro.
 * @returns {JSON} json
 */

app.get('/cuil/:cuil',async (req,res)=>{
    try{
        
        let registros=await servicios.cuilGetter(req.params.cuil);
        
        if (registros.length==0){
            throw new Error ('No se han encontrado empleados con ese cuil.');
        } 
        res.status(200).send(registros);
    }
    catch(error){
        if(error.message!= 'No se han encontrado empleados con ese cuil.'){
            res.status(413).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    }
})
/**
 * Borrado logico de empleado que tiene id igual al  que se pasa por parámetro.
 * Devuelve el registro con el campo eliminado en 1.
 * @returns {JSON} json
 */
 app.delete('/:id', async (req,res)=>{
    try{
        if (isNaN(req.params.id)|| !req.params.id){
            throw new Error ("Chequee la información ingresada")
        }
        let registros=await servicios.empleadoBorrado(req.params.id);
        if (registros.length==0){
            throw new Error ("No se ha podido realizar el borrado")
        }
        res.status(200).send(registros[0]);

    } catch (error) {
        console.log(error.message)
        if (error.message!="No se ha podido realizar el borrado"  && error.message!="Chequee la información ingresada"){
            res.status(400).send({"Mensaje": "error inesperado"});
            return;
        }
        res.status(404).send({"Mensaje": error.message});
    }
});

/*******************************************************************************/

module.exports=app;