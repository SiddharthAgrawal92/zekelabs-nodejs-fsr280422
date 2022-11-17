import { useState } from 'react';
import { useEffect } from 'react';
import socketClient from 'socket.io-client';
//http://localhost:8080- API Endpoint
//http://localhost:9000 - Socket Endpoint 
let socket = socketClient('http://localhost:9000');

const Chat = () => {
    const [isUserNameSubmitted, setIsUserNameSubmitted] = useState(false);
    const [input, setInput] = useState('');
    const [userName, setUserName] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        appendMessage(`<span id='online'>You: </span> ${input}`);
        socket.emit('send-chat-message', input);
        setInput('');
    }

    const appendMessage = (msg) => {
        let msgContainer = document.getElementById('message-container');
        let newMessageElement = document.createElement('div');
        newMessageElement.innerHTML = msg;
        msgContainer.append(newMessageElement);
    }

    const signUpForChat = () => {
        setUserName('');
        //emit/send event to socket server
        socket.emit('new-user', userName);

        //listener socket events
        socket.on('chat-message', data => {
            appendMessage(`<span id='online'>${data.name}: </span> ${data.msg}`);
        });

        socket.on('new-user-connected', newUser => {
            appendMessage(`<span id='online'>${newUser}</span> is connected at ${new Date().toLocaleString()}!`);
        });

        socket.on('user-disconnected', userName => {
            appendMessage(`<span id='offline'>${userName}</span> is disconnected at ${new Date().toLocaleString()}!`);
        });
    }

    return (
        <>
            <h2>Welcome to our Live Chat-App</h2>
            {
                isUserNameSubmitted ?
                    <>
                        <div id="message-container"></div>
                        <form id="send-container">
                            <input type={'text'} value={input} onChange={(e) => {
                                setInput(e.target.value);
                            }} /> &nbsp; &nbsp; &nbsp;
                            <button id="send-button" type='submit' onClick={onSubmit}>Send</button>
                            &nbsp; &nbsp; &nbsp;
                        </form>
                        <br />
                        <button id="send-button" onClick={() => {
                            socket.disconnect();
                            setIsUserNameSubmitted(false);
                            document.getElementById('message-container').innerHTML = "";
                        }}>Disconnect</button>
                    </>
                    :
                    <>
                        <br />
                        <br />
                        Enter your User-Name
                        <br />
                        <input id="message-input" type={'text'} value={userName} onChange={(e) => {
                            setUserName(e.target.value);
                        }} />&nbsp; &nbsp; &nbsp;
                        <button onClick={() => {
                            if (userName) {
                                setIsUserNameSubmitted(true);
                                signUpForChat();
                            }
                        }}>Sign-up for Chat</button>
                    </>
            }
        </>
    )
}

export default Chat;