const { response } = require('express');
const Evento = require('../models/Evento')

const getEvents = async(req, res = response) => {

  try {
    const eventos = await Evento.find()
                                .populate('user', 'name')
    res.json({
      ok: true,
      eventos
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
    
  }

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

const updateEvent = async(req, res) => {

  const eventId = req.params.id
  const evento = await Evento.findById(eventId);
  const uid = req.uid

  try {

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'no se encontro el evento'
      })
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'no está autorizado para actializar este evento'
      })
    }

    const newEvent = {
      ...req.body,
      user: uid
    }

    const eventUpdated = await Evento.findByIdAndUpdate(eventId, newEvent, {new: true})

    res.json({
      ok: true,
      evento: eventUpdated
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}

const deleteEvent =  async(req, res) => {

  const eventId = req.params.id;
  const evento = await Evento.findById(eventId);
  const uid = req.uid

  if (!evento) {
    return res.status(404).json({
      ok: false,
      msg: 'el evento no existe'
    })
  }

  if (evento.user.toString() !== uid){
    return res.status(401).json({
      ok: false,
      msg: 'no esta autorizando para eliminar este evento'
    })
  }

  await Evento.findByIdAndDelete(eventId)

  res.json({
    ok: true
  })
}

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
}