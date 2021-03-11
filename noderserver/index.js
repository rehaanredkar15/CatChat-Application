//this is the backend of our chat application



const io = require('socket.io')(8080)

const users = {};
//socket.io will listen the incoming events , socket io is an https instance  
//io.on uska ek tukda hai jo connection wala event listen karnewala 
// socket io.on helps us to provide task to the event when it occurs
/*   
    socket is a sever which will receive incoming events
    socket.io will listen to various connections, like rohans connected 
    rehan connected such events will be captured by socket io  and here io is having
    the properties of socket.io , so we will write in io.on the task which must be done 
    when 'connection' happen ,
*/




/* this is v.imp
 io.on  will see the connections who will join us, like rehan joined sakshi joined etc
   and socket.on will handle the activity on a user who has joined 
so now below , when socket.on will see a new user joined event it will give a id  and 
    the name will be stored in the users at that id no , 
    when the user will join , we will broadcast to all the users that our in the chat 
    and it will emit the user who has joined  ,REMEMBER name is the paramter in this events 
    
    ......////......

    now we will work on send event , the message sent by any user should be seen to everyone(emit)
    and we have receive event set for everyone and the objects passed are the message and the usernames
    

*/  
io.on('connection', socket => {
    
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
     })
     
    socket.on('send', message => {
        
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });
    socket.on('disconnect', message => {
        
        socket.broadcast.emit('left', users[socket.id] );
        delete users[socket.id];
    });
})

