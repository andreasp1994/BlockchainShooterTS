"use strict";
var gameConfig_1 = require("./../gameConfig");
var BlockchainFeed = (function () {
    function BlockchainFeed(listener) {
        this.listener = listener;
        this.connect();
    }
    BlockchainFeed.prototype.connect = function () {
        var _this = this;
        this.socket = new WebSocket(gameConfig_1.GameConfig.BITCOIN_BLOCKCHAIN_SOCKET_API_URL);
        this.socket.onopen = function (event) {
            console.log("Blockchain socket connection open!");
            _this.socket.send(gameConfig_1.GameConfig.BITCOIN_BLOCKCHAIN_SOCKET_SUBSCRIBE_TO_TX);
            console.log("Subscribed in TX events!");
            _this.socket.onmessage = function (message) {
                var tx = JSON.parse(message.data);
                _this.listener.onTXCreated(_this.getAmountPaid(tx));
            };
        };
    };
    BlockchainFeed.prototype.getAmountPaid = function (tx) {
        var inTotal = 0;
        for (var _i = 0, _a = tx.x.inputs; _i < _a.length; _i++) {
            var input = _a[_i];
            inTotal += input.prev_out.value;
        }
        var outTotal = 0;
        for (var _b = 0, _c = tx.x.out; _b < _c.length; _b++) {
            var out = _c[_b];
            outTotal += out.value;
        }
        return inTotal - outTotal;
    };
    return BlockchainFeed;
}());
exports.BlockchainFeed = BlockchainFeed;
//# sourceMappingURL=blockchainFeed.js.map