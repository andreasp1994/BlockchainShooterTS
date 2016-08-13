"use strict";
var asteroid_1 = require('./asteroid');
/*
This class is repsonsible for creating asteroids based on the bitcoin blockchain transactions
*/
var AsteroidGenerator = (function () {
    function AsteroidGenerator(game) {
        var _this = this;
        this.divideAsteroid = function (asteroid, bullet) {
            bullet.kill();
            asteroid.kill(); //Maybe I have remove the objecct from group as well?? Performance implications
            //Divide asteroid into 2 smaller pieces
            if (asteroid.size != asteroid_1.Asteroid.ASTEROID_TINY) {
                _this.createAsteroid(asteroid.size - 1, asteroid.x, asteroid.y);
                _this.createAsteroid(asteroid.size - 1, asteroid.x, asteroid.y);
            }
        };
        this._game = game;
        this._group = new Phaser.Group(this._game);
    }
    AsteroidGenerator.prototype.createAsteroid = function (size, x, y) {
        var point = this.getRandomCoordinates();
        var asteroid;
        if (x && y) {
            asteroid = this._game.add.sprite(x, y, AsteroidGenerator.asteroidAssetKey[size]);
        }
        else {
            asteroid = this._game.add.sprite(point.x, point.y, AsteroidGenerator.asteroidAssetKey[size]);
        }
        asteroid.size = size;
        this._game.physics.enable(asteroid, Phaser.Physics.ARCADE);
        asteroid.body.velocity = this.getRandomVelocity();
        asteroid.body.drag.set(40 * size);
        asteroid.body.minVelocity = 40;
        this._group.add(asteroid);
    };
    AsteroidGenerator.prototype.getRandomVelocity = function () {
        var vX = this._game.rnd.integerInRange(AsteroidGenerator.MIN_VELOCITY, AsteroidGenerator.MAX_VELOCITY);
        var vY = this._game.rnd.integerInRange(AsteroidGenerator.MIN_VELOCITY, AsteroidGenerator.MAX_VELOCITY);
        return new Phaser.Point(vX, vY);
    };
    AsteroidGenerator.prototype.getRandomCoordinates = function () {
        return new Phaser.Point(this._game.rnd.integerInRange(0, this._game.width), this._game.rnd.integerInRange(0, this._game.height));
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