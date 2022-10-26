const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const shortid = require('shortid')
const dotenv = require('dotenv').config()
var app = express()


const uri = 'mongodb+srv://julianoalfredo:jujuba09@cluster0.dszyxym.mongodb.net/?retryWrites=true&w=majority'

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


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
    const uid = shortid.generate()
  
    
     client.connect( async err =>{
        if (err) throw err
        await client.db('url-db').collection('url-config').insertOne({
          "url": `${url_original}`,
          "short_id": `${uid}`,
        })
      
    })
    res.send(url_original + ' ' + uid)
})
app.get("/api/shorturl/:shorturl", async function(req, res){
    client.connect(async err =>{
        if(err) throw err
        await client.db("url-db").collection("url-config").find({}).toArray(async function(err, result){
            if(err) throw err;
            result.forEach((obj) =>{
                if(obj.short_id == req.params.shorturl){
                    res.redirect(obj.url)
                } else{
                    console.log("PASSED")
                }
            })
        })
    })
})
app.post("/api/shorturl", async function(req, res){
    await client.db("url-db").collection("url-config").find({}).toArray(async function(err, result){
        if(err) throw err;
        res.send(result)
    })
})

app.use(cors())
app.use(express.json())


app.listen(port, function(){
    console.log('listening...' + port)
})