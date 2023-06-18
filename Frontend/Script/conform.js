let who=document.getElementById('who')
let what=document.getElementById('what')
let where=document.getElementById('where')
let whene=document.getElementById('when')
let add=document.getElementById('add')

fetchdata()
async function fetchdata(){
        try {
            let res = await fetch(`https://timewizard-backend.onrender.com/contect/get`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              let data = await res.json();
            
              let res1 = await fetch(`https://timewizard-backend.onrender.com/conform/get`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              let data1 = await res1.json();
              let res2 = await fetch(`https://timewizard-backend.onrender.com/appointment/get`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              let data2 = await res2.json();
              console.log(data,data1,data2)
              display(data,data1,data2)
        } catch (error) {
            console.log(error)
        }
}

function display(data,data1,data2){
    data.forEach(element => {
        what.innerText=`${element.time} Minutes between ${element.name} and ${data1[data1.length-1].name}`
        whene.innerText=`Date: ${data2[data2.length-1].Date } and Time: ${data1[data1.length-1].time}`
        who.innerText= `${element.name}(${element.email})  and ${data1[data1.length-1].name}(${data1[data1.length-1].email})`
        where.innerText=`${element.chat}`
        add.innerText=`${data1[data1.length-1].message}`
    });
}