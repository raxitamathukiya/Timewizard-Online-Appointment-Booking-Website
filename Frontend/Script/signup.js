
const url = "https://time-wizard.onrender.com";
//const url = "http://localhost:8080"

let signbtn = document.getElementById("register-button");
signbtn.addEventListener("click", (e) => {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  console.log(name,email,password)
  if(!name || !password || !email){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Fields can't be empty",
    });
  } 
  else if(password.length!=4){
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password should be of 4 digit",
      });
  }

  // Loader Showing
  //showLoader();
  //document.getElementById("register-button").style.visibility = "hidden";
else{
  let signdata = {
    name: name,
    email: email,
    password: password
  }; 
  console.log(signdata) 

  fetch(`${url}/user/register`, {
    method: "POST",
    body: JSON.stringify(signdata),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => { 
      console.log(res)
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      //console.log(res) 
      if (res.msg === "Registration Successfull") {
        Swal.fire(
            'Registration Successfull',
            '',
            'success'
          )
        // Transfer to login page here
        setTimeout(()=>{
          window.location.href ="./login.html";
        },2500)
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.msg,
        });

        //hideLoader();
        //document.getElementById("register-button").style.visibility = "visible";
      } 
    })
    .catch((err) => {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
      //hideLoader();
      //document.getElementById("register-button").style.visibility = "visible";
    }); 
  }
});