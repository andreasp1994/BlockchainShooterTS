"use strict";
var gameConfig_1 = require('./gameConfig');
var asteroid_1 = require('./asteroid');
/*
This class is repsonsible for creating asteroids based on the bitcoin blockchain transactions
*/
var AsteroidGenerator = (function () {
    function AsteroidGenerator(game) {
        var _this = this;
        this.divideAsteroid = function (asteroid, bullet) {
            bullet.kill();
            asteroid.kill();
            //Divide asteroid into 2 smaller pieces
            if (asteroid.size != asteroid_1.Asteroid.ASTEROID_TINY) {
                var one_half = _this._game.add.sprite(asteroid.x, asteroid.y, AsteroidGenerator.asteroidAssetKey[asteroid.size - 1]);
                var other_half = _this._game.add.sprite(asteroid.x, asteroid.y, AsteroidGenerator.asteroidAssetKey[asteroid.size - 1]);
                _this._game.physics.enable(one_half, Phaser.Physics.ARCADE);
                _this._game.physics.enable(other_half, Phaser.Physics.ARCADE);
                one_half.body.velocity = _this.getRandomVelocity();
                other_half.body.velocity = _this.getRandomVelocity();
                _this._group.add(one_half);
                _this._group.add(other_half);
            }
        };
        this._game = game;
        this._group = new Phaser.Group(this._game);
    }
    AsteroidGenerator.prototype.connect = function () {
        var _this = this;
        this._socket = new WebSocket(gameConfig_1.GameConfig.BITCOIN_BLOCKCHAIN_SOCKET_API_URL);
        this._socket.onopen = function (event) {
            _this._socket.send(gameConfig_1.GameConfig.BITCOIN_BLOCKCHAIN_SOCKET_SUBSCRIBE_TO_TX);
            _this._socket.onmessage = function (message) {
                console.log(message);
            };
        };
    };
    AsteroidGenerator.prototype.createAsteroid = function (size) {
        var asteroid = this._game.add.sprite(300, 300, AsteroidGenerator.asteroidAssetKey[size]);
        ;
        asteroid.size = size;
        this._game.physics.enable(asteroid, Phaser.Physics.ARCADE);
        asteroid.body.velocity = this.getRandomVelocity();
        console.log(asteroid.body.velocity);
        this._group.add(asteroid);
    };
    AsteroidGenerator.prototype.getRandomVelocity = function () {
        var vX = this._game.rnd.integerInRange(AsteroidGenerator.MIN_VELOCITY, AsteroidGenerator.MAX_VELOCITY);
        var vY = this._game.rnd.integerInRange(AsteroidGenerator.MIN_VELOCITY, AsteroidGenerator.MAX_VELOCITY);
        return new Phaser.Point(vX, vY);
    };
    Object.defineProperty(AsteroidGenerator.prototype, "group", {
        get: function () {
            return this._group;
        },
        enumerable: true,
        configurable: true
    });
    AsteroidGenerator.MAX_VELOCITY = 200;
    AsteroidGenerator.MIN_VELOCITY = -AsteroidGenerator.MAX_VELOCITY;
    AsteroidGenerator.asteroidAssetKey = ["ast_tiny", "ast_small", "ast_medium", "ast_large"];
    return AsteroidGenerator;
}());
exports.AsteroidGenerator = AsteroidGenerator;
//# sourceMappingURL=asteroidGenerator.js.map