require('dotenv').config();
module.exports={
	PORT:process.env.PORT||3000,
	SECRET_WORD:process.env.SECRET_WORD
}