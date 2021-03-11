// this is front end javascript
const socket = io('http://localhost:8080');
 //we gave the address of our sever
const form = document.getElementById('send-container');   // we select the sendcontainer element of our form

const messageInput = document.getElementById('messageimp'); //the input element  also is selected

const messagecontainer = document.querySelector('.container');  //so here we will put the messages in the container which will be recieved

var audio = new Audio('ting.mp3');
/* we will append him here , we will create a div */
const append = (message, position) => {
    const messageElement = document.createElement('div');
    /* now we created a div so now we */
    messageElement.innerText = message;  /* we set the inner text to be the messahe */
    messageElement.classList.add('message'); 
    messageElement.classList.add(position); 
    messagecontainer.append(messageElement);

    if (position == 'left') {
        audio.play();
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You:${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})



//now when users will join we  will ask them to enter their name
const name1 = prompt("ENter your name to join:");
socket.emit('new-user-joined', name1);
 //this was to show the name of the person who joined the chat

//now we will enter this name in the chat
/* the events which are emiited needs to be heard here*/
socket.on('user-joined', name => {
     
    append(`${name} joined the chat`,'center');

})
socket.on('receive', data => {
     
    append(`${data.name}: ${data.message}`, 'left');

})
socket.on('left', name => {
     
    append(`${name}: left the chat `, 'center');

})


//so we will now append the person name who joined