const express= require('express');
const app=express.Router();
const servicios= require('./services/servicesProveedor')
/**
 * Crea un nuevo proveedor. Recibira por el body los datos 
 * del nuevo proveedor que se agregara a la base de datos. En el caso de la Provincia y
 * localidad el sistema espera recibir un codigo de provincia y un codigo de localidad.
 * En caso de que la peticion haya salido bien devolverá status 200 y
 * un json con el nuevo proveedor. De existir algún error lo
 * devolverá con Status 404. 
 * @returns {JSON} json
 */

app.post ('/',async (req, res)=> {
    try{
        if (!req.body.cuit|| req.body.cuit.trim()==""||!req.body.razonSocial|| req.body.razonSocial.trim()==""||
        !req.body.tPersona || req.body.tPersona.trim()==""||!req.body.provincia ||!req.body.localidad||!req.body.telefono ||
        isNaN(req.body.telefono)||!req.body.mail||req.body.mail.trim()==""|| isNaN(req.body.provincia) ||isNaN(req.body.localidad)){
            throw new Error("revise la informacion proporcionada");
        }
        let proveedor={
            "cuit": req.body.cuit,
            "razonSocial": req.body.razonSocial.toUpperCase(),
            "tPersona": req.body.tPersona.toUpperCase(),
            "provincia": req.body.provincia,
            "localidad": req.body.localidad,
            "mail":req.body.mail.toUpperCase(),
            "telefono": req.body.telefono
        }
        let pgetter=await servicios.cuitGetter (req.body.cuit);
        if (pgetter.length!=0){throw new Error ("cuit ya registrado")};
        await servicios.proveedorGuardar(proveedor);
        res.status(200).send(proveedor);         
    }
    catch(e){
        if (e.message!= "cuit ya registrado" && e.message!="revise la informacion proporcionada"){
            //en el caso de que el error sea uno desconocido lanzo error inesperado.
            res.status(404).send({"Mensaje": "Error inesperado. Comuniquese con el administrador"});
            return;
        }
        res.status(404).send({"Mensaje": e.message});
    }
 })
/*******************************************************************************/
/**
 * Devuelve un listado general de todos los proveedores que hay en la tabla de 
 * proveedores.
 * @returns {JSON} json
 */
app.get('/',async (req,res)=>{
    try{
        let registros=await servicios.proveedoresListado();
        if (registros.length==0){
            throw new Error ('No se han encontrado Proveedores.');
        }
        res.status(200).send(registros);
    }
    catch(error){
        if (error.message!='No se han encontrado Proveedores.'){
            res.status(413).send({"Mensaje":'error inesperado'}); 
            return;   
        }
        res.status(404).send({"Mensaje":error.message});
    }
})

/*******************************************************************************/
/**
 * Devuelve la información del proveedor que tiene número de id igual al que se 
 * pasa por parámetro.
 * @returns {JSON} json
 */
app.get('/:id',async (req,res)=>{
    try{
        if (isNaN(req.params.id) || req.params.id.replace(/ /g, "")==""||req.params.id.replace(/ /g, "")!=req.params.id){
            throw new Error ("Chequee la información ingresada")
        }
        let registros=await servicios.proveedorGetter(req.params.id);
        if (registros.length==0){
            throw new Error ('No se han encontrado proveedores con ese id.');
        } 
        res.status(200).send(registros[0]);
    }
    catch(error){
        if(error.message!= 'No se han encontrado proveedores con ese id.' && error.message!="Chequee la información ingresada"){
            res.status(413).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    }
})
/*******************************************************************************/
/**
 * Devuelve la información del proveedor que tiene número de cuit igual al que se 
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
            throw new Error ('No se han encontrado proveedores con ese cuit.');
        } 
        res.status(200).send(registros[0]);
    }
    catch(error){
        if(error.message!= 'No se han encontrado proveedores con ese cuit.' && error.message!="Chequee la información ingresada"){
            res.status(413).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    }
})
/*******************************************************************************/
/**
 * Devuelve la información del proveedor que tiene razon social igual a la que se 
 * pasa por parámetro.
 * @returns {JSON} json
 */
 app.get('/nombre/:rsoc',async (req,res)=>{
    try{
        if (!isNaN(req.params.rsoc) || req.params.rsoc.trim()==""){
            throw new Error ("Chequee la información ingresada")
        }
        let registros=await servicios.rsocGetter(req.params.rsoc.toUpperCase());
        if (registros.length==0){
            throw new Error ('No se han encontrado proveedores con esa razon social.');
        } 
        res.status(200).send(registros);
    }
    catch(error){
        if(error.message!= 'No se han encontrado proveedores con esa razon social.' && error.message!="Chequee la información ingresada"){
            res.status(413).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    }
})

/*******************************************************************************/
/**
 * Borrado logico del proveedor que tiene número de cuit igual al 
 * que se pasa por parámetro. Devuelve el registro con el campo eliminado en 1.
 * @returns {JSON} json
 */
 app.put('/borrado/:cuit', async (req,res)=>{
    try{
        if (isNaN(req.params.cuit) || req.params.cuit.replace(/ /g, "")==""||req.params.cuit.replace(/ /g, "")!=req.params.cuit){
            throw new Error ("Chequee la información ingresada")
        }
        let registros=await servicios.proveedorBorrado(req.params.cuit)
        if (registros.length==0){
            throw new Error ("No se ha podido realizar el borrado")
        }
        res.status(200).send(registros);

    } catch (error) {
        if (error.message!="No se ha podido realizar el borrado"  && error.message!="Chequee la información ingresada"){
            res.status(400).send({"Mensaje": "error inesperado"});
        }
        res.status(404).send({"Mensaje": error.message});
    }
});
/*******************************************************************************/
module.exports=app;