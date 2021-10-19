const qy=require('../../config/conexion');
/*********************************************************************/
/**
 * Guarda un proveedor en la base de datos, especificamente en la tabla
 * proveedor .
 */
 async function proveedorGuardar(proveedor){
        let query='INSERT INTO proveedor (cuit,razonSocial,tPersona,mail,provincia,localidad,telefono) values (?,?,?,?,?,?,?)';
        await qy (query,[proveedor.cuit,proveedor.razonSocial,proveedor.tPersona,proveedor.mail,proveedor.provincia,proveedor.localidad,proveedor.telefono])
}
/**
 * Realiza la consulta a la base de datos, especificamente a la tabla
 * proveedor en busca de un listado generalizado todos los proveedores
 * registrados.
 * @returns {JSON} Devuelve un JSON con la respuesta de la tabla proveedor.
 */
async function proveedoresList(){
    let registros=await qy ('SELECT * FROM proveedor');
    return registros;
}
/**
 * Realiza la consulta a la base de datos, especificamente a la tabla
 * proveedor en busca del proveedor con numero de id que se pasa
 * por parámetro.
 * @param {Integer} id id del proveedor a buscar
 * @returns {JSON} devuelve un JSON con la respuesta de la tabla proveedor.
 * En el caso de existir algun error lo devuelve. 
 */
async function proveedorGet (id){
    let query='SELECT * FROM proveedor WHERE id=?';
    let registros=await qy (query,id);
    return registros;
}
/**
* Realiza la consulta a la base de datos, especificamente a la tabla
* proveedor en busca del proveedor con razon social igual a la que se pasa
* por parámetro. 
* @param {String} rsoc razon social del proveedor a buscar.
* @returns {JSON} devuelve un JSON con la respuesta de la tabla proveedor.   
*/
async function rsocGet (rsoc){
    let query='SELECT * FROM proveedor WHERE razonSocial=?';
    let registros=await qy (query,rsoc);
    return registros;
}
/**
* Realiza la consulta a la base de datos, especificamente a la tabla
* proveedor en busca del proveedor con numero de cuit que se pasa
* por parámetro. 
* @param {String} ciut cuit del proveedor a buscar.
* @returns {JSON} devuelve un JSON con la respuesta de la tabla proveedor.  
*/
async function cuitGet (cuit){
    let query='SELECT * FROM proveedor WHERE cuit=?';
    let registros=await qy (query,[cuit]);
    return registros;
}
/**
 * Borrado logico del proveedor que tiene número de cuit igual al 
 * que se pasa por parámetro. 
 * @param {String} ciut cuit del proveedor a buscar.
 * @returns {JSON} Devuleve un JSON del registro borrado con el campo
 * eliminado en 1.
 */
async function proveedorBorrado(cuit){
    let query = 'UPDATE proveedor SET eliminado=? WHERE cuit = ?';
    await qy(query, [1, cuit]);
    return await cuitGet(cuit);
}
module.exports={
    proveedorGet,
    proveedoresList,
    cuitGet,
    rsocGet,
    proveedorBorrado,
    proveedorGuardar
}