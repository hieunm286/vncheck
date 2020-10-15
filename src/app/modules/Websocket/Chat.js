import React, { useEffect, useState } from 'react';
import Ws from '@adonisjs/websocket-client';
import styles from './chat.module.css';

const ws = Ws('ws://localhost:3333');

ws.connect();

function Chat(props) {

  const [msg, setMsg] = useState('');
  const [showMsgs, setShowMsgs] = useState(false);

  
  function sendMessage() {
    const subscriber = ws.getSubscription('chat')
    subscriber.emit('message', msg);
  }

  useEffect(() => {

    let subscriber = ws.getSubscription('chat');

    if(!subscriber) {
      subscriber = ws.subscribe('chat');
    }

    subscriber.on('ready', () => {
      subscriber.emit('message', 'hello, websocket')
    })
  
    subscriber.on('error', (error) => {
      console.log(error)
    })
    
    subscriber.on('message', (message) => {
      console.log(message);
    });
  
    subscriber.on('close', () => {
      console.log('bye')
    });

    return function cleanup() {
      subscriber.close();
    }
  }, []);

  return (
    <div className={styles.chatContainer}>
    <div className={styles.chatWrapper}>
        <div className={styles.header}>
          <h2>
            <span>Hello, "username"!</span>
            <span className={styles.connectedUsers}></span>
            <span className={styles.connectionStatus}></span>
          </h2>
        </div>
        <div id="messages" className={styles.messages}>
        </div>
        <div className={styles.inputWrapper}>
          <input
            placeholder="Enter your message here"
            onChange={(e) => setMsg(e.target.value)}
            onKeyUp={(e) => {if(e.key === "Enter") {
              sendMessage();
              e.target.value = '';
            }}}
          >
          </input>
        </div>
      </div>
  </div>
  );
}

export default Chat;