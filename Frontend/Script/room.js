const joinRoom = document.getElementById("join-room")
const create = document.getElementById("create-room")
const title = document.getElementById("title")
const BASE_SERVER_URL = "https://video-chat-server-zbmb.onrender.com"

const urlParams = new URLSearchParams(window.location.search)
const type = urlParams.get("type"); //remove later 

if (type == "message") {
    title.innerText = `Real Talk Chat Platform`
} else if (type == "videochat") {
    title.innerText = `Real Talk Video Chat Platform`
} else {
    title.innerText = `Real Talk Meeting Platform`
}

create.addEventListener("click", () => {

    fetching()
    async function fetching() {

        try {
            const room = Math.floor(Math.random() * 900) + 100
            const request = await fetch(`${BASE_SERVER_URL}/room/create`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ roomID: room, type: type })
            })
            const res = await request.json() //ok:true
            if (res.ok) {
                if (type == "message") {
                    window.location.href = `./chat.html?type=${type}&roomID=${room}`
                } else if (type == "videochat") {
                    window.location.href = `./videochat.html?type=${type}&roomID=${room}`
                }

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Something Went Wrong`,
                })
            }


        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Something Went Wrong`,
            })
            console.log(error);
        }
    }
})
joinRoom.addEventListener("click", () => {
    Swal.fire({
        title: 'Enter Your Room Number',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off',
          placeholder: 'XXX',
          required: true,
          id: 'roomID',
          typeof: 'number'
        },
        showCancelButton: true,
        confirmButtonText: 'Join',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return new Promise((resolve) => {
           
            // Validate or process user input here
            resolve();
          });
        },
        allowOutsideClick: () => !Swal.isLoading()
      });
      
    document.getElementsByClassName('swal2-confirm swal2-styled')[0].addEventListener("click", async () => {
        const roomID = document.getElementById('roomID').value;
        try {
            const request = await fetch(`${BASE_SERVER_URL}/room/join`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ roomID: roomID, type: type })
            });
            const response = await request.json();
            if (response.ok) {
                if (type == "message") {
                    window.location.href = `./chat.html?type=${type}&roomID=${roomID}`;

                } else if (type == "videochat") {

                    window.location.href = `./videochat.html?type=${type}&roomID=${roomID}`;
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${response.msg}`,
                })
            }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            })
        }
    })
})