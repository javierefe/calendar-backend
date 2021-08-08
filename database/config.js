const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('DB online')

    } catch (error) {
        console.log(e)
        throw new('Error a la hora de inicializar base de datos')
    }

}

module.exports = {
    dbConnection
}