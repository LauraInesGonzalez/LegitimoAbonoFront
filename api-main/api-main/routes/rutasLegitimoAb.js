const express= require('express');
const app=express.Router();
const servicios= require('./services/servicesLegitimoAb');
const serviceOrganismo= require('./services/servicesOrganismo');
const serviceProveedor= require('./services/servicesProveedor');
const multer = require("multer")
const path=require("path");
const jwt= require('jsonwebtoken');
const{SECRET_WORD}=require('../config/globals');
var storageAD = multer.diskStorage({
    destination: function(req, file, cb) {
            cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        cb(null,  Date.now()+'.pdf');
    }  
})
const uploadAD = multer({
    storage: storageAD,
    fileFilter: async function(req, file, callback) {
        var ext = path.extname(file.originalname);
        try{
            if (!req.body.organismo ||!req.body.proveedor || !req.body.descripcion || 
                !req.body.fechaInicio || !req.body.fechaFin || !req.body.monto || 
                !req.body.justificacion){
                //si falta algun dato lanza un error
                throw new Error('faltan datos');
            }
            
            if(!isNaN(req.body.proveedor)){
                //si se inserto algo diferente de un numero lanza error
                throw new Error ("En el campo proveedor debe haber un número de cuit"); 
            }
            if(isNaN(req.body.monto)){
                //si se inserto algo diferente de un numero lanza error
                throw new Error ("En el campo monto debe haber un número"); 
            } 
            if(req.body.organismo.trim()==""|| req.body.descripcion.trim()==""||
            req.body.fechaInicio.trim()==""|| req.body.fechaFin.trim()==""||
            req.body.justificacion.trim()==""){
                //nos fijamos que no hayan ingresado algun campo con espacios en blanco
                throw new Error('No se puede realizar envio de información en blanco.');
            }
            let organismo=await serviceOrganismo.denominacionGetter(req.body.organismo.toUpperCase());
            if (organismo.length==0){
                //nos fijamos si el organismo ingresado existe y si es asi me guardo el id
                throw new Error ("Organismo inexistente");
            }
            //consultamos si el proveedor ingresado existe y si es asi me guardo el id
            let proveedor=await serviceProveedor.cuitGetter(req.body.proveedor);
            if (proveedor.length==0){
                throw new Error ("Proveedor inexistente");
            }
            //si la extension del archivo que se pasa no es pdf lanza error
            if(ext !== '.pdf') {
                throw new Error('Solo se aceptan archivos pdf');
            }
            callback(null, true)
        }catch(e){
            callback(JSON.stringify({"Mensaje": e.message}),true);
            return;    
        }
        
    }
})
/************************************************************************/
/**
 * Crea un nuevo legitimo abono. Recibira por el body los datos 
 * del nuevo legitimo abono que se agregara a la base de datos.
 * En caso de que la peticion haya salido bien devolverá status 200 y
 * un json con el nuevo legitimo abono. De existir algún error lo
 * devolverá con Status 404. Las fechas deben llegar en formato aaaa/mm/dd
 * @returns {JSON} json
 */

app.post ('/',uploadAD.single('actodispo'),async (req, res)=> {
    try{
        if (!req.file){
            throw new Error("Debe ingresar un archivo del acto dispositivo")
        }
        let token=req.headers['authorization'];
        token= token.replace ('Bearer ', '');
        let usuario=jwt.verify(token, SECRET_WORD, function(err, decoded) {
            return decoded.idusuario;
        });
        //hasta implementar la seccion usuario el id de usuario sera 1
        //se guarda la información del legitimo abono en un objeto para despues pasarlo por parametro
        let organismo=await serviceOrganismo.denominacionGetter(req.body.organismo.toUpperCase());
        let proveedor=await serviceProveedor.cuitGetter(req.body.proveedor);
        let d=new Date();
        let fech=d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
        let legitimoAb={
            "organismo": organismo.id,
            "proveedor": proveedor[0].id,
            "descripcion": req.body.descripcion.toUpperCase(),
            "fechaInicio": req.body.fechaInicio,
            "fechaFin": req.body.fechaFin,
            "monto": req.body.monto,
            "justificacion": req.body.justificacion.toUpperCase(),
            "actoDispositivo": req.file.filename,
            "idusuario":usuario,
            "fecha":fech
        }
        let registro=await servicios.legitimoAb(legitimoAb);
        if (registro.length==0){
            throw new Error ("El Legitimo abono ha sido ingresado. Error de lectura de la base de datos.");
        }
        res.status(200).send(registro[0]);         
    }
    catch(e){
        if (e.message!="El Legitimo abono ha sido ingresado. Error de lectura de la base de datos." &&
        e.message!="Proveedor inexistente"&& e.message!= "Organismo inexistente"&& 
        e.message!= 'No se puede realizar envio de información en blanco.'&& e.message!= "En el campo monto debe haber un número" &&
        e.message!= "En el campo proveedor debe haber un número de cuit" && e.message!='faltan datos' && e.message!='Solo se aceptan archivos pdf'&&
        e.message!="Debe ingresar un archivo del acto dispositivo"){
            //en el caso de que el error sea uno desconocido lanzo error inesperado.
            res.status(404).send({"Mensaje": "Error inesperado. Comuniquese con el administrador"});
            return;
        }
        res.status(404).send({"Mensaje": e.message});
    }
 })
/*******************************************************************************/
/**
 * Devuelve un listado generalizado de los legitimos abono que hay
 * registrados (sin borrar) en la base de datos.
 * @returns {JSON} json
 */
