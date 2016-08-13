export class GameConfig {

    public static BITCOIN_BLOCKCHAIN_SOCKET_API_URL : string = "wss://ws.blockchain.info/inv";
    public static BITCOIN_BLOCKCHAIN_SOCKET_SUBSCRIBE_TO_TX : string = '{"op":"unconfirmed_sub"}';

    public static SPACECRAFT_INITIAL_HEALTH : number = 100;

    public static GAME_WIDTH : number = window.innerWidth;
    public static GAME_HEIGHT : number = window.innerHeight - 54;

    public static WORLD_WIDTH : number = 5000;
    public static WORLD_HEIGHT : number = 5000;
}