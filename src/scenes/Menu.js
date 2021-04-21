class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        this.load.audio('sfx_select', './assets/assets_blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
        this.load.audio('sfx_rocket', './assets/pew.mp3');
    }
    // adding the menu
    create() {
        let menuConfig =
        {
            fontFamily: 'Courier',
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
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings =
            {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
    }

}
