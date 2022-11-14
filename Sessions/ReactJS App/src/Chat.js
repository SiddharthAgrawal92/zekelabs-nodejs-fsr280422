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
        appendMessage(`You: ${input}`);
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
        //emit/send event to socket server
        socket.emit('new-user', userName);

        //listener socket events
        socket.on('chat-message', data => {
            appendMessage(`${data.name}: ${data.msg}`);
        });

        socket.on('new-user-connected', newUser => {
            appendMessage(`${newUser} is connected at ${new Date().toLocaleString()}!`);
        });

        socket.on('user-disconnected', userName => {
            appendMessage(`${userName} is disconnected at ${new Date().toLocaleString()}!`);
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
                        </form>
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