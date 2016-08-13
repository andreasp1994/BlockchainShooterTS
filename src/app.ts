import { AsteroidGenerator } from "./asteroidGenerator"
import { Asteroid } from "./asteroid"
import { GameConfig } from "./gameConfig"
import { OnTXCreatedListener } from "./onTXCreatedListener"
import { BlockchainFeed } from "./blockchainFeed"

export class SimpleGame implements OnTXCreatedListener{
    game: Phaser.Game;
    spacecraftSpite: Phaser.Sprite;
    weapon: Phaser.Weapon

    private asteroidGenerator : AsteroidGenerator;
    private blockchainTXFeed : BlockchainFeed;

    constructor() {
        this.game =new Phaser.Game(GameConfig.GAME_WIDTH, GameConfig.GAME_HEIGHT, Phaser.AUTO, 'content',
            { 
                create: this.create, 
                preload: this.preload, 
                update: this.update,
                render: this.render,
                onTXCreated : this.onTXCreated      // Have to register the method in game state
            });
    }

    preload() {
        //Socket TX feed
        this.blockchainTXFeed = new BlockchainFeed(this);

        this.game.load.image("spacecraft", "assets/ShipB.png");
        this.game.load.image("bullet", "assets/BulletB.png");
        this.game.load.image("space", "assets/space.jpg");
        this.game.load.image("ast_tiny", "assets/AstDebB.png");
        this.game.load.image("ast_small", "assets/AstSmllB.png");
        this.game.load.image("ast_medium", "assets/AstMedB.png");
        this.game.load.image("ast_large", "assets/AstLargeB.png");
    }

    create() {
        this.game.world.setBounds(0,0,2000,2000);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.add.tileSprite(0, 0, 2000, 2000, "space")

        this.asteroidGenerator = new AsteroidGenerator(this.game);
        this.asteroidGenerator.createAsteroid(Asteroid.ASTEROID_SMALL);
        
        var image = this.game.cache.getImage("spacecraft");
        this.spacecraftSpite = this.game.add.sprite(
            this.game.width / 2 - image.width / 2,
            this.game.height / 2 - image.height / 2,
            "spacecraft"
        );
        this.game.physics.enable(this.spacecraftSpite, Phaser.Physics.ARCADE);

        this.spacecraftSpite.body.drag.set(200);
        this.spacecraftSpite.body.maxVelocity.set(400);
        this.spacecraftSpite.scale.setTo(0.3,0.3);
        this.spacecraftSpite.anchor.setTo(0.5,0.5);
        this.spacecraftSpite.health = GameConfig.SPACECRAFT_INITIAL_HEALTH;
        this.game.camera.follow(this.spacecraftSpite);

        //  Creates 50 bullets, using the 'bullet' graphic
        this.weapon = this.game.add.weapon(50, 'bullet');
        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.weapon.bulletSpeed = 600;
        this.weapon.fireRate = 100;
        this.weapon.trackSprite(this.spacecraftSpite, 0, 0, true); 
    }

    update() {
        this.spacecraftSpite.body.angularVelocity = 0;

        //Movement
        if ( this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.spacecraftSpite.body.angularVelocity = -200;
        } else if ( this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.spacecraftSpite.body.angularVelocity = 200;
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
             this.game.physics.arcade.accelerationFromRotation(this.spacecraftSpite.rotation, 300, this.spacecraftSpite.body.acceleration);
        } else
        {
            this.spacecraftSpite.body.acceleration.set(0);
        }

        //Firing
        if (this.game.input.activePointer.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {   
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
    }

    render() {
        this.game.debug.spriteInfo(this.spacecraftSpite, 32, 650);
    }

    private damageSpacecraft(spacecraft : Phaser.Sprite, asteroid : Asteroid ) : boolean {
        spacecraft.health -= 5*asteroid.size;
        return true;
    } 

    public onTXCreated(satoshiAmount : number) : void {
        //create asteroid
        this.asteroidGenerator.createAsteroid(Asteroid.ASTEROID_TINY);
    }
}

window.onload = () => {
    var game = new SimpleGame();
};