/*
  Rutas de usuarios: / Auth
  host /api/auth
*/
const { Router } = require('express');
const router = Router();
const { check } = require('express-validator')
const { loginUser, registerUser, revalidateToken } = require('../controllers/auth');
const validarCampos = require('../middleware/validar-campos');

//login
router.post(
  '/',
  [//middlewares
    check('email', 'debe ingressar un email correcto').isEmail(),
    check('password', 'el campo password debe ser de más de 5 caracteres').isLength({ min: 6 }),
    validarCampos
  ],
  
  loginUser,)
//register
router.post(
  '/new',
  [
    check('email', 'debe ingresar un email correcto').isEmail(),
    check('name', 'el campo nombre obligatorio').not().isEmpty(),
    check('password', 'el campo password debe ser de más de 5 caracteres').isLength({ min: 6 }),
    validarCampos
  ],
  registerUser)
router.get('/renew', revalidateToken)

//revalidar token
router.get('/renew', revalidateToken)

module.exports = router;