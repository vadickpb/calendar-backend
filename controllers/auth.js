const { response } = require('express');
const Usuario = require('../models/Usuario')

const loginUser = (req, res = response) => {
  const { name, password } = req.body;
  res.status(200).json({
    ok: true,
    name,
    password,
  })
}

const registerUser = async(req, res) => {

  try {
    
  } catch (error) {
    console.log(error); 
    throw new Error('comuniquese con el administrador')
  }
  const { email, name, password } = req.body;

  const usuario = new Usuario(req.body);
  await usuario.save()
  res.status(200).json({
    ok: true,
    email,
    name,
    password
  })
}

const revalidateToken = (req, res) => {
  res.json({
    ok: true,
    msg: "token"
  })
}

module.exports = {
  loginUser,
  registerUser,
  revalidateToken
}