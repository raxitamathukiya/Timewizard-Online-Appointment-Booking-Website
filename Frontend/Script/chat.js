const send = document.getElementById("send");
const chatMessages = document.getElementById("messages");

const room = 12;
console.log(room);
const username = "user"


const socket = io("https://chat-server-w0xc.onrender.com/start", { transports: ["websocket"] });

socket.emit("joinRoom", ({ username, room }));

socket.on("message", (message) => {
    console.log(message)
    outputMessage(message);

})



// Sending message

send.addEventListener("click", () => {

    let msg = document.getElementById('text');

    msg.value = msg.value.trim();

    if (!msg.value) {
        return false;
    }

    socket.emit('chatMessage', msg.value);
    msg.value = "";
    msg.focus();

})

socket.on("roomUsers", ({ room, users }) => {

    roomName.innerText = room;

    outputRoomUsers(users)

})


function outputRoomUsers(users) {

    userList.innerHTML = '';

    users.forEach(user => {
        const div = document.createElement("div");
        div.innerText = user.username;
        userList.appendChild(div);
    });
}

//outPut message

function outputMessage(message) {

    const div = document.createElement("div");
    div.classList.add("message");

    const p = document.createElement("p");

    p.classList.add("meta");

    p.innerText = message.username;

    p.innerHTML += `<span> ${message.time}</span>`;

    div.appendChild(p);

    const para = document.createElement("p");

    para.classList.add("text");
    para.innerText = message.text;

    div.appendChild(para);
    chatMessages.appendChild(div);
}

// Leaving the room

document.getElementById('leave').addEventListener("click", ()=>{
    // socket.emit('leave', ({username, room}))
    window.location.href = "./dashboard.html";
})
  // userLoggedIn();