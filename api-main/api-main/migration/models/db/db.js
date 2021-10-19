const knex=require('knex');
const knexfile=require('./knexfile');
const{NODE_ENV}=require('../../config/globals');
const db=knex(knexfile[NODE_ENV]);
module.exports={db};