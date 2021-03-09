const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')

const app = express()

app.use(cors())

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))


if(process.env.NODE_ENV === 'production'){
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res)=>{
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000

async function start(){
  try{
      await mongoose.connect(process.env.MONGO_URL,{
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true
      })
      app.listen(5000, ()=> console.log(`app started on PORT... ${PORT}`))

  }catch (e){
      console.log('Server Error', e.message)
      process.exit(1)
  }
}

start()
