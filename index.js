const express = require('express');
const cors = require('cors')
const {dbConnection} = require('./database/config')
require('dotenv').config()


//crear el servidor express
const app = express();

//Base de datos
dbConnection()

//CORS
app.use(cors());

//Directorio público
app.use(express.static('public'))

//lectura y parseo del body
app.use(express.json());

//*rutas
app.use('/api/auth', require('./routes/auth'))



app.listen(process.env.PORT, () => {
  console.log(`servidor corriendo en puerto ${process.env.PORT} `);
})
