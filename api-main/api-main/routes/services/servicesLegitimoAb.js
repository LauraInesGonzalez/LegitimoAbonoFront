const model= require ('../models/modelsLegitimoAb');
/**
 * Guarda en la base de datos un nuevo legitimo abono
 * @returns {JSON} Devuelve un JSON con el legitimo abono
 * que se guardo.  
 */
async function legitimoAb(legitimoAbono){
    return await model.legitimoAb(legitimoAbono);
}
/**
 * @returns {JSON} Devuelve un JSON con un listado generalizado de
 * los Legitimos abonos registrados en la BBDD.  
 */
async function legitimoAbListado(){
    return await model.legitimoAbList();
}

/**
 * @param {Integer} id id del legitimo abono
 * @returns {JSON} devuelve un JSON con la información del legitimo 
 * abono que tiene número de id igual al que se pasa por parámetro. 
 */
async function legitimoAbGetter (id){
    return await model.legitimoAbGet(id);
}
/**
 * @param {integer} organismo id del organismo que se desea buscar
 * @returns {JSON} devuelve un JSON con la información de los legitimos 
 * abonos que tiene idOrganismo igual al que se pasa por parámetro.
 */
 async function legitimoAbGetterIo (organismo){
    return await model.legitimoAbIoGet(organismo);
}
/**
 * @param {integer} proveedor id del proveedor que se desea buscar
 * @returns {JSON} devuelve un JSON con la información de los legitimos 
 * abonos que tiene idProveedor igual al que se pasa por parámetro.
 */
 async function legitimoAbGetterIp (proveedor){
    return await model.legitimoAbIpGet(proveedor);
}

/**
 * @param {integer} proveedor cuit del proveedor que se desea buscar
 * @returns {JSON} devuelve un JSON con la información de los legitimos 
 * abonos que tiene cuit igual al que se pasa por parámetro.
 */
 async function legitimoAbGetterCuit (proveedor){
    return await model.legitimoAbCuitGet(proveedor);
}
/**
 * Borrado logico del legitimo abono que tiene número de id igual al 
 * que se pasa por parámetro. 
 * @param {Integer} id id del legitimo abono
 * @returns {JSON} Devuleve un JSON del registro borrado con el campo
 * eliminado en 1.
 */
async function legitimoAbBorrado(id){
    return await model.legitimoAbBorrado(id);
}
module.exports={
    legitimoAb,
    legitimoAbListado,
    legitimoAbGetter,
    legitimoAbGetterIo,
    legitimoAbGetterIp,
    legitimoAbGetterCuit,
    legitimoAbBorrado
}