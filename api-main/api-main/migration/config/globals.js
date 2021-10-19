require('dotenv').config()

module.exports={
	PORT:process.env.PORT||8080,
	NODE_ENV: process.env.NODE_ENV,
	CONT_SUPER:process.env.CONT_SUPER
}