const mongoose = require('mongoose');

const dbConnection = async() =>{

  try {
    mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true
    })
    console.log('Conectado a la base de datos');

  } catch (error) {
    console.log(error);
    throw new Error('No se pudo conectar a la base de datos')
  }
}

module.exports = {
  dbConnection
}