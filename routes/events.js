/*
  Rutas de eventos: / Eventes
  host /api/
*/
const { Router } = require('express');
const {check} = require('express-validator')
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const validarCampos = require('../middleware/validar-campos');
const {validarJWT} = require('../middleware/validar-jwt')
const router = Router();

//todas tienen que pasar por JWT
router.use(validarJWT);

//read
router.get('/' ,getEvents)

//crear nuevo evento
router.post(
  '/', 
  [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de finalización es obligatoria').custom(isDate),
    validarCampos
  ],
  createEvent
  )

//actualizar evento
router.put('/:id', updateEvent)

//eliminar evento
router.delete('/:id', deleteEvent)


module.exports = router