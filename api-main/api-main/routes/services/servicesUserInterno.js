const userModel=require('../models/modelsUserInterno');

class UserInterno{
	/**
	 * Llama al create del userModel con el fin de crear un nuevo usuario
	 * @param {Object} user 
	 */
	async createUser(user){
		await userModel.create(user);
	}
	/**
	 * Devuelve el usuario por el cual se consulta
	 * @param {String} nombre nombre de usuario que se consulta
	 * @returns {Array} devuelve un array con la informacion encontrada 
	 */
	async getUser(nombre){
		return userModel.findByNombre(nombre);
	}
	/**
	 * Devuelve el usuario por el cual se consulta
	 * @param {Number} rol id de rol del cual se necesitan saber los permisos
	 * @returns {Array} devuelve un array con la informacion encontrada 
	 */
	async getPermisos(rol){
		const permisos= await userModel.getPermisos(rol);
		return permisos;
	}
	/**
	 * Devuelve el rol de usuario por el cual se consulta
	 * @param {Number} rol id de rol al cual se necesita asignarle permisos
	 * @returns {Array} devuelve un array con la informacion encontrada 
	 */
	 async getRol(rol){
		const rolSolicitado= await userModel.getRol(rol);
		return rolSolicitado;
	}
	/**
	 * Ingresa los permisos correspondientes al usuario dado
	 * @param {JSON} permisos a crear 
	 */
	 async setPermisos(permisos){
		return userModel.setPermisos(permisos);
	}
	/**
	 * Ingresa nuevo rol de usuario
	 * @param {String} rol rol a crear
	 */
	 async setRol(rol){
		return userModel.setRol(rol);
	}
	/**
	 * Se busca realizar un listado generalizado de los usuarios 
	 * registrados.
	 */
	async usuariosListado(){
		return userModel.usuariosListado()
	}
	/**
	 * Devuelve el usuario de id que se pasa por parametro.
	 */
	async usuarioGetter(id){
		return userModel.usuarioGetter(id);
	}
	/**
	 * Devuelve el usuario de cuil que se pasa por parametro.
	 */
	 async cuilGetter(cuil){
		return userModel.cuitGetter(cuil);
	}
	/**
	 * coloca el dato baja en 1.
	 */
	async usuarioBorrado(usuario){
		return userModel.usuarioBorrado(usuario);
	}
	/**
	 * coloca el dato baja en NULL.
	 */
	 async usuarioRehabilitar(usuario){
		return userModel.usuarioRehabilitar(usuario);
	}
	async usuarioCambioContra(usuario){
		return userModel.usuarioCambioContra(usuario);
	}
}
module.exports=new UserInterno;