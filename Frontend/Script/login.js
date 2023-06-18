const url = "https://time-wizard.onrender.com"; 
//const url="http://localhost:8080"

// login script is  start hare
let login = document.getElementById("login");

login.addEventListener("click", (e) => {
  e.preventDefault();

  let lemail = document.getElementById("lemail").value;
  let lpass = document.getElementById("lpass").value;

  if (!lemail || !lpass) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "E-mail and Password can't be empty",
    });
    return;
  }

  // Loader Showing
  //showLoader();
  //document.getElementById("login").style.visibility = "hidden";

  let signdata = {
    email: lemail,
    password: lpass,
  };


  fetch(`${url}/user/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(signdata),
  })
    .then((res) => res.json())

    .then((res) => {
      console.log(res);
      document.getElementById("lemail").value = "";
      document.getElementById("lpass").value = "";
      if (res.msg === "login successfully") {
        Swal.fire(

          'Login Successfull',
          '',
          'success'
        )
        localStorage.setItem("userDetails", JSON.stringify(res.user));
        localStorage.setItem("token", res.token);
        localStorage.setItem("name", res.name); 
        localStorage.setItem("signedIn",true) 
        setTimeout(()=>{
          window.location.href = "./index.html";
        },2000)
        

      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.msg,
        });

        // hideLoader();
        document.getElementById("login").style.visibility = "visible";
      }

    })//
    .catch((err) => {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
      // hideLoader();
      //document.getElementById("login").style.visibility = "visible";
    });
});

