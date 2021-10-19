const qy=require('../../config/conexion');
/*********************************************************************/
/**
 * Realiza la insercion en la tabla de empleados del empleado que se 
 * pasa por parametro.
 * @param {Object} empleado empleado a ingresar
 */
 async function empleadoIngreso (empleado){
    let query='INSERT INTO empleado (cuil,apellido,nombre,mail,idOrganismo,cargo) values (?,?,?,?,?,?)';
    await qy (query,[empleado.cuil,empleado.apellido,empleado.nombre,empleado.mail,empleado.idOrganismo,empleado.cargo]);
}

/**
 * Realiza la consulta a la base de datos, especificamente a la tabla
 * empleado en busca de un listado generalizado todos los empleados
 * registrados.
 * @returns {JSON} Devuelve un JSON con la respuesta de la tabla empleado.
 */
async function empleadosList(){
    let registros=await qy ('SELECT empleado.*, organismo.denominacion as organismo  FROM empleado, organismo where empleado.idOrganismo=organismo.id and empleado.eliminado is null');
    return registros;
}
/**
 * Realiza la consulta a la base de datos, especificamente a la tabla
 * empleado en busca del empleado con numero de id que se pasa
 * por parámetro.
 * @param {Integer} id id del empleado a buscar
 * @returns {JSON} devuelve un JSON con la respuesta de la tabla empleado.
 * En el caso de existir algun error lo devuelve. 
 */
async function empleadoGet (id){
    let query='SELECT * FROM empleado WHERE id=?';
    let registros=await qy (query,id);
    return registros;
}
/**
* Realiza la consulta a la base de datos, especificamente a la tabla
* empleado en busca del empleado con numero de cuil que se pasa
* por parámetro. 
* @param {String} ciul cuil del empleado a buscar.
* @returns {JSON} devuelve un JSON con la respuesta de la tabla empleado.  
* En el caso de existir algun error lo devuelve. 
*/
async function cuilGet (cuil){
    let query='SELECT * FROM empleado WHERE cuil=?';
    let registros=await qy (query,cuil);
    return registros;
}
async function empleadoBorrado(empleado){
    let query = 'UPDATE empleado SET eliminado=? WHERE id = ?';
    await qy(query, [1, empleado]);
    return empleadoGet (empleado);
}
module.exports={
    empleadoIngreso,
    empleadoGet,
    empleadosList,
    cuilGet,
    empleadoBorrado
}