
const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

// variable de entorno
// console.log(process.env)


// Crear el servidor de express
const app = express();

// base de datos
dbConnection();

// CORS
// pequeña capa de seguridad
app.use(cors())

// Directorio publico
app.use( express.static('public'))

// Lectura y parseo delk body (middlware)
// las peticiones que vienene en formato json 
// las procesamos y extraenmos su contenido
app.use( express.json());

// Rutas

// todo lo que el requiero exporta lo habilita en la 
// ruta /api/auth
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'))


// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
})