app.get('/',async (req,res)=>{
    try{
        let registros=await servicios.legitimoAbListado();
        if (registros.length==0){
            throw new Error ('No se han encontrado legitimos abonos.');
        }
        res.status(200).send(registros);
    }
    catch(error){
        if (error.message!='No se han encontrado legitimos abonos.'){
            res.status(413).send({"Mensaje":'error inesperado'});
            return;    
        }
        res.status(404).send({"Mensaje":error.message});
    }
})

/*******************************************************************************/
/**
 * Devuelve la información del legitimo abono que tiene número de id igual al 
 * que se pasa por parámetro siempre y cuando el legitimo abono no este borrado.
 * @returns {JSON} json
 */

app.get('/:id',async (req,res)=>{
    try{
        if (isNaN(req.params.id) || req.params.id.replace(/ /g, "")==""||req.params.id.replace(/ /g, "")!=req.params.id){
            throw new Error ("Chequee la información ingresada")
        }
        let registros=await servicios.legitimoAbGetter(req.params.id);
        if (registros.length==0){
            throw new Error ('No se han encontrado legitimos abonos con ese id.');
        } 
        res.status(200).send(registros);
    }
    catch(error){
        if(error.message!= 'No se han encontrado legitimos abonos con ese id.' && error.message!="Chequee la información ingresada"){
            res.status(404).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    }
})

/*******************************************************************************/
/**
 * Devuelve la información del legitimo abono que tiene como proveedor al 
 * id de proveedor que se pasa por parámetro.
 * @returns {JSON} json
 */

 app.get('/proveedor/:id',async (req,res)=>{
    try{
        if (isNaN(req.params.id) || req.params.id.replace(/ /g, "")==""||req.params.id.replace(/ /g, "")!=req.params.id){
            throw new Error ("Chequee la información ingresada")
        }
        let registros=await servicios.legitimoAbGetterIp(req.params.id);
        if (registros.length==0){
            throw new Error ('No se han encontrado legitimos abonos para ese proveedor.');
        } 
        res.status(200).send(registros);
    }
    catch(error){
        if(error.message!= 'No se han encontrado legitimos abonos para ese proveedor.' && error.message!="Chequee la información ingresada"){
            res.status(404).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    }
})

/*******************************************************************************/

/**
 * Devuelve la información del legitimo abono que tiene como proveedor al 
 * cuit de proveedor que se pasa por parámetro.
 * @returns {JSON} json
 */

 app.get('/proveedor/cuit/:cuit',async (req,res)=>{
    try{
        if (!isNaN(req.params.cuit) || req.params.cuit.trim()==""||req.params.cuit.replace(/ /g, "")!=req.params.cuit){
            //esta preguntando si estas mandando espacios vacios o si estas mandando algo es que un numero cuando
            //se espera un string o si se colocaron espacios intermedios cuando no son permitidos los mismos
            throw new Error ("Chequee la información ingresada")
        }
        let registros=await servicios.legitimoAbGetterCuit(req.params.cuit);
        if (registros.length==0){
            throw new Error ('No se han encontrado legitimos abonos para ese proveedor.');
        } 
        res.status(200).send(registros);
    }
    catch(error){
        if(error.message!= 'No se han encontrado legitimos abonos para ese proveedor.' && error.message!="Chequee la información ingresada"){
            res.status(404).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    }
})

/*******************************************************************************/
/**
 * Devuelve la información del legitimo abono que tiene como organismo al 
 * id de organismo que se pasa por parámetro.
 * @returns {JSON} json
 */

 app.get('/organismo/:id',async (req,res)=>{
    try{
        if (isNaN(req.params.id) || req.params.id.replace(/ /g, "")==""||req.params.id.replace(/ /g, "")!=req.params.id){
            throw new Error ("Chequee la información ingresada")
        }
        let registros=await servicios.legitimoAbGetterIo(req.params.id);
        if (registros.length==0){
            throw new Error ('No se han encontrado legitimos abonos para ese organismo.');
        } 
        res.status(200).send(registros);
    }
    catch(error){
        if(error.message!= 'No se han encontrado legitimos abonos para ese organismo.' && error.message!="Chequee la información ingresada"){
            res.status(404).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    }
})

/*******************************************************************************/

/**
 * Borrado logico del legitimo abono que tiene número de id igual al 
 * que se pasa por parámetro. Devuleve el registro con el campo eliminado en 1.
 * @returns {JSON} json
 */

app.put('/borrado/:id', async (req,res)=>{
    try{
        if (isNaN(req.params.id) || req.params.id.replace(/ /g, "")==""||req.params.id.replace(/ /g, "")!=req.params.id){
            throw new Error ("Chequee la información ingresada")
        }
        let registro=await servicios.legitimoAbGetter(req.params.id);
        if (registro.length==0){
            throw new Error ('No se han encontrado legitimos abonos con ese id.');
        } 
        registro=await servicios.legitimoAbBorrado(req.params.id)
        if (registro.length==0){
            throw new Error ("El Legitimo abono ha sido borrado. Error de lectura de la base de datos.");
        }
        res.status(200).send(registro);

    } catch (error) {
        if (error.message!='No se han encontrado legitimos abonos con ese id.'&& 
        error.message!='El Legitimo abono ha sido borrado. Error de lectura de la base de datos.'&&
        error.message!="El legitimo abono no puede ser borrado por que ya ha sido eliminado con anterioridad"
        && error.message!="Chequee la información ingresada"){
            res.status(404).send({"Mensaje": "error inesperado"});
            return;
        }
        res.status(404).send({"Mensaje": error.message});
    }
});
/**
 * Devuelve el acto dispositivo que se solicita por parametro.
 */
app.get('/download/:archivo',(req,res)=>{
    var archivo = './uploads/' + req.params.archivo;
    res.download(archivo, req.params.archivo,function(err){
        if(err){
            res.status(404).send({"error":"No se ha podido realizar la descarga"})
        }
    });
})
/*******************************************************************************/
module.exports=app;