const model= require ('../models/modelsDashboard');

class Dashboard{
    async getLegABusuarios(){
        return model.getLegABusuarios();
    }
    async getUsuariosCount(){
        return model.getUsuariosCount();
    }
    async getProveedoresCount(){
        return model.getProveedoresCount();
    }
    async getProveedoresCountProv(){
        return model.getProveedoresCountProv();
    }
    async getLAorganismo(){
        return model.getLAorganismo();
    }

}
module.exports=new Dashboard;

