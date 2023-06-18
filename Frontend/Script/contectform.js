let btn=document.querySelector("form")
let name=document.getElementById("name")
let email=document.getElementById("email1")
let chat=document.getElementById("chat")
let message=document.getElementById("message")
let time=document.getElementById("time")

btn.addEventListener("submit",async(e)=>{
    e.preventDefault()
    
      
       try {
        let obj={
            name:name.value,
            email:email.value,
            chat:chat.value,
            message:message.value,
            time:time.value
           } 
    
        let res = await fetch(`http://localhost:8080/contect/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });
    
        let data = await res.json();

        alert(data.message)
        window.location="./calender.html"
      
    }
    catch(error){
        console.log(error)
    }
  
})
