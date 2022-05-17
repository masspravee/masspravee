const { Socket } = require('engine.io')
const express=require('express')
const app=express()
const http=require('http')
const { connect } = require('http2')
const server=http.createServer(app)

const {Server}=require('socket.io')

const io=new Server(server)
app.use(express.static('src'))
app.get('/',(req,res)=>{
    
    res.sendFile(__dirname+'/index.html')
    app.use(express.static(__dirname+'/src'))

})

io.on('connection',(socket)=>{
    console.log('connected')
    socket.on('chat',data=>{
        socket.broadcast.emit('chat',data)
    })
    socket.on('typing',(e)=>{
        socket.broadcast.emit('typing',e)
    })
})

server.listen(5000)
