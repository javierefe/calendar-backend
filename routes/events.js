/*
Event Route
/api/events
*/


const {Router} = require('express');
const { check } = require('express-validator');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

// todos los que estan abajo de esta linea tienen que validadr su token,
// es decir con esto me permite borrar validadJWT de los demas
// router.use(validarJWT);

// caulquier peticion que estye debajo de esto va a tebner qu tener su token
router.use(validarJWT);



// todas tienn que pasar por la validacion del JWT
// Obtener eventos
router.get('/', getEventos);


// crear un nuevo evento
router.post(
    '/',
    [
        // express validatopr no tiene para validar fechas, para
        // eso usamos la validadcion personalziada
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ], 
    crearEvento)


//actualizar evento
router.put('/:id', actualizarEvento)


// borrar evento
router.delete('/:id', eliminarEvento)


module.exports = router;