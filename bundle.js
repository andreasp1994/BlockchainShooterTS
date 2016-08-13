/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var btcTXShooterGame_1 = __webpack_require__(5);
	window.onload = function () {
	    var game = new btcTXShooterGame_1.BtcTXShooterGame();
	};
	/*
	TODO:
	+ fix astereoid spawning/division point
	+ Somehow control intensive spawning behaviour
	+ fix some collision and world wrpaping issues
	+ enchance TX visualisation with colors
	+ link TX inputs and outputs somehow in visualisation, not just amount
	*/ 


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var asteroid_1 = __webpack_require__(3);
	var gameConfig_1 = __webpack_require__(2);
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
	        asteroid.body.drag.set(20 * size);
	        asteroid.body.minVelocity = 40; // Need fix
	        this._group.add(asteroid);
	    };
	    AsteroidGenerator.prototype.getRandomVelocity = function () {
	        var vX = this._game.rnd.integerInRange(AsteroidGenerator.MIN_VELOCITY, AsteroidGenerator.MAX_VELOCITY);
	        var vY = this._game.rnd.integerInRange(AsteroidGenerator.MIN_VELOCITY, AsteroidGenerator.MAX_VELOCITY);
	        return new Phaser.Point(vX, vY);
	    };
	    AsteroidGenerator.prototype.getRandomCoordinates = function () {
	        return new Phaser.Point(this._game.rnd.integerInRange(0, gameConfig_1.GameConfig.WORLD_WIDTH), this._game.rnd.integerInRange(0, gameConfig_1.GameConfig.WORLD_HEIGHT));
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var GameConfig = (function () {
	    function GameConfig() {
	    }
	    GameConfig.BITCOIN_BLOCKCHAIN_SOCKET_API_URL = "wss://ws.blockchain.info/inv";
	    GameConfig.BITCOIN_BLOCKCHAIN_SOCKET_SUBSCRIBE_TO_TX = '{"op":"unconfirmed_sub"}';
	    GameConfig.SPACECRAFT_INITIAL_HEALTH = 100;
	    GameConfig.GAME_WIDTH = 1200;
	    GameConfig.GAME_HEIGHT = 800;
	    GameConfig.WORLD_WIDTH = 4000;
	    GameConfig.WORLD_HEIGHT = 4000;
	    return GameConfig;
	}());
	exports.GameConfig = GameConfig;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Asteroid = (function (_super) {
	    __extends(Asteroid, _super);
	    function Asteroid() {
	        _super.apply(this, arguments);
	    }
	    Object.defineProperty(Asteroid.prototype, "size", {
	        get: function () {
	            return this._size;
	        },
	        set: function (s) {
	            this._size = s;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Asteroid.ASTEROID_TINY = 0;
	    Asteroid.ASTEROID_SMALL = 1;
	    Asteroid.ASTEROID_MEDIUM = 2;
	    Asteroid.ASTEROID_LARGE = 3;
	    return Asteroid;
	}(Phaser.Sprite));
	exports.Asteroid = Asteroid;


/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var asteroidGenerator_1 = __webpack_require__(1);
	var asteroid_1 = __webpack_require__(3);
	var gameConfig_1 = __webpack_require__(2);
	var blockchainFeed_1 = __webpack_require__(6);
	var BtcTXShooterGame = (function () {
	    function BtcTXShooterGame() {
	        this.game = new Phaser.Game(gameConfig_1.GameConfig.GAME_WIDTH, gameConfig_1.GameConfig.GAME_HEIGHT, Phaser.AUTO, 'content', {
	            create: this.create,
	            preload: this.preload,
	            update: this.update,
	            render: this.render,
	            onTXCreated: this.onTXCreated // Have to register the method in game state
	        });
	    }
	    BtcTXShooterGame.prototype.preload = function () {
	        //Socket TX feed
	        this.blockchainTXFeed = new blockchainFeed_1.BlockchainFeed(this);
	        //Graphic assets
	        this.game.load.image("spacecraft", "assets/ShipB.png");
	        this.game.load.image("bullet", "assets/BulletB.png");
	        this.game.load.image("space", "assets/space.jpg");
	        this.game.load.image("ast_tiny", "assets/AstDebB.png");
	        this.game.load.image("ast_small", "assets/AstSmllB.png");
	        this.game.load.image("ast_medium", "assets/AstMedB.png");
	        this.game.load.image("ast_large", "assets/AstLargeB.png");
	    };
	    BtcTXShooterGame.prototype.create = function () {
	        this.game.world.setBounds(0, 0, gameConfig_1.GameConfig.WORLD_WIDTH, gameConfig_1.GameConfig.WORLD_HEIGHT);
	        this.game.physics.startSystem(Phaser.Physics.ARCADE);
	        this.game.add.tileSprite(0, 0, gameConfig_1.GameConfig.WORLD_WIDTH, gameConfig_1.GameConfig.WORLD_HEIGHT, "space");
	        this.asteroidGenerator = new asteroidGenerator_1.AsteroidGenerator(this.game);
	        this.asteroidGenerator.createAsteroid(asteroid_1.Asteroid.ASTEROID_SMALL);
	        var image = this.game.cache.getImage("spacecraft");
	        this.spacecraftSpite = this.game.add.sprite(this.game.width / 2 - image.width / 2, this.game.height / 2 - image.height / 2, "spacecraft");
	        this.game.physics.enable(this.spacecraftSpite, Phaser.Physics.ARCADE);
	        this.spacecraftSpite.body.drag.set(200);
	        this.spacecraftSpite.body.maxVelocity.set(400);
	        this.spacecraftSpite.scale.setTo(0.3, 0.3);
	        this.spacecraftSpite.anchor.setTo(0.5, 0.5);
	        this.spacecraftSpite.health = gameConfig_1.GameConfig.SPACECRAFT_INITIAL_HEALTH;
	        this.game.camera.follow(this.spacecraftSpite);
	        //  Creates 50 bullets, using the 'bullet' graphic
	        this.weapon = this.game.add.weapon(50, 'bullet');
	        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	        this.weapon.bulletSpeed = 800;
	        this.weapon.fireRate = 100;
	        this.weapon.trackSprite(this.spacecraftSpite, 0, 0, true);
	    };
	    BtcTXShooterGame.prototype.update = function () {
	        this.spacecraftSpite.body.angularVelocity = 0;
	        //Movement
	        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
	            this.spacecraftSpite.body.angularVelocity = -200;
	        }
	        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
	            this.spacecraftSpite.body.angularVelocity = 200;
	        }
	        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
	            this.game.physics.arcade.accelerationFromRotation(this.spacecraftSpite.rotation, 300, this.spacecraftSpite.body.acceleration);
	        }
	        else {
	            this.spacecraftSpite.body.acceleration.set(0);
	        }
	        //Firing
	        if (this.game.input.activePointer.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
	            this.weapon.fire(this.spacecraftSpite);
	        }
	        //Wrap world around sprites
	        this.game.world.wrap(this.spacecraftSpite, 0, true);
	        this.asteroidGenerator.group.forEach(this.game.world.wrap, this.game.world, true, 0, true);
	        //Bullets with asteroids collision
	        this.game.physics.arcade.collide(this.asteroidGenerator.group, this.weapon.bullets, this.asteroidGenerator.divideAsteroid, null, this);
	        //Spacecraft with asteroid collision
	        this.game.physics.arcade.collide(this.spacecraftSpite, this.asteroidGenerator.group, null, this.damageSpacecraft, this);
	        //Asteroids with asteroids collision
	        this.game.physics.arcade.collide(this.asteroidGenerator.group);
	    };
	    BtcTXShooterGame.prototype.render = function () {
	        this.game.debug.spriteInfo(this.spacecraftSpite, 32, 650);
	    };
	    BtcTXShooterGame.prototype.damageSpacecraft = function (spacecraft, asteroid) {
	        spacecraft.health -= 5 * asteroid.size;
	        return true;
	    };
	    BtcTXShooterGame.prototype.onTXCreated = function (satoshiAmount) {
	        if (satoshiAmount < 10000) {
	            this.asteroidGenerator.createAsteroid(asteroid_1.Asteroid.ASTEROID_TINY);
	        }
	        else if (satoshiAmount < 50000) {
	            this.asteroidGenerator.createAsteroid(asteroid_1.Asteroid.ASTEROID_SMALL);
	        }
	        else if (satoshiAmount < 100000) {
	            this.asteroidGenerator.createAsteroid(asteroid_1.Asteroid.ASTEROID_MEDIUM);
	        }
	        else {
	            this.asteroidGenerator.createAsteroid(asteroid_1.Asteroid.ASTEROID_LARGE);
	        }
	    };
	    return BtcTXShooterGame;
	}());
	exports.BtcTXShooterGame = BtcTXShooterGame;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var gameConfig_1 = __webpack_require__(2);
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


/***/ }
/******/ ]);