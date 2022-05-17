var socket=io()

const chatbox=document.getElementById('chat-box')
const name=prompt("Enter Your Name:")

socket.emit('name',name)
document.getElementById('sub').addEventListener('click',sendof)

function sendof(){
    var msg=document.getElementById('ins')
    if(msg.value){
      
        render('my',msg.value)
       detail=Array()
       detail[0]=name
       detail[1]=msg.value
       socket.emit('chat',detail)
        msg.value=''
        typing('online')
      
      
    }
}

socket.on('chat',arr=>{
    render(arr[0],arr[1])
})

function render(uname,data){
    if(uname=='my'){
     
        
        const fir=document.createElement('div')
        fir.classList.add('chat-r')
      
        fir.innerHTML=`<div class="sp"></div>
        
        <div class="mess mess-r">
           <p>${data}</p>
           <span>${times()}</span>
        </div>
        </div>`
        chatbox.appendChild(fir)
        chatbox.scrollTop=chatbox.scrollHeight -chatbox.clientHeight
 
      }
    else{
      
        const sec=document.createElement('div')
        sec.classList.add('chat-l')
        sec.innerHTML=`<div class="chat-l">
        <div class="mess">
        <span class="user">${uname}</span>
            <p>${data}</p>
            <span>${times()}</span></div></div>`
            chatbox.appendChild(sec)
           chatbox.scrollTop=chatbox.scrollHeight -chatbox.clientHeight
          
      
        }



  
}
store=Array()

function times(){
	var mass=new Date()
	var hour=mass.getHours()
	var mint=mass.getMinutes()
//	console.log (hour,'.',mint)
	if(hour<=12){
    if(mint<10){
      return (`${hour}:0${mint} AM`)
    }else{
		return (`${hour}:${mint} AM`)
	}}
  
	else{
    if(mint<10){
      return (`${hour-12}:0${mint} PM`)
    }else{
		return (`${hour-12}:${mint} AM`)
	}	}
	
}
var len=0


function typing(stat){
    const online =document.getElementById('online')
   online.innerText=`${stat}`
  }


  document.getElementById('ins').addEventListener('keypress',(e)=>{
   // console.log(e)
    store.push(e)
     len=store.length
   // console.log(len)
    socket.emit('typing','typing...')
   
   
    setInterval(()=>{
      if(len==store.length){
        typing('online')
      }
    },100)
   
  })

  socket.on('typing',(e)=>{
    typing(e)
  })
  
