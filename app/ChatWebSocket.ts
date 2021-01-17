import { baseSocketUrl } from "./baseApiUrl";
import EventBus from "./EventBus";
import { GLOBAL_EVENTS } from "./GlobalEvents";

type MessageType = {
    content:string,
    type:string
}

export default class ChatWebSocket {
    protected socket:WebSocket;
    protected eventBus:EventBus;
    protected userId:number;
    protected chatId:number;
    protected token:string;

    constructor(userId:number,chatId:number,token:string) {
        this.userId = userId;
        this.chatId = chatId;
        this.token = token;
        this.socket = new WebSocket(`${baseSocketUrl}/${userId}/${chatId}/${token}`);
        this.eventBus = new EventBus();
        this.openSocket();
        this.closeSocket();
        this.getNewMessage();
    }

    protected openSocket() {
        this.socket.addEventListener('open',()=>{
            this.getOldMessages(0);
        })
    }

    public reOpenSocket() {
        this.socket = new WebSocket(`${baseSocketUrl}/${this.userId}/${this.chatId}/${this.token}`);
    }

    public getOldMessages(count:number) {
        this.socket.send(JSON.stringify({
            content: String(count),
            type: 'get old',
        }))
    }

    public sendMessage(data:MessageType) {
        this.socket.send(JSON.stringify(data));
    }

    protected closeSocket() {
        this.socket.addEventListener('close', event => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
                this.reOpenSocket();
            }
            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });
    }

    protected getNewMessage() {
        this.socket.addEventListener('message', event => {
            this.eventBus.emit(GLOBAL_EVENTS.NEW_MESSAGE,JSON.parse(event.data));
        });
    }
}