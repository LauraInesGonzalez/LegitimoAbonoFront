const model= require ('../models/modelsProveedor');
/**
 * guarda el proveedor que se ingresa por parametros
 */
 async function proveedorGuardar(proveedor){
    return await model.proveedorGuardar(proveedor);
}
/**
 * @returns {JSON} Devuelve un listado general de todos los proveedores
 * que hay en la tabla de proveedores.
 */
async function proveedoresListado(){
    return await model.proveedoresList();
}

/**
 * @param {Integer} id id del proveedor a buscar
 * @returns {JSON} devuelve un JSON con la información del proveedor
 * que tiene número de id igual al que se pasa por parámetro. 
 */
async function proveedorGetter (id){
    return await model.proveedorGet(id);
}
/**
* @param {String} rsoc razon social del proveedor a buscar.
* @returns {JSON} devuelve un JSON con la información del proveedor
* que tiene razon social igual a la que se pasa por parámetro.  
*/
async function rsocGetter (rsoc){
    return await model.rsocGet(rsoc);
}
/**
* @param {String} cuit cuit del proveedor a buscar.
* @returns {JSON} devuelve un JSON con la información del proveedor
* que tiene número de cuit igual al que se pasa por parámetro.  
*/
async function cuitGetter (cuit){
    return await model.cuitGet(cuit);
}
/**
 * Borrado logico del proveedor que tiene número de cuit igual al 
 * que se pasa por parámetro. 
 * @param {String} ciut cuit del proveedor a buscar.
 * @returns {JSON} Devuleve un JSON del registro borrado con el campo
 * eliminado en 1. 
 */
 async function proveedorBorrado(cuit){
    return await model.proveedorBorrado(cuit);
}
module.exports={
    proveedorGetter,
    proveedoresListado,
    cuitGetter,
    rsocGetter,
    proveedorBorrado,
    proveedorGuardar
}