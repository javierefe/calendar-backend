const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');
// const { validationResult } = require('express-validator');
// const { validationResult } = require('express-validator')

const crearUsuario = async (req, res=response) => {
    
   

    // solo puede haber una respuesta una unica vez
    // if(name.length < 5){
    //     return res.status(400).json({
    //         ok:false,
    //         msg:"El nombre debe de ser de cinco letras"
    //     })
    // }

    //manejo de errores
    // const errors = validationResult(req);
    
    // if(!errors.isEmpty()){
    //     return res.status(400).json({
    //         ok: false,
    //         errors: errors.mapped()
    //     });
    // }

    const {email, password} = req.body;

    try {

        let usuario = await Usuario.findOne({email: email})
        // console.log(usuario)
        if( usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            })
        }
        
        usuario = new Usuario(req.body);

        // encriptar contraseña
        // numero de vueltas por defecto es 10
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        // generar JWT
        const token = await generarJWT(usuario.id, usuario.name)

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador"
        })
    }
    
}

const loginUsuario = async (req, res=response) => {
    const {email, password} = req.body;

    // const errors = validationResult(req);

    // if(!errors.isEmpty()){
    //     return res.status(400).json({
    //         ok: false,
    //         errors: errors.mapped()
    //     });
    // }

    try {
        let usuario = await Usuario.findOne({email: email})
        // console.log(usuario)
        if( !usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            })
        }

        // confirmar los passwords
        // compara el password que se envio con el que esta en la base de datos
        // regresa un tru si es valido y fals eis no lo es
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        // generar json web token
        const token = await generarJWT(usuario.id, usuario.name)

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador"
        })
    }
}

const revalidarToken = async(req, res=response) => {
    
    const uid = req.uid;
    const name = req.name;

    const token = await generarJWT(uid, name)

    res.json({
        ok: true,
        token
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}
