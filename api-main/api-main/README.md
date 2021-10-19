
# Trabajo final de la materia Práctica Profesional III de la carrera Tec. en Análisis de Sistemas.

EN ÉSTA SECCION SE ENCUENTRA LA API DEL SISTEMA A DESARROLLAR.

**Nota: se configuraron ciertas variables de entorno que deberán tambien ser configuradas, en nuestro caso pusimos el PORT como 5500 pero ese puerto dependerá de lo que se tenga configurado tambien habra que configurar como variables de entorno APP_USER, APP_HOST, APP_DB que son las variables que se necesitarán para la comunicación a la BBDD**

# Instalación

El proyecto necesita para funcionar [Node.js](https://nodejs.org/es/) preferentemente la última versión.

#### Instalar dependencias

```sh
$ npm install
```

#### Configuración de variables de entorno

```Ejemplo:``` [Env.ejemplo](./.env.ejemplo)

```Ejemplo env para migración:``` [Env.ejemplo](./migration/.env.ejemplo)

#### Iniciar el proyecto de manera local

```sh
$ npn run runMigration
$ npm start
```
**Nota: para comenzar a utilizar el sistema se debe crear la base de datos compras (de no estar creada la base de datos la migracion no se podra realizar) y configurar las variables de entorno correspondientes. Posteriormente correr el comando npm run runMigration para que se generen todas las tablas de la base de datos y el nuevo super usuario que a modo de ejemplo se lo asignamos a una persona ficticia llamada juan perez.**

#  Librerias utilizadas

Para poder operar el Backend utiliza diferentes librerias que se detallan a continuación

- [Express](https://expressjs.com/) - Framework de Node.js

- [Node.js](https://nodejs.org/es/) - ambiente de desarrollo

- [Nodemon](https://www.npmjs.com/package/nodemon) - servidor en modo escucha

- [jsonWebtoken](https://www.npmjs.com/package/jsonwebtoken) - para formar el token

- [knex.js](https://knexjs.org/) - para la migracion inicial del sistema.

- [bcrypt](https://www.npmjs.com/package/bcrypt) - para hacer hash de las contraseñas

- [multer](https://www.npmjs.com/package/multer) - manejo de archivos

- [node-fetch](https://www.npmjs.com/package/node-fetch) - para hacer fetch y levantar informacion desde una api externa.

- [cors](https://www.npmjs.com/package/cors)

- [MySql](https://www.npmjs.com/package/mysql) - para conexion a base de datos.

  
#  Documentación Postman

https://documenter.getpostman.com/view/14621250/U16kr5Cr

## Rutas usuarios internos
   #### Rutas usuario interno (/userinterno):

   * `POST` | localhost:5500/userinterno -> crea un nuevo usuario interno.

   * `POST` | localhost:5500/userinterno/login -> logeo de usuarios.

   * `POST` | localhost:5500/userinterno/permiso -> asigna permisos a un cierto rol.

   * `POST` | localhost:5500/userinterno/rol -> crea un cierto rol.

   * `GET`  | localhost:5500/userinterno -> genera un listado generalizado de los usuarios internos registrados.

   * `GET`  | localhost:5500/userinterno/:id -> devuelve usuario interno con id que se pasa por parametro.

   * `GET`  | localhost:5500/userinterno/cuil/:cuil -> devuelve usuario interno con cuil que se pasa por parametro.

   * `DELETE`  | localhost:5500/userinterno/:usuario -> Se inhabilita el usuario que se pasa por parametros.

   * `PUT`  | localhost:5500/userinterno/rehabilitar/:usuario -> Se rehabilita el usuario que se pasa por parametros.

## Rutas de la api
  #### Rutas legitimo abono (/legitimoab):

   * `POST` | localhost:5500/legitimoab en este caso hay un html para hacer la prueba de la ruta ya que se tiene que cargar un pdf y por el postman por algún motivo no dejaba subir un json y un archivo a la vez asi que generamos un pequeño html para poder probarlo. Si pone node app.js y accede al localhost:5500 podra ingresar al html correspondiente.

  **Las que probamos con postman de /legitimoab**

   * `GET` | localhost:5500/legitimoab -> devuelve un JSON con el listado generalizado de los legitimos abonos cargados al momento y no borrados.

   * `GET` | localhost:5500/legitimoab /:id-> devuelve un JSON con el legitimo abono con numero de id que se pasa por parametros y no borrados.

   * `GET` | localhost:5500/legitimoab /proveedor/:id -> devuelve un JSON con todos los legitimos abonos que son del proveedor de id que se pasa por parámetro (legitimos abonos no borrados).

   * `GET` | localhost:5500/legitimoab /proveedor/cuit/:cuit -> devuelve un JSON con todos los legitimos abonos que son del proveedor de cuit que se pasa por parámetro (legitimos abonos no borrados).

   * `GET` | localhost:5500/legitimoab /organismo/:id -> devuelve un JSON con todos los legitimos abonos que son del organismo de id que se pasa por parámetro (legitimos abonos no borrados).

   * `PUT` | localhost:5500/legitimoab /borrado/:id -> realiza un borrado lógico del legitimo abono que tiene por id el que se pasa por parametro.

   * `GET` | localhost:5500/legitimoab /download/:archivo -> devuelve el archivo del acto dispositivo que se solicita por parametro.

  #### Rutas proveedores (/proveedor):

   * `POST` | localhost:5500/proveedor -> crea un nuevo proveedor.

   * `GET` | localhost:5500/proveedor -> devuelve listado generalizado de los proveedores

   * `GET` | localhost:5500/proveedor/:id -> devuelve proveedor de id igual al que se pasa por parámetro.

   * `GET` | localhost:5500/proveedor/cuit/:cuit -> devuelve proveedor de cuit igual al que se pasa por parámetro.

   * `GET` | localhost:5500/proveedor/nombre/:rsoc -> devuelve proveedor de razón social igual al que se pasa por parámetro.

   * `PUT` | localhost:5500/proveedor/borrado/:cuit -> eliminación lógica de un proveedor según su número de cuit.

  #### Rutas tipos de licitaciones (/tlicitacion):

   * `POST` | localhost:5500/tlicitacion -> crea un nuevo tipo de licitacion.

   * `GET` | localhost:5500/tlicitacion -> devuelve un JSON con el listado generalizado de los tipos de licitaciones cargados al momento.

   * `GET` | localhost:5500/tlicitacion/:id -> si hay devuelve tipo de licitación con id igual al que se pasa por parámetro.

   * `PUT` | localhost:5500/tlicitacion/borrado/:id -> eliminación lógica de un tipo de licitacion según su número de id.

  #### Rutas provincia (/provincia):

   **Nota: para actualizar el json contenedor de todas las provincias utilizar el comando npm run actualizarProvincias**

   * `GET` | localhost:5500/provincia -> devuelve el listado generalizado de provincias argentinas registradas.

   * `GET` | localhost:5500/provincia/:id -> devuelve provincia con id que se pasa por parámetro.

   * `GET` | localhost:5500/provincia/nombre/:nombre -> devuelve provincia con nombre que se pasa por parámetro.

  #### Rutas de localidad (/localidad):

  **Nota: para actualizar el json contenedor de todas las localidades utilizar el comando npm run actualizarLocalidades**
   * `GET` | localhost:5500/localidad -> devuelve el listado generalizado de localidades argentinas registradas.

   * `GET` | localhost:5500/localidad/:id -> devuelve localidad con id que se pasa por parámetro.

   * `GET` | localhost:5500/localidad/nombre/:nombre -> devuelve localidad con nombre que se pasa por parámetro.

   #### Rutas de empleados (/empleado):

   * `POST` | localhost:5500/empleado -> crea un nuevo empleado.

   * `GET` | localhost:5500/empleado -> devuelve un JSON con el listado generalizado de los empleados cargados al momento.

   * `GET` | localhost:5500/empleado/:id -> si hay devuelve empleado con id igual al que se pasa por parámetro.

   * `GET` | localhost:5500/empleado/cuil/:cuil -> devuelve empleado con cuit igual al que se pasa por parámetro.
   * `DELETE`  | localhost:5500/empleado/:id -> Se realiza un borrado logico del empleado que se pasa por parametros.

#### Rutas de organismos (/organismo):

   * `GET` | localhost:5500/organismo -> Devuelve un listado generalizado con todos los organismo existentes en la  base de datos.

   * `GET` | localhost:5500/organismo/:id -> si hay devuelve organismo con id igual al que se pasa por parámetro.

   * `GET` | localhost:5500/organismo/cuit/:cuit -> devuelve organismo con cuit igual al que se pasa por parámetro.

   * `GET` | localhost:5500/organismo/denominacion/:denominacion -> devuelve organismo con denominacion igual a la que se pasa por parámetro.

#### Rutas de dashboard (/dashboard):

   * `GET` | localhost:5500/dashboard/legabusuarios -> Devuelve el top 10 de los usuarios que mas crearon legitimos abonos con la cantidad de legitimos abonos que crearon.

   * `GET` | localhost:5500/dashboard/usuarioscount -> devuelve la cantidad de usuarios registrados vs la cantidad de usuarios habilitados vs la cantidad de usuarios inhabilitados.

   * `GET` | localhost:5500/dashboard/proveedorescount -> devuelve la cantidad de usuarios proveedores registrados vs la cantidad habilitados vs la cantidad inhabilitados.

   * `GET` | localhost:5500/dashboard/proveedorescountprov -> devuelve la cantidad de usuarios proveedores registrados diferencias por provincia.

   * `GET` | localhost:5500/dashboard/countlaorg -> devuelve la cantidad de legitimos abonos segun el organismo.
