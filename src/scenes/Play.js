class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    // preload

    preload() {
        this.load.image('rocket', './assets/water_gun.png');
        this.load.image('spaceship', './assets/yellow_bird.png');
        this.load.image('bird2', './assets/blue_bird.png');
        this.load.image('bird3', './assets/green_bird.png');
        this.load.image('starfield', './assets/bird_background.jpeg');
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
    }
    // adding the menu
    create() {



        // place starfield
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0, 0);
        // this.add.text(20, 20, "Rocket Patrol Play"); // debug line
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width,
            borderUISize * 2, 0xCBC3E3).setOrigin(0, 0);

        // white borders
        //top
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xCBC3E3).setOrigin(0, 0);
        // bottom
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize,
            0xDEB887).setOrigin(0, 0);
        // left
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xD39785).setOrigin(0, 0);
        // right
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height
            , 0xD39785).setOrigin(0, 0);
        // add a Rocket
        this.player1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        // add spaceshift (x3)

        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 3).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'bird2', 0, 2).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'bird3', 0, 1).setOrigin(0, 0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });

        // keeping score
        this.p1Score = 0;

        // display the score

        let scoreConfig =
        {
            fontFamily: 'Times',
            fontSize: '28px',
            backgroundColor: '#FFCCCB',
            color: '#FFFFFF',
            align: 'left',
            padding:
            {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);

        // game over
        this.gameOver = false;

        // 60 second play clock

        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(30000, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    // update
    update() {
        this.starfield.tilePositionX -= starSpeed;
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
        }
        if (!this.gameOver) {
            // update rocket
            this.player1Rocket.update();
            // update ships
            this.ship01.update();
            // makes birds spin like crazy
            //let randRotation = 2;
            //this.ship01.rotation += randRotation;
            this.ship02.update();
            this.ship03.update();

        }


        // check collisions
        if (this.checkCollision(this.player1Rocket, this.ship01)) {
            console.log('hit s1');
            this.player1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.player1Rocket, this.ship02)) {
            console.log('hit s2');
            this.player1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.player1Rocket, this.ship03)) {
            console.log('hit s3');
            this.player1Rocket.reset();
            this.shipExplode(this.ship03);
        }
    }


    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
            return true; // collision
        }
        else {
            return false; // no collision
        }
    }

    shipExplode(ship) {
        // temporarily hide ship

        ship.alpha = 0;

        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');

        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        // score add
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        // expload sound

        this.sound.play('sfx_explosion');


    }
}
