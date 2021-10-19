const fs=require('fs');
const fetch = require("node-fetch");
/**
 * Funcion asincrona que consultara la api del estado para obtener la informacion de las 
 * localidades argentinas y actualizar el JSON que poseemos en el servidor.
 */
(async()=>{
   try{
    const response = await fetch("https://infra.datos.gob.ar/catalog/modernizacion/dataset/7/distribution/7.5/download/localidades.json");
    const buffer = await response.buffer();
    let localidades=JSON.parse(buffer.toString());
    fs.writeFile(`./localidades.txt`, JSON.stringify(localidades.localidades), () => 
    console.log('se termino el proceso de descarga!'));
   }catch{
       console.log("El proceso de carga a fallado");
   }
    
})()