let btn=document.querySelector("form")
let name=document.getElementById("name")
let email=document.getElementById("email1")
let message=document.getElementById("message")
let time=document.getElementById("time")

btn.addEventListener("submit",async(e)=>{
    e.preventDefault()
    try {
       let obj={
        name:name.value,
        email:email.value,
        message:message.value,
        time:time.value
       } 
       let res=await fetch("https://timewizard-backend.onrender.com/conform/add",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(obj)


       })
       let data=await res.json()
       alert(data.message)
       window.location='./conform.html'
      
    } catch (error) {
        console.log(error)
    }
})
