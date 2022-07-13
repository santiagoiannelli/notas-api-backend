// modulo de nodejs

// const http = require('http')

// tambien se puede usar el
// import http from 'http'

// ahora utilizando express

// import express from 'express'
const express = require('express')
// import express from 'express';
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
console.log('holaaaaaa')
let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2022-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2022-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2022-05-30T19:20:14.298Z',
    important: true
  }
]

// esto es por http
// // un callback cada vez que le llegue una request
// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/plain' })
//   response.end('Hello World')
// })

// express

app.get('/', (req, res) => {
  res.send('funciona el get')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

// :id es algo dinamico
app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find((note1) => note1.id === id)

  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter((note) => note.id !== id)
  res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const note = req.body
  console.log(note)

  if (!note || !note.content) {
    return res.status(404).json({ error: 'contenido no valido' })
  }

  const ids = notes.map((note1) => note1.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    date: new Date().toISOString(),
    important: typeof note.important !== 'undefined' ? note.important : false
  }

  notes = [...notes, newNote]

  console.log(notes)

  res.json(newNote)
})

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
