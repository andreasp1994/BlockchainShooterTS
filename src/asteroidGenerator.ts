import { SimpleGame } from './app'
import { Asteroid } from './asteroid'

/*
This class is repsonsible for creating asteroids based on the bitcoin blockchain transactions
*/
export class AsteroidGenerator {

    static  MAX_VELOCITY : number = 200;
    static MIN_VELOCITY : number = -AsteroidGenerator.MAX_VELOCITY;
    static asteroidAssetKey : string[] = ["ast_tiny", "ast_small", "ast_medium", "ast_large"];
    
    private _group : Phaser.Group;
    private _game: Phaser.Game;

    constructor(game : Phaser.Game) {
        this._game = game;
        this._group = new Phaser.Group(this._game);
    }

    public createAsteroid(size : number, x?, y?)  {
        var point : Phaser.Point = this.getRandomCoordinates();
        var asteroid : Asteroid;
        if (x && y) {
            asteroid =  <Asteroid> this._game.add.sprite(x, y, AsteroidGenerator.asteroidAssetKey[size]);
        } else {
            asteroid =  <Asteroid> this._game.add.sprite(point.x, point.y, AsteroidGenerator.asteroidAssetKey[size]);
        }
        
        asteroid.size = size;
        this._game.physics.enable(asteroid, Phaser.Physics.ARCADE);
        asteroid.body.velocity = this.getRandomVelocity();
        asteroid.body.drag.set(40*size);
        asteroid.body.minVelocity = 40;
        this._group.add(asteroid);
    }

    public divideAsteroid = ( asteroid : Asteroid, bullet : Phaser.Sprite) => {
        bullet.kill();      
        asteroid.kill();    //Maybe I have remove the objecct from group as well?? Performance implications

        //Divide asteroid into 2 smaller pieces
        if (asteroid.size != Asteroid.ASTEROID_TINY){
            this.createAsteroid(asteroid.size - 1, asteroid.x, asteroid.y);
            this.createAsteroid(asteroid.size - 1, asteroid.x, asteroid.y);
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