const qy=require('../../config/conexion');
/*********************************************************************/

/**
 * Realiza la consulta a la base de datos, especificamente a la tabla
 * organismo en busca de un listado generalizado todos los organismos
 * registrados.
 * @returns {JSON} Devuelve un JSON con la respuesta de la tabla organismo.
 * En el caso de existir algun error lo devuelve.
 */
async function organismosList(){
    let registros=await qy ('SELECT * FROM organismo');
    return registros;
}
/**
 * Realiza la consulta a la base de datos, especificamente a la tabla
 * organismo en busca del organismo con numero de id que se pasa
 * por parámetro.
 * @param {Integer} id id del organismo a buscar
 * @returns {JSON} devuelve un JSON con la respuesta de la tabla organismo.
 * En el caso de existir algun error lo devuelve. 
 */
async function organismoGet (id){
    let query='SELECT * FROM organismo WHERE id=?';
    let registros=await qy (query,id);
    if (registros.length==0){
        return registros;
    }
    return registros[0];
}
/**
* Realiza la consulta a la base de datos, especificamente a la tabla
* organismo en busca del organismo con numero de cuit que se pasa
* por parámetro. 
* @param {String} ciut cuit del organismo a buscar.
* @returns {JSON} devuelve un JSON con la respuesta de la tabla organismo.  
* En el caso de existir algun error lo devuelve. 
*/
async function cuitGet (cuit){
    let query='SELECT * FROM organismo WHERE cuit=?';
    let registros=await qy (query,cuit);
    if (registros.length==0){
        return registros;
    }
    return registros[0];
}

async function denominacionGet(denominacion){
    let query='SELECT * FROM organismo WHERE denominacion=?';
    let registros=await qy (query,denominacion);
    if (registros.length==0){
        return registros;
    }
        return registros[0];    
}
module.exports={
    organismoGet,
    organismosList,
    cuitGet,
    denominacionGet
}