const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const shortid = require('shortid')
const dotenv = require('dotenv').config()
var app = express()


const uri = "mongodb+srv://julianoalfredo:<password>@cluster0.dszyxym.mongodb.net/?retryWrites=true&w=majority";
const Schema = mongoose.Schema
const urlSchema = new Schema({
    original_url: String, 
    short_url: String
})
const URL = mongoose.model('URL', urlSchema)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    console.log('Conectado')
    client.close()
});

var port = process.env.PORT || 3000


app.use(bodyParser.urlencoded({
    extended: false
}))
app.use('/public', express.static(`${process.cwd()}/public`));
app.get('/', function (req, res) {
  res.sendFile(`${process.cwd()}/views/index.html`);
});
app.post('/api/shorturl/new', async function(req, res){
    const url_original = req.body.url
    res.send('Uhul')
})

app.use(cors())
app.use(express.json())


app.listen(port, function(){
    console.log('listening...' + port)
})