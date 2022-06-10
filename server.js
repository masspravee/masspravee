const { Socket } = require('engine.io')
const express=require('express')
const app=express()
const http=require('http')
const { connect } = require('http2')
const mysql= require('mysql')
const port =process.env.PORT || 5000 
const server=http.createServer(app)
const {Server}=require('socket.io')
const io=new Server(server)

app.use(express.static('src'))
app.get('/',(req,res)=>{
    
    res.sendFile(__dirname+'/index.html')
    app.use(express.static(__dirname+'/src'))

})

const database=mysql.createConnection({
    host: '192.168.43.101',
    user: 'massedits',
    password: '12345678',
    database:'mass'

})

io.on('connection',(socket)=>{
    console.log('connected')
    socket.on('chat',data=>{
        socket.broadcast.emit('chat',data)
       
        database.query(`INSERT INTO MESSAGES VALUES(null,'${data[0]}','${data[1]}','${data[2]}')`)
    })
    socket.on('typing',(e)=>{
        socket.broadcast.emit('typing',e)
    })
    socket.on('user',(s)=>{
        socket.broadcast.emit('user',s)
    })
})

server.listen(port)
