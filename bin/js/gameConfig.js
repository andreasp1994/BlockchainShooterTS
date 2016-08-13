"use strict";
var GameConfig = (function () {
    function GameConfig() {
    }
    GameConfig.BITCOIN_BLOCKCHAIN_SOCKET_API_URL = "wss://ws.blockchain.info/inv";
    GameConfig.BITCOIN_BLOCKCHAIN_SOCKET_SUBSCRIBE_TO_TX = '{"op":"unconfirmed_sub"}';
    GameConfig.SPACECRAFT_INITIAL_HEALTH = 100;
    GameConfig.GAME_WIDTH = 1200;
    GameConfig.GAME_HEIGHT = 800;
    return GameConfig;
}());
exports.GameConfig = GameConfig;
//# sourceMappingURL=gameConfig.js.map