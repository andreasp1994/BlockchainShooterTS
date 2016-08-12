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
	var asteroidGenerator_1 = __webpack_require__(1);
	var asteroid_1 = __webpack_require__(3);
	var gameConfig_1 = __webpack_require__(2);
	var SimpleGame = (function () {
	    function SimpleGame() {
	        this.game = new Phaser.Game(gameConfig_1.GameConfig.GAME_WIDTH, gameConfig_1.GameConfig.GAME_HEIGHT, Phaser.AUTO, 'content', {
	            create: this.create,
	            preload: this.preload,
	            update: this.update,
	            render: this.render,
	        });
	    }
	    SimpleGame.prototype.preload = function () {
	        this.game.load.image("spacecraft", "assets/ShipB.png");
	        this.game.load.image("bullet", "assets/BulletB.png");
	        this.game.load.image("space", "assets/space.jpg");
	        this.game.load.image("ast_tiny", "assets/AstDebB.png");
	        this.game.load.image("ast_small", "assets/AstSmllB.png");
	        this.game.load.image("ast_medium", "assets/AstMedB.png");
	        this.game.load.image("ast_large", "assets/AstLargeB.png");
	    };
	    SimpleGame.prototype.create = function () {
	        this.game.world.setBounds(0, 0, 2000, 2000);
	        this.game.physics.startSystem(Phaser.Physics.ARCADE);
	        this.game.add.tileSprite(0, 0, 2000, 2000, "space");
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
	        this.weapon.bulletSpeed = 600;
	        this.weapon.fireRate = 100;
	        this.weapon.trackSprite(this.spacecraftSpite, 0, 0, true);
	    };
	    SimpleGame.prototype.update = function () {
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
	        this.game.world.wrap(this.spacecraftSpite, 0, true);
	        //Bullets with asteroids collision
	        this.game.physics.arcade.collide(this.asteroidGenerator.group, this.weapon.bullets, this.asteroidGenerator.divideAsteroid, null, this);
	        //Spacecraft with asteroid collision
	    };
	    SimpleGame.prototype.render = function () {
	        this.game.debug.spriteInfo(this.spacecraftSpite, 32, 450);
	    };
	    SimpleGame.prototype.damageSpacecraft = function (spacecraft, asteroid) {
	        spacecraft.health -= 5 * asteroid.size;
	    };
	    return SimpleGame;
	}());
	exports.SimpleGame = SimpleGame;
	window.onload = function () {
	    var game = new SimpleGame();
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var gameConfig_1 = __webpack_require__(2);
	var asteroid_1 = __webpack_require__(3);
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
	        var startingPoing = this.getRandomCoordinates();
	        var asteroid = this._game.add.sprite(startingPoing.x, startingPoing.y, AsteroidGenerator.asteroidAssetKey[size]);
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


/***/ }
/******/ ]);