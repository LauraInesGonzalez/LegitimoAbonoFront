const express= require('express');
const app=express.Router();
const servicios= require('./services/servicesUserInterno');
const servicesEmpleado=require('./services/servicesEmpleado');
const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');
const{SECRET_WORD}=require('../config/globals');

/**
 * Agrega un nuevo Usuario a la tabla usuariosInternos.
 * @returns {JSON} json que contiene el nuevo Usuario agregado.
 */
app.post('/',async(req,res)=>{
    try{
        //controla que todos los campos necesarios vengan sin estar vacios
        if(!req.body.cuil||!isNaN(req.body.cuil)||req.body.cuil.trim()==""||
        !req.body.usuario||!isNaN(req.body.usuario)||req.body.usuario.trim()==""||
        !req.body.contrasenia||!isNaN(req.body.contrasenia)||req.body.contrasenia.trim()==""||
        !req.body.email||!isNaN(req.body.email)||req.body.email.trim()==""||
        !req.body.rol||isNaN(req.body.rol)){
            throw new Error("Revise la información ingresada");
        }
        //me fijo si el nombre de usuario ya se encuentra registrado
        let buscarxusuario=await servicios.getUser(req.body.usuario);
        if (buscarxusuario.length!=0){
            throw new Error("El nombre de usuario ya se encuentra registrado");
        }
        //me fijo si el empleado esta en los registros
        let empleado=await servicesEmpleado.cuilGetter(req.body.cuil);
        if (empleado.length==0){
            throw new Error("El numero de cuil ingresado no se corresponde con empleado registrado");
        }
        //Si está todo bien, debemos encriptar la clave
		const claveEncriptada= await bcrypt.hash(req.body.contrasenia,10);
        //por el momento y hasta que se implemente rutasRol se toma como que el id de rol me lo pasa el front
        let usuarioReg={
            "nombre":req.body.usuario.toUpperCase(),
            "contrasenia":claveEncriptada,
            "idRol":req.body.rol,
            "idEmpleado":empleado[0].id,
            "mail":req.body.email.toUpperCase()
        }
        await servicios.createUser(usuarioReg);
        res.json(usuarioReg);
    }catch(e){

        if(e.message!="Revise la información ingresada" && e.message!="El nombre de usuario ya se encuentra registrado"
        && e.message!="El numero de cuil ingresado no se corresponde con empleado registrado"){
            res.status(404).json({"error":"Error inesperado"})
            return;
        }
        res.status(404).json({"error":e.message});
    }
})
/**
 * Login. De haber ingresado correctamente el usuario y la contraseña devuelve un token
 * @returns{JSON} DEVUELVE EL TOKEN.
 */
