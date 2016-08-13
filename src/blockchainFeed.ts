import { OnTXCreatedListener } from "./onTXCreatedListener"
import { GameConfig } from "./gameConfig"
import { BitcoinTX } from "./bitcoinTX"

export class BlockchainFeed {
    private listener : OnTXCreatedListener;
    private socket : WebSocket;

    constructor(listener : OnTXCreatedListener){
        this.listener = listener;
        this.connect();
    }

    private connect() : void{
        this.socket = new WebSocket(GameConfig.BITCOIN_BLOCKCHAIN_SOCKET_API_URL);
        this.socket.onopen = (event)=> {
            console.log("Blockchain socket connection open!")
            this.socket.send(GameConfig.BITCOIN_BLOCKCHAIN_SOCKET_SUBSCRIBE_TO_TX);
            console.log("Subscribed in TX events!")
            this.socket.onmessage = (message : MessageEvent) => {
                let tx : BitcoinTX = JSON.parse(message.data);
                this.listener.onTXCreated(this.getAmountPaid(tx));
            }
        }
    }

    private getAmountPaid(tx : BitcoinTX) : number {
        var inTotal : number = 0;
        for ( var input of tx.x.inputs) {
            inTotal += input.prev_out.value;
        }
        var outTotal : number = 0;
        for (var out of tx.x.out) {
            outTotal += out.value;
        }
        return inTotal - outTotal;
    }



}