const qy=require('../../config/conexion');
/*********************************************************************/
/**
 * Realiza la consulta a la base de datos, especificamente a la tabla
 * direccion en busca de un listado generalizado todas las direcciones
 * registradas.
 * @returns {JSON} Devuelve un JSON con la respuesta de la tabla direccion.
 */
async function direccionesList(){
    let registros=await qy ('SELECT * FROM direccion');
    return registros;

}
/**
 * Realiza la consulta a la base de datos, especificamente a la tabla
 * direccion en busca de la direccion con numero de id que se pasa
 * por parámetro.
 * @param {Integer} id id de la dirección a buscar
 * @returns {JSON} devuelve un JSON con la respuesta de la tabla direccion.
 */
async function direccionGet (id){
    let query='SELECT * FROM direccion WHERE id=?';
    let registros=await qy (query,id);
    return registros;
}
module.exports={
    direccionGet,
    direccionesList
}