const {db} = require('../db');//tomo la conexion
const{CONT_SUPER}=require('../../../config/globals');
const bcrypt= require('bcrypt');
(async () =>{
    try{
        console.log("******************************************************");
        console.log("******************************************************");
        console.log("*Se inicia proceso inicial de creación tablas de BBDD*");
        console.log("******************************************************");
        console.log("******************************************************");
        await db.schema.createTable('direccion',table =>{
            table.increments('id');
            table.string('direccion').notNullable();
            table.integer('altura').defaultTo(null);
            table.integer('piso').defaultTo(null);
            table.string('depto',20).defaultTo(null);
            table.string('codPos',10).notNullable();
            table.string('provincia',20).notNullable();
            table.string('localidad',20).notNullable();
            table.integer('eliminado').defaultTo(null);
        })
        .then(()=>console.log("Tabla direccion creada"))
        .then(async ()=>{
            await db.schema.createTable('organismo',table =>{
                table.increments('id');
                table.string('cuit',16).notNullable();
                table.string('denominacion',50).notNullable();
                table.integer('direccion').unsigned().notNullable();
                table.string('telefono',50).notNullable();
                table.string('mail',100).notNullable();
                table.integer('eliminado').defaultTo(null);
                table.foreign('direccion').references('id').inTable('direccion');
            })
        })
        .then(()=>console.log("Tabla organismo creada"))
        .then(async ()=>{
            await db.schema.createTable('empleado',table =>{
                table.increments('id');
                table.string('cuil',16).notNullable();
                table.string('apellido',50).notNullable();
                table.string('nombre',50).notNullable();
                table.string('mail',100).notNullable();
                table.integer('idOrganismo').unsigned().notNullable();
                table.string('cargo',50).notNullable();
                table.integer('eliminado').defaultTo(null);
                table.foreign('idOrganismo').references('id').inTable('organismo');
            })
        })
        .then(()=>console.log("Tabla empleado creada"))
        .then(async ()=>{
            await db.schema.createTable('proveedor',table =>{
                table.increments('id');
                table.string('cuit',16).notNullable();
                table.string('razonSocial',100).notNullable();
                table.string('tPersona',20).notNullable();
                table.string('mail',100).notNullable();
                table.string('provincia',20).notNullable();
                table.string('localidad',20).notNullable();
                table.string('telefono',50).notNullable();
                table.integer('eliminado').defaultTo(null);
            })
        })
        .then(()=>console.log("Tabla proveedor creada"))
        .then(async ()=>{
            await db.schema.createTable('rol',table =>{
                table.increments('id');
                table.string('nombre',30).notNullable();
                table.integer('eliminado').defaultTo(null);
            })
        })
        .then(()=>console.log("Tabla rol creada"))
        .then(async ()=>{
            await db.schema.createTable('tlicitacion',table =>{
                table.increments('id');
                table.string('nombre',30).notNullable();
                table.integer('eliminado').defaultTo(null);
            })
        })
        .then(()=>console.log("Tabla tlicitacion creada"))
        .then(async ()=>{
            await db.schema.createTable('permiso',table =>{
                table.string('id',30).notNullable();
                table.integer('role_id').unsigned().notNullable();
                table.integer('eliminado').defaultTo(null);
                table.foreign('role_id').references('id').inTable('rol');
            })
        })
        .then(()=>console.log("Tabla permiso creada"))
        .then(async ()=>{
            await db.schema.createTable('usuariointerno',table =>{
                table.increments('id');
                table.string('nombre',50).notNullable();
                table.string('contrasenia',100).notNullable();
                table.integer('idRol').unsigned().notNullable();
                table.integer('idEmpleado').unsigned().notNullable();
                table.string('mail',100).notNullable();
                table.integer('baja').defaultTo(null);
                table.foreign('idRol').references('id').inTable('rol');
                table.foreign('idEmpleado').references('id').inTable('empleado');
            })
        })
        .then(()=>console.log("Tabla usuariointerno creada"))
        .then(async ()=>{
            await db.schema.createTable('usuarioexterno',table =>{
                table.increments('id');
                table.string('cuit',16).notNullable();
                table.string('mail',100).notNullable();
                table.string('contrasenia',100).notNullable();
                table.integer('idProveedor').unsigned().notNullable();
                table.integer('baja').defaultTo(null);
                table.foreign('idProveedor').references('id').inTable('proveedor');
            })
        })
        .then(()=>console.log("Tabla usuarioexterno creada"))
        .then(async ()=>{
            await db.schema.createTable('legitimoabono',table =>{
                table.increments('id');
                table.integer('idOrganismo').unsigned().notNullable();
                table.integer('idProveedor').unsigned().notNullable();
                table.text('descripcion').notNullable();
                table.date('fechaInicio').notNullable();
                table.date('fechaFin').notNullable();
                table.float('monto').notNullable();
                table.text('justificacion').notNullable();
                table.text('actoDispositivo').notNullable();
                table.timestamp('fecha').notNullable();
                table.integer('borrado').defaultTo(null);
		        table.integer('idUsuario').unsigned().notNullable();
                table.foreign('idOrganismo').references('id').inTable('organismo');
                table.foreign('idProveedor').references('id').inTable('proveedor');
		        table.foreign('idUsuario').references('id').inTable('usuariointerno');
            })
        })
        .then(()=>console.log("Tabla legitimoabono creada"))
	    .then(async ()=>{
            await db.schema.createTable('pliego',table =>{
                table.increments('id');
                table.text('archivo').notNullable();
                table.date('fecha').notNullable();
                table.integer('eliminado').defaultTo(null);
            })
        })
        .then(()=>console.log("Tabla pliego creada"))
	
	.then(async ()=>{
            await db.schema.createTable('detallelicitacion',table =>{
                table.increments('id');
		        table.integer('idpliego').unsigned().notNullable();
                table.date('fecha').notNullable();
                table.date('fechalimite').notNullable();
                table.date('fechaapertura').notNullable();
                table.text('dictamen').notNullable();
                table.text('actaadjudicacion').notNullable();
                table.text('actaapertura').notNullable();
                table.integer('baja').defaultTo(null);
		        table.foreign('idpliego').references('id').inTable('pliego');
            })
        })
        .then(()=>console.log("Tabla detallelicitacion creada"))
	    .then(async ()=>{
            await db.schema.createTable('licitacion',table =>{
                table.increments('id');
		        table.integer('idOrganismo').unsigned().notNullable();
                table.integer('idUsuario').unsigned().notNullable();
                table.integer('idDetalle').unsigned().notNullable();
                table.integer('idTipo').unsigned().notNullable();
                table.integer('finalizada').unsigned().notNullable();
                table.integer('eliminada').defaultTo(null);
                table.foreign('idOrganismo').references('id').inTable('organismo');
                table.foreign('idUsuario').references('id').inTable('usuariointerno');
                table.foreign('idDetalle').references('id').inTable('detallelicitacion');
                table.foreign('idTipo').references('id').inTable('tlicitacion');
            })
        })
        .then(()=>console.log("Tabla licitacion creada"))
	    .then(async ()=>{
            await db.schema.createTable('propuestaslicitacion',table =>{
                table.increments('id');
		        table.integer('idLicitacion').unsigned().notNullable();
                table.integer('idProveedor').unsigned().notNullable();
		        table.text('propuesta').notNullable();
		        table.date('fecha').notNullable();	
		        table.integer('eliminado').defaultTo(null);
		        table.foreign('idLicitacion').references('id').inTable('licitacion');
		        table.foreign('idProveedor').references('id').inTable('proveedor');
	        })
        })
        .then(()=>console.log("Tabla propuestaslicitacion creada"))
        .then(()=>{
            console.log("*****************************************************");
            console.log("*****************************************************");
            console.log("*Se inicia proceso de creación de usuarios iniciales*");
            console.log("*****************************************************");
            console.log("*****************************************************");
        })
        .then(async()=>{
            let nombre="ADMINISTRADOR"
            await db("rol").insert({
                nombre
            })
            nombre="PROVEEDOR"
            await db("rol").insert({
                nombre
            })
            nombre="SUPERIOR"
            await db("rol").insert({
                nombre
            })
            nombre="EMPLEADO"
            await db("rol").insert({
                nombre
            })
        })
        .then(()=>console.log("Roles genéricos creados"))
        .then(async()=>{
            let id="PERMIT_LOGIN";
            const role_id=1;
            await db("permiso").insert({
                id,
                role_id
            })
            id="PERMIT_ADMINISTRATE";
            await db("permiso").insert({
                id,
                role_id
            })
            id="PERMIT_ADMINISTRATE_ROLES";
            await db("permiso").insert({
                id,
                role_id
            })
            id="PERMIT_ADMINISTRATE_USERS";
            await db("permiso").insert({
                id,
                role_id
            })
        })
        .then(()=>console.log("Permisos rol administrador creados"))
        .then(async()=>{
            const direccion="JULIO A. ROCA"
            const altura=651;
            const piso=7;
            const codPos=1067;
            const provincia="02";
            const localidad="02000010000";
            await db("direccion").insert({
                direccion,
                altura,
                piso,
                codPos,
                provincia,
                localidad
            })
        })
        .then(()=>console.log("Calle creada"))
        .then(async()=>{
            const cuit="30-33333333-3"
            const denominacion="TRIBUNAL FISCAL DE LA NACION";
            const direccion=1;
            const telefono="01148885678"
            const mail="TRIBUNALFISCAL@MECON.GOB.AR";
            await db("organismo").insert({
                cuit,
                denominacion,
                direccion,
                telefono,
                mail
            })
        })
        .then(()=>console.log("Tribunal creado"))
        .then(async()=>{
            const cuit="34-54667611-2"
            const denominacion="TRIBUNAL DE TASACIONES DE LA NACION";
            const direccion=1;
            const telefono="01143493032"
            const mail="TRIBUNALTASACION@PRODUCCION.GOB.AR";
            await db("organismo").insert({
                cuit,
                denominacion,
                direccion,
                telefono,
                mail
            })
        })
        .then(()=>console.log("Tribunal creado"))
        .then(async()=>{
            const cuit="34-54666666-2"
            const denominacion="BANCO CENTRAL DE LA REPUBLICA ARGENTINA";
            const direccion=1;
            const telefono="01143675243"
            const mail="BCRA@ECONOMIA.GOB.AR";
            await db("organismo").insert({
                cuit,
                denominacion,
                direccion,
                telefono,
                mail
            })
        })
        .then(()=>console.log("Banco creado"))
        .then(async()=>{
            const cuit="34-5413131313-2"
            const denominacion="COMISION NACIONAL DE VALORES";
            const direccion=1;
            const telefono="01143494444"
            const mail="CNV@ECONOMIA.GOB.AR";
            await db("organismo").insert({
                cuit,
                denominacion,
                direccion,
                telefono,
                mail
            })
        })
        .then(()=>console.log("CNV creada"))
        .then(async()=>{
            const cuil="22-22222222-0"
            const apellido="PEREZ";
            const nombre="JUAN";
            const mail="ADMIN@ADMIN.GOB.AR";
            const idOrganismo=1;
            const cargo="JEFE AREA SISTEMAS"
            await db("empleado").insert({
                cuil,
                apellido,
                nombre,
                mail,
                idOrganismo,
                cargo
            })
        })
        .then(()=>console.log("empleado creado"))
        .then(async()=>{
            const nombre="SUPERUSUARIO"
            const contrasenia=await bcrypt.hash(CONT_SUPER,10);
            const idRol=1;
            const idEmpleado=1;
            const mail="ADMIN@ADMIN.GOB.AR"
            await db("usuariointerno").insert({
                nombre,
                contrasenia,
                idRol,
                idEmpleado,
                mail
            })
        })
        .then(()=>console.log("usuario superusario creado"))
    }catch(e){
        console.log(e)
        console.log("Se ha producido un error en el proceso de migración")
    }
    
    process.exit(0);// esto lo hago para que no se quede colgado el sistema y haya que apretar ctrl+c   
})()