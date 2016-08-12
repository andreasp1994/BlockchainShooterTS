import { GameConfig } from './gameConfig'
import { SimpleGame } from './app'
import { Asteroid } from './asteroid'

/*
This class is repsonsible for creating asteroids based on the bitcoin blockchain transactions
*/
export class AsteroidGenerator {

    static  MAX_VELOCITY : number = 200;
    static MIN_VELOCITY : number = -AsteroidGenerator.MAX_VELOCITY;
    static asteroidAssetKey : string[] = ["ast_tiny", "ast_small", "ast_medium", "ast_large"];
    
    private _socket : WebSocket;
    private _group : Phaser.Group;
    private _game: Phaser.Game;

    constructor(game : Phaser.Game) {
        this._game = game;
        this._group = new Phaser.Group(this._game);
    }

    connect() {
        this._socket = new WebSocket(GameConfig.BITCOIN_BLOCKCHAIN_SOCKET_API_URL);
        this._socket.onopen = (event)=> {
            this._socket.send(GameConfig.BITCOIN_BLOCKCHAIN_SOCKET_SUBSCRIBE_TO_TX);
            this._socket.onmessage = function(message){
               console.log(message);
            }
        }
    }

    createAsteroid(size : number) {
        var startingPoing : Phaser.Point = this.getRandomCoordinates();
        var asteroid : Asteroid = <Asteroid> this._game.add.sprite(startingPoing.x, startingPoing.y, AsteroidGenerator.asteroidAssetKey[size]);;
        asteroid.size = size;
        this._game.physics.enable(asteroid, Phaser.Physics.ARCADE);
        asteroid.body.velocity = this.getRandomVelocity();
        console.log(asteroid.body.velocity);
        this._group.add(asteroid);
    }

    public divideAsteroid = ( asteroid : Asteroid, bullet : Phaser.Sprite) => {
        bullet.kill();
        asteroid.kill();

        //Divide asteroid into 2 smaller pieces
        if (asteroid.size != Asteroid.ASTEROID_TINY){
            let one_half : Phaser.Sprite = this._game.add.sprite( asteroid.x,asteroid.y, AsteroidGenerator.asteroidAssetKey[asteroid.size - 1]);
            let other_half : Phaser.Sprite = this._game.add.sprite(asteroid.x,asteroid.y, AsteroidGenerator.asteroidAssetKey[asteroid.size - 1]);
            this._game.physics.enable(one_half, Phaser.Physics.ARCADE);
            this._game.physics.enable(other_half, Phaser.Physics.ARCADE);
            one_half.body.velocity = this.getRandomVelocity();
            other_half.body.velocity = this.getRandomVelocity();
            this._group.add(one_half);
            this._group.add(other_half);           
        }
    }

    private getRandomVelocity() : Phaser.Point {
         var vX : number = this._game.rnd.integerInRange(AsteroidGenerator.MIN_VELOCITY, AsteroidGenerator.MAX_VELOCITY);
         var vY : number = this._game.rnd.integerInRange(AsteroidGenerator.MIN_VELOCITY, AsteroidGenerator.MAX_VELOCITY);
         return new Phaser.Point(vX, vY);
    }

    private getRandomCoordinates() : Phaser.Point {
        return new Phaser.Point(this._game.rnd.integerInRange(0,this._game.width), this._game.rnd.integerInRange(0, this._game.height));
    } 

    get group(): Phaser.Group {
        return this._group;
    }
}