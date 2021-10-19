const jwt= require('jsonwebtoken');
const unless=require('express-unless');
const{SECRET_WORD}=require('./config/globals');
const express= require('express');
const cors=require ('cors');
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const {PORT}=require('./config/globals');
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/estatico/mul-upload.html');
})
/**
 * AUTENTICACIÓN
 */

const auth=(req,res,next)=>{
    try{
        //nos fijamos si la request viene con un token
        let token=req.headers['authorization'];
        if (!token){//si no tiene token lanzamos error
            throw new Error ("No ha iniciado sesión");
        }
        token= token.replace ('Bearer ', '');//hay que despejar el token para que quede solo
        jwt.verify(token, SECRET_WORD, (err,user)=>{
            if(err){//si hay algun problema con el token se lanza error
                throw new Error("Token inválido");		
            }
        });
        next();
    }
    catch(e){
        res.status(403).send({"message": e.message});
    }			 	
   
}

/**
 * Lo que se hace aca es que el usuario no va a poder entrar a ninguna ruta si
 * es que no tiene un token valido (salvo a la ruta de login).
 */

auth.unless= unless;
app.use(
    auth.unless({
        path:[
            {url: '/userinterno/login', method: ['POST']}
        ]
    })
)



/**
 * SE REQUIREN LOS DIFERENTES ARCHIVOS DE LAS RUTAS
 */
const routeProveedor= require('./routes/rutasProveedor');
const routeEmpleado= require('./routes/rutasEmpleado');
const routeOrganismo= require('./routes/rutasOrganismo');
const routeTLicitacion= require('./routes/rutasTLicitacion');
const routeDireccion= require('./routes/rutasDireccion');
const routeLegitimoAb=require('./routes/rutasLegitimoAb');
const routeProvincia=require('./routes/rutasProvincia');
const routeLocalidad=require('./routes/rutasLocalidad');
const routeUserInterno=require('./routes/rutasUserInterno');
const routeDashboard=require('./routes/rutasDashboard');

/*************************************************************************/
/***
 * RUTAS:
 * Proveedor (/proveedor)-> empresa o persona física que se inscribe como proveedor del Estado.
 * Empleado (/empleado)-> Empleado de un Organismo del Estado, que esta inscripto en el sistema.
 * Organismo (/organismo)-> Organismo perteneciente al Estado, que esta inscripto en el sistema.
 * tlicitacion (/tlicitacion)-> tipo de licitacion.
 * legitimoAb (/legitimoab)-> ruta para los legitimos abonos.
 * direccion (/direccion)-> direcciones.
 * provincia (/provincia)->provincias del pais. Se solicitara ésta información por ejemplo al ingresar un
 * nuevo proveedor al sistema.
 * localidad (/localidad)->localidades del pais. Se solicitara ésta información por ejemplo al ingresar un
 * nuevo proveedor al sistema.
 */

app.use('/proveedor',routeProveedor);
app.use('/empleado',routeEmpleado);
app.use('/organismo',routeOrganismo);
app.use('/tlicitacion',routeTLicitacion);
app.use('/direccion',routeDireccion);
app.use('/legitimoab',routeLegitimoAb);
app.use('/provincia',routeProvincia);
app.use('/localidad',routeLocalidad);
app.use('/userinterno',routeUserInterno);
app.use('/dashboard', routeDashboard);

/*************************************************************************/
app.use((req, res) => {
    res.json({"error":"Ruta no encontrada","descripcion": `ruta ${req.originalUrl} no implementada` });
})
app.listen(PORT,()=>{
    console.log('puerto '+ PORT);
});
