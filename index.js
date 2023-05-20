/*
let poruke = [
    {
      id: 1,
      sadrzaj: 'HTML je jednostavan',
      vazno: true
    },
    {
      id: 2,
      sadrzaj: 'React koristi JSX sintaksu',
      vazno: false
    },
    {
      id: 3,
      sadrzaj: 'GET i POST su najvaznije metode HTTP protokola',
      vazno: true
    }
  ]*/
  
  const express = require('express')
  const cors = require('cors')
  const app = express()
  const Poruka = require('./models/poruka')
const poruka = require('./models/poruka')
  app.use(express.static('build'))
  app.use(cors())
  app.use(express.json())
  
    
  app.get('/', (req, res) =>{
    res.send('<h1>Pozdrav od Express servera!</h1>')
  })
  
  app.get('/api/poruke', (req, res) =>
{
 Poruka.find({}).then( rezultat =>
{
 res.json(rezultat)
 })
})

  app.get('/api/poruke/:id', (req, res) =>{
    Poruka.findById(req.params.id)
    .then(poruka => {
      if(poruka) {
        res.json(poruka)
      } else{
        res.status(404).end()
      }
    })
    .catch(err => next(err))
  })

  app.delete('/api/poruke/:id', (req, res) => {
    Poruka.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(err => next(err))
  })
  
  app.post('/api/poruke', (req, res, next) => {

    const podatak = req.body
    if(!podatak.sadrzaj){
      return res.status(400).json({
        error: 'Nedostaje sadržaj'
      })
    }
    
    const poruka = {
      sadrzaj: podatak.sadrzaj,
      vazno: podatak.vazno || false,
      datum: new Date(),
    }
    poruka.save().then(spremljenaPoruka => {
      res.json(spremljenaPoruka)
    })
    .catch(err => next(err))
  })

  app.put('/api/poruke/:id', (req, res) => {

    const podatak = req.body
    const id = Number(req.params.id)

    const poruka = {
      sadrzaj: podatak.sadrzaj,
      vazno: podatak.vazno
    }

    Poruka.findByIdAndUpdate(id, poruka, {new: true})
    .then(novaPoruka => {
      res.json(novaPoruka)
    })
    .catch(err => next(err))
  })

  const generirajId = () => {
    const maxId = poruke.length > 0
      ? Math.max(...poruke.map(p => p.id))
      : 0
    return maxId + 1
  }

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Posluzitelj je pokrenut na portu ${PORT}`);
  })