const BASE_SERVER_URL = "https://video-chat-server-zbmb.onrender.com"
//******************    ******************//
new AWN().asyncBlock(
    fetch(`${BASE_SERVER_URL}/start`),
    'Room Joined Successfully',
)

const socket = io(`${BASE_SERVER_URL}`)
const hideA = document.getElementById('hide-audio');
const hideV = document.getElementById('hide-video');
const videoDiv = document.getElementById("videoDiv")
const room = document.getElementById("roomID");


const myPeer = new Peer();

let userStream;

const urlParams = new URLSearchParams(window.location.search);
const roomID = urlParams.get('roomID');

room.innerText = `Welcome to your virtual hangout! Your room ID is ${roomID}`;

const video = document.createElement('video');
video.muted = true;

//To keep track of user connected 
const userConnected = {}


// Asking for video and audio feature
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,

}).then(stream => {

    // Appending the user video to video element
    addStream(video, stream);
    userStream = stream;

    //When Someone call us
    myPeer.on('call', (call) => {

        //--For receiving Calls--

        //answered call and send our current stream
        call.answer(stream)

        //responding and adding the coming videoStream
        const video = document.createElement('video');
        call.on('stream', (userStream) => {
            addStream(video, userStream)
        })
    })

    // user joined the room
    socket.on('user-join', (userID) => {
        connectNewUser(userID, stream)
    })

}).catch(err => {
    console.log(err);
})
//To close the conneciton of disconnected user
socket.on('user-disconnected', (userID) => {
    if (userConnected[userID]) {
        userConnected[userID].close()
    }
})

// When a new client connects
myPeer.on('open', (id) => {
    socket.emit('join-room', roomID, id)
})


const connectNewUser = (userID, stream) => {

    //--Make call when new user connects to our room--

    const call = myPeer.call(userID, stream);
    const video = document.createElement('video');

    call.on('stream', (userStream) => {
        addStream(video, userStream)
    })

    call.on('close', () => {
        video.remove()
        
    })

    //Add to object whenever new user joins
    userConnected[userID] = call
}


// Appending the video to video element
const addStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })

    videoDiv.append(video)

}


//video hide code
hideV.addEventListener("click", () => {
    const videoTrack = userStream.getTracks().find(track => track.kind === 'video');
    if (videoTrack.enabled) {
        videoTrack.enabled = false;
        hideV.style.width = "50px";
        hideV.style.height = "50px";
        hideV.style.cursor = "pointer";
        hideV.style.backgroundColor = "black";
        hideV.style.borderRadius = "100%";
        hideV.style.padding = "8px";
       
    } else {
        videoTrack.enabled = true;
        hideV.style.width = "50px";
        hideV.style.height = "50px";
        hideV.style.cursor = "pointer";
        hideV.style.backgroundColor = "white";
        hideV.style.borderRadius = "100%";
        hideV.style.padding = "8px";
       
    }
})

//disable audio
// Disable audio functionality
hideA.addEventListener("click", () => {
    const audioTrack = userStream.getTracks().find(track => track.kind === 'audio');
    if (audioTrack.enabled) {
        audioTrack.enabled = false;
        hideA.style.width = "50px";
        hideA.style.height = "50px";
        hideA.style.cursor = "pointer";
        hideA.style.backgroundColor = "black";
        hideA.style.borderRadius = "100%";
        hideA.style.padding = "8px";
    } else {
        audioTrack.enabled = true;
        hideA.style.width = "50px";
        hideA.style.height = "50px";
        hideA.style.cursor = "pointer";
        hideA.style.backgroundColor = "white";
        hideA.style.borderRadius = "100%";
        hideA.style.padding = "8px";
    }
});

