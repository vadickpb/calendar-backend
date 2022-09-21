const { response } = require('express');
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const {generateJWT} = require('../helpers/jwt')

const registerUser = async (req, res) => {

  const { email, password } = req.body;
  try {
    //validar email
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "ya existe un usuario con ese correo"
      })
    }

    //instanciar usuario 
    usuario = new Usuario(req.body);

    //encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt)

    //guardar en DB
    await usuario.save()

    //generar JWT
    const token = await generateJWT(usuario.id, usuario.name)

    res.status(200).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }

}

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //validar email
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "No se encuentra un usuario con ese correo"
      })
    }

    //confirmar las contraseñas
    const validPassword = bcrypt.compareSync(password, usuario.password)

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'password inorrecto'
      })
    }

    //generar JWT
    const token = await generateJWT(usuario.id, usuario.name);


    res.status(200).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token

    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
}


const revalidateToken = async(req, res) => {

  const uid = req.uid;
  const name = req.name;

  //generar un nuevo JWT y retornarnlo en la res
  const token = await generateJWT(uid, name)

  res.json({
    ok: true,
    token
  })
}

module.exports = {
  loginUser,
  registerUser,
  revalidateToken
}