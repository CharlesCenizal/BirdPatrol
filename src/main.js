// absolutely necessary
console.log('Charles is the best maker of rocket patrol tutorials :^)');
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
let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 800,
    scene: [Menu, Play]
}
let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let starSpeed = 4;

// reserve keyboard bindings

let keyF, keyR, keyLEFT, keyRIGHT;
