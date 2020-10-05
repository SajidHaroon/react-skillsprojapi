const expresss = require ('express')
const mongoose = require ('mongoose')
const config = require ('./utils/config')
const skillRouter = require('./controllers/SkillController')
//var cors = require('cors')
const app = expresss()
app.use(expresss.json())   // We need this json parser otherwise the post request will not work

//app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', (req,res)=>{
    console.log('hello World')
    res.send('<h1>Hello oooh</h1>')
})

mongoose.connect(config.mongoDB_URI, 
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false})
    .then ( () => console.log('connecting to mongoDB'))
    .catch( err => console.log(err.message))

app.use('/skills', skillRouter)
module.exports = app
