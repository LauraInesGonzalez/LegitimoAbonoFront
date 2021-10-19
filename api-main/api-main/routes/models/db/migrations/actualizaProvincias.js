const fs=require('fs');
const fetch = require("node-fetch");
/**
 * Funcion asincrona que consultara la api del estado para obtener la informacion de las 
 * provincias argentinas y actualizar el JSON que poseemos en el servidor.
 */
(async()=>{
    try{
        const response = await fetch("https://apis.datos.gob.ar/georef/api/provincias");
        const buffer = await response.buffer();
        let prov=JSON.parse(buffer.toString());
        fs.writeFile(`./provincias.txt`, JSON.stringify(prov.provincias), () => 
        console.log('se termino el proceso de descarga!'));
    }catch{
        console.log("El proceso de carga a fallado");
    }
})()