app.post('/login', async(req,res)=>{
	try{
	    if(!req.body.usuario || !req.body.contrasenia){
		    throw new Error ("Revise los datos ingresados");
	    }
        let respuesta=await servicios.getUser(req.body.usuario.toUpperCase());
        if (respuesta.length==0){
            throw new Error ('Usuario o contraseña incorrectos');
        }
        if (respuesta[0].baja==1){
            throw new Error("Usuario inhabilitado consulte con el administrador");
        }
        if(!bcrypt.compareSync (req.body.contrasenia, respuesta[0].contrasenia)){
		    throw new Error("Usuario o contraseña incorrectos");
	    }
        let d=new Date();
        let fech=d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate()+"T"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+"Z";
	    const tokenData={
		    idusuario: respuesta[0].id, 
		    nombreusuario:respuesta[0].nombre,
            fechalogueo:fech,
		    email:respuesta[0].mail
	    }
	   const token= jwt.sign(tokenData, SECRET_WORD,{
		expiresIn: 60*60*2 // expira en 2hs
	   });
       let permisos=await servicios.getPermisos(respuesta[0].idRol)
       //armo la parte del rol donde tendre que id de rol es y ademas los permisos que tiene el rol
       let rol={
           "id":respuesta[0].idRol,
           "role_permits":permisos
        };
        //armo la informacion que le voy a devolver al front para que se pueda armar los menu etc
       let jsonrta={
           "id":respuesta[0].id,
           "email":respuesta[0].mail,
           "username":respuesta[0].nombre,
           "role_id":respuesta[0].idRol,
           "role":rol
       }
	   res.send({"data":jsonrta,"token":token});					
	}
	catch(e){
        if(e.message!="Revise los datos ingresados" && e.message!='Usuario o contraseña incorrectos' && e.message!="Usuario inhabilitado consulte con el administrador"){
            res.status(404).json({"error":"Error inesperado"})
            return;
        }
        res.status(404).json({"error":e.message});
	}
});
/**
 * Permisos. Debe llegar un array con 1 o mas permisos para ingresar a la base de datos.
 * @returns{JSON} devuelven los permisos ingresados y a que rol le corresponden.
 */
 app.post('/permiso', async(req,res)=>{
	try{
	    if(!req.body.rolusuario||req.body.permisos.length==0){
		    throw new Error ("Revise los datos ingresados");
	    }
        let respuesta=await servicios.getRol(req.body.rolusuario.toUpperCase());
        if (respuesta.length==0){
            throw new Error ('Rol de usuario no encontrado');
        }
        let permisosSolicitados={
            "rolusuario":respuesta[0].id,
            "permisos":req.body.permisos
        }
        respuesta=await servicios.setPermisos(permisosSolicitados);
        res.json(respuesta)					
	}
	catch(e){
        console.log(e)
        if(e.message!="Revise los datos ingresados" && e.message!='Rol de usuario no encontrado'){
            res.status(404).json({"error":"Error inesperado"})
            return;
        }
        res.status(404).json({"error":e.message});
	}
});
/**
 * Roles. Se ingresa un rol a la base de datos.
 * @returns{JSON} devuelve el nuevo rol.
 */
 app.post('/rol', async(req,res)=>{
	try{
	    if(!req.body.rolusuario){
		    throw new Error ("Revise los datos ingresados");
	    }
        let respuesta=await servicios.getRol(req.body.rolusuario.toUpperCase());
        if (respuesta.length!=0){
            throw new Error ('Rol de usuario ya existe');
        }
        await servicios.setRol(req.body.rolusuario.toUpperCase());
        res.json({"rol":req.body.rolusuario.toUpperCase()})					
	}
	catch(e){
        if(e.message!='Rol de usuario ya existe'){
            res.status(404).json({"error":"Error inesperado"})
            return;
        }
        res.status(404).json({"error":e.message});
	}
});
/**
 * Devuelve un listado generalizado con todos los usuarios existentes en la 
 * base de datos.
 * @returns {JSON} json
 */
 app.get('/',async (req,res)=>{
    try{
        let registros=await servicios.usuariosListado();
        if (registros.length==0){
            throw new Error ('No se han encontrado usuarios.');
        }
        res.status(200).send(registros);
    }
    catch(error){
        if (error.message!='No se han encontrado usuarios.'){
            res.status(413).send({"Mensaje":'error inesperado'});    
        }
        res.status(404).send({"Mensaje":error.message});
    }
})
/**
 * Devuelve la información del usuario que tiene número de id igual al que se 
 * pasa por parámetro.
 * @returns {JSON} json
 */
 app.get('/:id',async (req,res)=>{
    try{
        if (isNaN(req.params.id) || req.params.id.replace(/ /g, "")==""){
            throw new Error ("Chequee la información ingresada")
        }
        let registros=await servicios.usuarioGetter(req.params.id);
        if (registros.length==0){
            throw new Error ('No se han encontrado usuarios con ese id.');
        } 
        res.status(200).send(registros[0]);
    }
    catch(error){
        if(error.message!= 'No se han encontrado usuarios con ese id.' && error.message!="Chequee la información ingresada"){
            res.status(413).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    }
})
/**
 * Devuelve la información del usuario que tiene número de cuil igual al que se 
 * pasa por parámetro.
 * @returns {JSON} json
 */
 app.get('/cuil/:cuil',async (req,res)=>{
    try{
        if (!isNaN(req.params.cuil) || req.params.cuil.trim()==""||req.params.cuil.replace(/ /g, "")!=req.params.cuil){
            //esta preguntando si estas mandando espacios vacios o si estas mandando algo es que un numero cuando
            //se espera un string o si se colocaron espacios intermedios cuando no son permitidos los mismos
            throw new Error ("Chequee la información ingresada")
        }
        let registros=await servicios.cuilGetter(req.params.cuil);
        if (registros.length==0){
            throw new Error ('No se han encontrado usuarios con ese cuil.');
        } 
        res.status(200).send(registros[0]);
    }
    catch(error){
        if(error.message!= 'No se han encontrado usuarios con ese cuil.' && error.message!="Chequee la información ingresada"){
            res.status(413).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    }
})
/**
 * deshabilita usuario que tiene nombre igual al  que se pasa por parámetro.
 * Devuelve el registro con el campo eliminado en 1.
 * @returns {JSON} json
 */
 app.delete('/:usuario', async (req,res)=>{
    try{
        if (!isNaN(req.params.usuario) || req.params.usuario.replace(/ /g, "")==""||req.params.usuario.replace(/ /g, "")!=req.params.usuario){
            throw new Error ("Chequee la información ingresada")
        }
        let registros=await servicios.usuarioBorrado(req.params.usuario.toUpperCase())
        if (registros.length==0){
            throw new Error ("No se ha podido realizar el borrado")
        }
        res.status(200).send(registros[0]);

    } catch (error) {
        if (error.message!="No se ha podido realizar el borrado"  && error.message!="Chequee la información ingresada"){
            res.status(400).send({"Mensaje": "error inesperado"});
            return;
        }
        res.status(404).send({"Mensaje": error.message});
    }
});
/**
 * rehabilita usuario que tiene nombre igual al  que se pasa por parámetro.
 * Devuelve el registro con el campo eliminado en NULL.
 * @returns {JSON} json
 */
 app.put('/rehabilitar/:usuario', async (req,res)=>{
    try{
        if (!isNaN(req.params.usuario) || req.params.usuario.replace(/ /g, "")==""||req.params.usuario.replace(/ /g, "")!=req.params.usuario){
            throw new Error ("Chequee la información ingresada")
        }
        let registros=await servicios.usuarioRehabilitar(req.params.usuario.toUpperCase())
        if (registros.length==0){
            throw new Error ("Algo fallo al realizar la rehabilitacion")
        }
        res.status(200).send(registros[0]);

    } catch (error) {
        console.log(error)
        if (error.message!="Algo fallo al realizar la rehabilitacion"  && error.message!="Chequee la información ingresada"){
            res.status(400).send({"Mensaje": "error inesperado"});
            return;
        }
        res.status(404).send({"Mensaje": error.message});
    }
});
/**
 * Cambio de contraseña
 */
 app.put('/cambio/:usuario', async (req,res)=>{
    try{
        if (!isNaN(req.params.usuario) || req.params.usuario.replace(/ /g, "")==""||req.params.usuario.replace(/ /g, "")!=req.params.usuario
        || !req.body.contrasenia){
            throw new Error ("Chequee la información ingresada")
        }
        const claveEncriptada= await bcrypt.hash(req.body.contrasenia,10);
        let registros=await servicios.usuarioCambioContra({"nombre":req.params.usuario.toUpperCase(),"contrasenia":claveEncriptada})
        if (registros.length==0){
            throw new Error ("Algo fallo al realizar el cambio de contraseña")
        }
        res.status(200).send(registros[0]);

    } catch (error) {
        if (error.message!="Algo fallo al realizar el cambio de contraseña"  && error.message!="Chequee la información ingresada"){
            res.status(400).send({"Mensaje": "error inesperado"});
            return;
        }
        res.status(404).send({"Mensaje": error.message});
    }
});

module.exports=app;