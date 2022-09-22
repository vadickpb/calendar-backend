const { response } = require('express')

const getEvents = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'getEvents'
  })
}

const createEvent = (req, res) => {

  const {title, start, end} = req.body

  console.log({title, start, end});

  res.json({
    ok: true,
    msg: 'crear evento',

  })
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