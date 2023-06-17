let btn=document.getElementById("submit")
let name=document.getElementById("name")
let email=document.getElementById("email1")
let message=document.getElementById("message")
let time=document.getElementById("time")

btn.addEventListener("click",async(e)=>{
    e.preventDefault()
    try {
       let obj={
        name:name.value,
        email:email.value,
        message:message.value,
        time:time.value
       } 
    //    let res=await fetch("",{
    //     method:"POST",
    //     headers:{
    //         'Content-Type':'application/json'
    //     },
    //     body:JSON.stringify(obj)


    //    })
    //    let data=await res.json()
       window.location='./conform.html'
      
    } catch (error) {
        console.log(error)
    }
})
