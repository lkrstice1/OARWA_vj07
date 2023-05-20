const mongoose = require('mongoose')

const password = 'atlas'
const dbname = 'poruke-api'
const url = `mongodb+srv://lucijakrsticevic:${password}@cluster0.qpriudf.mongodb.net/${dbname}?retryWrites=true&w=majority`

const porukaSchema = new mongoose.Schema({
    sadrzaj: String,
    datum: Date,
    vazno: Boolean
})

const Poruka = mongoose.model('Poruka', porukaSchema, 'poruke')
