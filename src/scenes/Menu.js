// Name Date Project title and how long it took me to complete the Project
// Charles Cenizal
// 4/21/21
// How long it took: 12 hours
// Points breakdown
// 60 pts Shrek Tier
// 20 pts for particle emitter
// 20 pts new artwork
// 20 pts new smaller faster spaceship type
// 10 pts new title screen, typography and style
// game config
// sourcers Nathan's tutorials and lectures
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        this.load.audio('sfx_select', './assets/discord-leave.mp3');
        this.load.audio('sfx_explosion', './assets/roblox.mp3');
        this.load.audio('sfx_rocket', './assets/pew.mp3');
        this.load.image('starfield', './assets/bird_background.jpeg');
    }
    // adding the menu
    create() {

        let menuConfig =
        {
            fontFamily: 'Times',
            fontSize: '28px',
            backgroundColor: '#CBC3E3',
            color: '#FFFFFF',
            align: 'right',
            padding:
            {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0, 0);
        // show menu text
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding, 'Bird Patrol', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2, 'Use arrows to move & F to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroudColor = "#CBC3E3";
        menuConfig.color = '#FFFFFF';
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        //this.add.text(20, 20, "Rocket Patrol Menu");
        // change scenes
        //this.scene.start("playScene")
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings =
            {
                spaceshipSpeed: 10,
                rocketSpeed:10,
                gameTimer: 40000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings =
            {
                spaceshipSpeed: 5,
                rocketSpeed: 5,
                gameTimer: 30000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
    }

}
