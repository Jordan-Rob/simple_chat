// chat/static/room.js

console.log("Sanity check from room.js.");

const roomName = JSON.parse(document.getElementById('roomName').textContent);

let chatLog = document.querySelector("#chatLog");
let chatMessageInput = document.querySelector("#chatMessageInput");
let chatMessageSend = document.querySelector("#chatMessageSend");
let onlineUsersSelector = document.querySelector("#onlineUsersSelector");


// adds a new option to 'onlineUsersSelector'
const onlineUsersSelectorAdd = (value) => {
    if (document.querySelector("option[value='" + value + "']")) return;
    let newOption = document.createElement("option");
    newOption.value = value;
    newOption.innerHTML = value;
    onlineUsersSelector.appendChild(newOption)
}

// removes an option from 'onlineUsersSelector'
function onlineUsersSelectorRemove(value) {
    let oldOption = document.querySelector("option[value='" + value + "']");
    if (oldOption !== null) oldOption.remove();
}


// focus 'chatMessageInput' when user opens the page
chatMessageInput.focus();

// submit if the user presses the enter key
chatMessageInput.onkeyup = function(e) {
    if (e.keyCode === 13) {  // enter key
        chatMessageSend.click();
    }
};

// clear the 'chatMessageInput' and forward the message
chatMessageSend.onclick = function() {
    if (chatMessageInput.value.length === 0) return;
    chatSocket.send(JSON.stringify({
        "message": chatMessageInput.value,
    }))
    chatMessageInput.value = "";
};

// Intergrate websocket


let chatSocket = null

const connect = () => {
    chatSocket = new WebSocket(`ws://${window.location.host}/ws/chat/${roomName}/`)

    chatSocket.onopen = (e) => {
        console.log("Successfully connected to the WebSocket")
    }

    chatSocket.onclose = (e) => {
        console.log("WebSocket connection closed unexpectedly. Trying to reconnect in 2s...")
        setTimeout(() => {
            console.log("Reconnecting...")
            connect()
        }, 2000)
    }

    chatSocket.onmessage = (e) => {
        const data = JSON.parse(e.data)
        console.lof(data)

        switch(data.type){
            case "chat_message":
                chatLog.value += data.message + "\n"
                break
            default:
                console.error("Unknown message type!")
                break
        }

        // scroll 'chatLog' to the bottom 
        chatLog.scrollTop = chatLog.scrollHeight
    }

    chatSocket.onerror = (error) => {
        console.log(`WebSocket encountered an error: ${error.message}`  )
        console.log("closing the socket.")
        chatSocket.close()
    }

}

connect()