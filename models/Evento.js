const {Schema, model} = require('mongoose');

// schema es la info que guardare en la BD

const EventoSchema = Schema({
    
    title: {
        type: String,
        required: true,
    },

    notes: {
        type: String,
    },

    start: {
        type: Date,
        required: true
    },

    end: {
        type: Date,
        required: true
    },

    // quien grabo este registro, hace una referencia a usaario
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

//sobreescribir como queremos que el serialziador ToJson funcione
EventoSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Evento', EventoSchema)