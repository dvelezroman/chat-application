import * as io from 'socket.io-client';
const events = require('events');

const apiUrl = `http://192.168.0.98:4000`;

class ChatSocketServer {

    socket = null
    eventEmitter = new events.EventEmitter();

    // Connecting to Socket Server
    establishSocketConnection(userId) {
        try {
            this.socket = io(apiUrl, {
                query: `userId=${userId}`
            });
        } catch (error) {
            alert(`Something went wrong; Can't connect to socket server`);
        }
    }

    getChatList(userId) {
        this.socket.emit('chat-list', {
            userId: userId
        });
        this.socket.on('chat-list-response', (data) => {
            this.eventEmitter.emit('chat-list-response', data);
        });
    }

    sendMessage(message) {
        this.socket.emit('add-message', message);
    }

    receiveMessage() {
        this.socket.on('add-message-response', (data) => {
            this.eventEmitter.emit('add-message-response', data);
        });
    }

    logout(userId) {
        this.socket.emit('logout', userId);
        this.socket.on('logout-response', (data) => {
            this.eventEmitter.emit('logout-response', data);
        });
    }

}

export default new ChatSocketServer()