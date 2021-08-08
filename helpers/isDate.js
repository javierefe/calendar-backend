const moment = require('moment')

const isDate = (value, {req, location, path}) => {

    // si esto regresa false este campo no es correcto. expresion validator saldra error
    if(!value){
        return false;
    }

    const fecha = moment(value);

    // isValida es funcion de moment
    if(fecha.isValid()){
        return true;
    }else {
        return false;
    }
    
}


module.exports = {
    isDate
}