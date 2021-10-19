const qy=require('../../config/conexion');
class DashboardModel{
    async getLegABusuarios(){
        let query='select usuariointerno.nombre as usuario, count(*) as cantidad from usuariointerno, legitimoabono where usuariointerno.id=legitimoabono.idUsuario group by usuariointerno.nombre order by cantidad limit 10';
        let resultado= await qy (query);
        return resultado;
    }
    async getUsuariosCount(){
        let cantusuarios=0;
        let canthabilitados=0;
        let cantinhabilitados=0;
        
        let queryCantUsers='select count(*) as cantidad from usuariointerno';
        let resultadoCantUsers= await qy (queryCantUsers);
        
        if (resultadoCantUsers.length==0){
            return[];
        }else{
            cantusuarios=resultadoCantUsers[0].cantidad;
        }
        
        let queryCantHabilitados='select count(*) as cantidad from usuariointerno where baja is NULL';
        let resultadoCantHabilitados=await qy(queryCantHabilitados);

        if (resultadoCantHabilitados.length!=0){
            canthabilitados=resultadoCantHabilitados[0].cantidad;
        }

        let queryCantInhabilitados='select count(*) as cantidad from usuariointerno where baja=?';
        let resultadoCantInhabilitados=await qy(queryCantInhabilitados,[1]);

        if (resultadoCantInhabilitados.length!=0){
            cantinhabilitados=resultadoCantInhabilitados[0].cantidad;
        }
        return {"cantusuarios":cantusuarios,"canthabilitados":canthabilitados,"cantinhabilitados":cantinhabilitados}
    }
    async getProveedoresCount(){
        let cantproveedores=0;
        let canthabilitados=0;
        let cantinhabilitados=0;
        
        let queryCantProveedores='select count(*) as cantidad from proveedor';
        let resultadoCantProveedores= await qy (queryCantProveedores);
        
        if (resultadoCantProveedores.length==0){
            return[];
        }else{
            cantproveedores=resultadoCantProveedores[0].cantidad;
        }
        
        let queryCantHabilitados='select count(*) as cantidad from proveedor where eliminado is NULL';
        let resultadoCantHabilitados=await qy(queryCantHabilitados);

        if (resultadoCantHabilitados.length!=0){
            canthabilitados=resultadoCantHabilitados[0].cantidad;
        }

        let queryCantInhabilitados='select count(*) as cantidad from proveedor where eliminado=?';
        let resultadoCantInhabilitados=await qy(queryCantInhabilitados,[1]);

        if (resultadoCantInhabilitados.length!=0){
            cantinhabilitados=resultadoCantInhabilitados[0].cantidad;
        }
        return {"cantproveedores":cantproveedores,"canthabilitados":canthabilitados,"cantinhabilitados":cantinhabilitados}

    }
    async getProveedoresCountProv(){
        let queryCantProveedores='select provincia, count(*) as cantidad from proveedor group by provincia  order by provincia';
        let resultadoCantProveedores= await qy (queryCantProveedores);
        
        return resultadoCantProveedores;
    }
    async getLAorganismo(){
        let queryCantxorganismo='select organismo.denominacion as organismo, count(*) as cantidad from legitimoabono, organismo where legitimoabono.idOrganismo=organismo.id group by organismo.denominacion  order by cantidad';
        let resultadoCantxorganismo= await qy (queryCantxorganismo);
        
        return resultadoCantxorganismo;
    }
}
module.exports=new DashboardModel;