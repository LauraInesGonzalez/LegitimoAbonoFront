const qy=require('../../config/conexion');
/**
 * @param {object} legitimoAbono objeto con la informacion del legitimo abono a agregar
 * @returns {Array} Devuelve la información que fue cargada en la base de datos o de haber algun
 * error devuelve un array vacio. 
 */
async function legitimoAb(legitimoAbono){
    let query='INSERT INTO legitimoabono (idorganismo,idproveedor,descripcion,fechainicio,fechafin,monto,justificacion,actoDispositivo,idusuario,fecha) values (?,?,?,?,?,?,?,?,?,?)';
    let result=await qy (query,[legitimoAbono.organismo, legitimoAbono.proveedor, legitimoAbono.descripcion,legitimoAbono.fechaInicio,legitimoAbono.fechaFin, legitimoAbono.monto, legitimoAbono.justificacion,legitimoAbono.actoDispositivo, legitimoAbono.idusuario,legitimoAbono.fecha]);
    try{
        query='SELECT * FROM legitimoabono WHERE id=?';
        let resultado = await qy (query,[result.insertId]);
        return resultado;
    }catch{
        //el legitimo abono ya ha sido ingresado pero al querer devolver al usuario el registro ingresado existio un error de lectura
        return [];
    }    
}
/**
 * @returns {JSON} Devuelve el legitimo abono de id que se pasa por parametros siempre y cuando el legitimo
 * abono no haya sido borrado de manera logica.  
 */
 async function legitimoAbGet(id){
    let query='SELECT legitimoabono.id as id, organismo.denominacion as organismo, proveedor.razonSocial as proveedor, legitimoabono.descripcion as descripcion, fechaInicio, fechaFin, monto,justificacion,actoDispositivo FROM legitimoabono,organismo, proveedor WHERE legitimoabono.idOrganismo=organismo.id and legitimoabono.idProveedor=proveedor.id and legitimoabono.id=?  and legitimoabono.borrado is NULL';
    let registros=await qy (query,[id]);
    return registros;
}

/**
 * @returns {JSON} Devuelve el resultado de la consulta generalizada
 * a la tabla legitimo abono devolviendo los legitimos abonos no borrados.  
 */
 async function legitimoAbList(){
    let query= 'SELECT legitimoabono.id as id, organismo.denominacion as organismo, proveedor.razonSocial as proveedor, legitimoabono.descripcion as descripcion, fechaInicio, fechaFin, monto,justificacion,'; 
    query=query+'actoDispositivo,legitimoabono.borrado as borrado FROM legitimoabono,organismo, proveedor';
    query=query+' WHERE legitimoabono.idOrganismo=organismo.id and legitimoabono.idProveedor=proveedor.id and legitimoabono.borrado is NULL';
    let registros=await qy(query,[]);
    return registros;
}

/**
 * @returns {JSON} Devuelve el resultado de la consulta segun id de proveedor
 * a la tabla legitimo abono (devuelve los que no estan borrados).  
 */
 async function legitimoAbIpGet(proveedor){
    let query='SELECT legitimoabono.id as id, organismo.denominacion as organismo, proveedor.razonSocial as proveedor, legitimoabono.descripcion as descripcion, fechaInicio, fechaFin, monto,justificacion,actoDispositivo FROM legitimoabono,organismo, proveedor WHERE legitimoabono.idOrganismo=organismo.id and legitimoabono.idProveedor=proveedor.id and legitimoabono.idProveedor=? and legitimoabono.borrado is NULL';
    let registros=await qy (query,[proveedor]);
    return registros;
}
/**
 * @returns {JSON} Devuelve el resultado de la consulta segun cuit de proveedor
 * a la tabla legitimo abono (devuelve los que no estan borrados).  
 */
 async function legitimoAbCuitGet(proveedor){
    let query='SELECT legitimoabono.id as id, organismo.denominacion as organismo, proveedor.razonSocial as proveedor, legitimoabono.descripcion as descripcion, fechaInicio, fechaFin, monto,justificacion,actoDispositivo FROM legitimoabono,organismo, proveedor WHERE legitimoabono.idOrganismo=organismo.id and legitimoabono.idProveedor=proveedor.id and proveedor.cuit=? and legitimoabono.borrado is NULL';
    let registros=await qy (query,[proveedor]);
    return registros;
}
/**
 * @returns {JSON} Devuelve el resultado de la consulta segun id de organismo
 * a la tabla legitimo abono (devuelve los que no estan borrados).  
 */
 async function legitimoAbIoGet(organismo){
    let query='SELECT legitimoabono.id as id, organismo.denominacion as organismo, proveedor.razonSocial as proveedor, legitimoabono.descripcion as descripcion, fechaInicio, fechaFin, monto,justificacion,actoDispositivo FROM legitimoabono,organismo, proveedor WHERE legitimoabono.idOrganismo=organismo.id and legitimoabono.idProveedor=proveedor.id and legitimoabono.idOrganismo=? and legitimoabono.borrado is NULL';
    let registros=await qy (query,[organismo]);
    return registros;
}
/**
 * Marca como eliminado el Legitimo Abono que se solicita dar de baja. 
 * @returns {JSON} Devuleve un JSON del registro borrado con el campo
 * eliminado en 1.
 */
async function legitimoAbBorrado(id){
    let query='UPDATE legitimoabono SET borrado = ? WHERE id = ?';
    await qy(query,[1,id]);
    try{
        query='SELECT * FROM legitimoabono WHERE id=?';
        let resultado = await qy (query,[id]);
        return resultado;
    }catch{
        //el legitimo abono ya ha sido borrado pero al querer devolver al usuario el registro borrado existio un error de lectura
        return [];
    }   
}
module.exports={
    legitimoAb,
    legitimoAbGet,
    legitimoAbList,
    legitimoAbIpGet,
    legitimoAbIoGet,
    legitimoAbCuitGet,
    legitimoAbBorrado
}