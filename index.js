const express = require('express');
const {dbConnection} = require('./database/config')
require('dotenv').config()


//crear el servidor express
const app = express();

//todo Base de datos
dbConnection()

//Directorio público
app.use(express.static('public'))

//lectura y parseo del body
app.use(express.json());

//*rutas
app.use('/api/auth', require('./routes/auth'))



app.listen(process.env.PORT, () => {
  console.log(`servidor corriendo en puerto ${process.env.PORT} `);
})
