
class Localidad{
    fs=require('fs');

    constructor(nombreArchivo){
        this.nombreArchivo=nombreArchivo;
    }
    async leer() {
        try {
            const contenido= await this.fs.promises.readFile(this.nombreArchivo,'utf-8');
            return JSON.parse(contenido);
        } catch{ 
            return [];
        }
    }
    async buscar (id){
        const contenido=await this.leer();
        if (contenido.length==0){
            return [];
        }
        let i=0;
        let encontrado=0;
        while (i<contenido.length && encontrado==0){
            if (contenido[i].id==id){
                encontrado=1;
            }else{
                i++;
            }
        }
        if (encontrado==1){
            return contenido[i];
        }else{
            return [];
        }
    }
    async buscarNombre (nombre){
        const contenido=await this.leer();
        if (contenido.length==0){
            return [];
        }
        let i=0;
        let encontrado=0;
        while (i<contenido.length && encontrado==0){
            if (contenido[i].nombre==nombre.toUpperCase()){
                encontrado=1;
            }else{
                i++;
            }
        }
        if (encontrado==1){
            return contenido[i];
        }else{
            return [];
        }
    }
    
}

module.exports=new Localidad('localidades.txt');
