const qy=require('../../config/conexion');
class UserInternoModel{
	async create(user){
        let query='INSERT INTO usuariointerno (nombre,contrasenia,idRol,idEmpleado,mail) values (?,?,?,?,?)';
        await qy (query,[user.nombre,user.contrasenia,user.idRol,user.idEmpleado,user.mail]);
	}
	
	async findByNombre(nombre){
		let query='select * from usuariointerno where nombre=?';
        let resultado= await qy (query,[nombre]);
        return resultado;
	}
	async getPermisos(rol){
		let query='select * from permiso where role_id=?';
        let resultado= await qy (query,[rol]);
		return resultado;
	}
	async getRol(rol){
		let query='select * from rol where nombre=?';
        let resultado= await qy (query,[rol]);
		return resultado;
	}
	async setPermisos(permisos){
		var arrayPermisos=[];
		var queryCheck="";
		var resultado="";
		for(let i=0;i<permisos.permisos.length;i++){
			 queryCheck='select * from permiso where role_id=? and id=?';
        	 resultado= await qy (queryCheck,[permisos.rolusuario,permisos.permisos[i]]);
			if (resultado.length==0){
				let query='INSERT INTO permiso (id,role_id) values (?,?)';
        		await qy (query,[permisos.permisos[i],permisos.rolusuario]);
				arrayPermisos.push(permisos.permisos[i]);
			}
		}
		return arrayPermisos;
	}
	async setRol(rol){
		let query='INSERT INTO rol (nombre) values (?)';
        await qy (query,[rol]);
	}
	async usuariosListado(){
		let queryP1='SELECT usuariointerno.id as id, usuariointerno.nombre as usuario, empleado.apellido as apellido,';
		let queryP2=' empleado.nombre as nombre, rol.nombre as rol, usuariointerno.mail as mail,';
		let queryP3=' usuariointerno.baja as baja FROM usuariointerno,empleado,rol ';
		let queryP4='WHERE usuariointerno.idRol=rol.id and usuariointerno.idEmpleado=empleado.id and usuariointerno.baja is null';
		let query=queryP1+queryP2+queryP3+queryP4;
		let usuarios=await qy(query)
		return usuarios;
	}
	async usuarioGetter(id){
		let queryP1='SELECT usuariointerno.id as id, usuariointerno.nombre as usuario, empleado.apellido as apellido,';
		let queryP2=' empleado.nombre as nombre, rol.nombre as rol, usuariointerno.mail as mail,';
		let queryP3=' usuariointerno.baja as baja FROM usuariointerno,empleado,rol ';
		let queryP4='WHERE usuariointerno.id=? and usuariointerno.idRol=rol.id and usuariointerno.idEmpleado=empleado.id';
		let query=queryP1+queryP2+queryP3+queryP4;
		let usuarios=await qy(query,[id]);
		return usuarios;
	}
	async cuitGetter(cuil){
		let queryP1='SELECT usuariointerno.id as id, usuariointerno.nombre as usuario, empleado.apellido as apellido,';
		let queryP2=' empleado.nombre as nombre, rol.nombre as rol, usuariointerno.mail as mail,';
		let queryP3=' usuariointerno.baja as baja FROM usuariointerno,empleado,rol ';
		let queryP4='WHERE empleado.cuil=? and usuariointerno.idRol=rol.id and usuariointerno.idEmpleado=empleado.id';
		let query=queryP1+queryP2+queryP3+queryP4;
		let usuarios=await qy(query,[cuil]);
		return usuarios;
	}
	async usuarioBorrado(usuario){
		let query = 'UPDATE usuariointerno SET baja=? WHERE nombre = ?';
    	await qy(query, [1, usuario]);
    	return this.findByNombre(usuario);
	}
	async usuarioRehabilitar(usuario){
		let query = 'UPDATE usuariointerno SET baja=? WHERE nombre = ?';
    	await qy(query, [null, usuario]);
    	return this.findByNombre(usuario);
	}
	async usuarioCambioContra(usuario){
		let query = 'UPDATE usuariointerno SET contrasenia=? WHERE nombre = ?';
    	await qy(query, [usuario.contrasenia, usuario.nombre]);
    	return this.findByNombre(usuario.nombre);
	}
}
module.exports=new UserInternoModel();