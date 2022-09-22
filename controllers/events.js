const { response } = require('express');
const Evento = require('../models/Evento')

const getEvents = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'getEvents'
  })
}

const createEvent = async (req, res) => {
  const evento = new Evento(req.body);

  try {
    evento.user = req.uid
    const eventoGuardado = await evento.save()

    res.json({
      ok: true,
      evento: eventoGuardado
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }

}

const updateEvent = (req, res) => {
  res.json({
    ok: true,
    msg: 'actualizar evento'
  })
}

const deleteEvent = (req, res) => {
  res.json({
    ok: true,
    msg: 'borrar evento'
  })
}

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
}