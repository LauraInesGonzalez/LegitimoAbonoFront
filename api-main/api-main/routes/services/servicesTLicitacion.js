const model= require ('../models/modelsTLicitacion');

/**
 * @returns {JSON} Devuelve un JSON con un listado generalizado de
 * los tipos de licitación que hay registrados en la tabla tlicitacion.
 */
async function tlicitacionListado(){
    return await model.tlicitacionesList();
}

/**
 * @param {Integer} id id del tipo de licitación
 * @returns {JSON} devuelve un JSON con la información del tipo de 
 * licitación que tiene número de id igual al que se pasa por parámetro.
 */
async function tlicitacionGetter (id){
    return await model.tlicitacionGet(id);
}
/**
 * @param {string} licitacion nombre del tipo de licitación
 * @returns {JSON} devuelve un JSON con la información del tipo de 
 * licitación que tiene nombre igual al que se pasa por parámetro. 
 */
 async function tlicitacionGetterN (licitacion){
    return await model.tlicitacionNGet(licitacion);
}
/**
 * @param {string} licitacion nombre del tipo de licitación
 * Guarda en la tabla tlicitacion el tipo de licitacion que se le pasa
 * por parametro.
 */
 async function tlicitacion (licitacion){
    await model.tlicitacion(licitacion);
}
/**
 * Borrado logico del tipo de licitación que tiene número de id igual al 
 * que se pasa por parámetro. 
 * @param {Integer} id id del tipo de licitación
 * @returns {JSON} Devuleve un JSON del registro borrado con el campo
 * eliminado en 1. 
 */
async function tlicitacionBorrado(id){
    return await model.tlicitacionBorrado(id);
}

module.exports={
    tlicitacionListado,
    tlicitacionGetter,
    tlicitacionGetterN,
    tlicitacion,
    tlicitacionBorrado
}