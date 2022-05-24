// chat/static/index.js

console.log("Sanity check from index.js.");

// focus 'roomInput' when user opens the page
document.querySelector("#roomInput").focus()

// submit if user presses the enter key
document.querySelector("#roomInput").onkeyup = (e) => {
    if (e.KeyCode === 13) {
        document.querySelector("#roomConnect").click()
    }
}

// redirect to '/room/<roomInput>/'
document.querySelector("#roomSelect").onclick = () => {
    let roomName = document.querySelector("#roomInput").value
    window.location.pathname = `chat/${roomName}/`
}

// redirect to '/room/<roomSelect>/'
document.querySelector("#roomSelect").onchange = () => {
    let roomName = document.querySelector("#roomSelect").value.split(" (")[0];
    window.location.pathname = `chat/${roomName}/`
}