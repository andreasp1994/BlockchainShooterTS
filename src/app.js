var SimpleGame = (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(1000, 800, Phaser.AUTO, 'content', {
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
    };
    SimpleGame.prototype.create = function () {
        this.game.world.setBounds(0, 0, 2000, 2000);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.add.tileSprite(0, 0, 2000, 2000, "space");
        var image = this.game.cache.getImage("spacecraft");
        this.spacecraftSpite = this.game.add.sprite(this.game.width / 2 - image.width / 2, this.game.height / 2 - image.height / 2, "spacecraft");
        this.game.physics.enable(this.spacecraftSpite, Phaser.Physics.ARCADE);
        this.spacecraftSpite.body.drag.set(200);
        this.spacecraftSpite.body.maxVelocity.set(400);
        this.spacecraftSpite.scale.setTo(0.3, 0.3);
        this.spacecraftSpite.anchor.setTo(0.5, 0.5);
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
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.C)) {
            this.createAsteroid(SimpleGame.ASTEROID_TINY);
        }
        //Firing
        if (this.game.input.activePointer.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.weapon.fire(this.spacecraftSpite);
        }
        this.game.world.wrap(this.spacecraftSpite, 0, true);
    };
    SimpleGame.prototype.createAsteroid = function (size) {
        var velocity = Math.floor(Math.random() * (300 - 200 + 1)) + 200;
        var asteroid;
        if (size == SimpleGame.ASTEROID_TINY) {
            this.game.add.sprite(300, 300, "ast_tiny");
        }
        asteroid.body.velocity.set(velocity);
    };
    SimpleGame.prototype.render = function () {
        this.game.debug.spriteInfo(this.spacecraftSpite, 32, 450);
    };
    SimpleGame.ASTEROID_TINY = 1;
    SimpleGame.ASTEROID_SMALL = 2;
    SimpleGame.ASTEROID_MEDIUM = 3;
    SimpleGame.ASTEROID_LARGE = 4;
    return SimpleGame;
}());
window.onload = function () {
    var game = new SimpleGame();
};
//# sourceMappingURL=app.js.map