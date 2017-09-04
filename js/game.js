var game;
var player;
var platforms;
var badges;
var stars;
var volcanos;
var cursors;
var jumpButton;
var scoreText;
var livesText;
var gameName;
var finalMessage;
var won = false;
var gameOver = false;
var currentScore = 0;
var lives = 3;
var winningScore = 900;

function createStars() {
    stars = game.add.physicsGroup();

    starCreate(425, 70, 'star');
    starCreate(350, 60, 'star');
    starCreate(275, 50, 'star');
    starCreate(725, 50, 'star');
    starCreate(650, 60, 'star');
    starCreate(575, 70, 'star');
    starCreate(0, 70, 'star');
    starCreate(25, 70, 'star');
    starCreate(50, 70, 'star');
    starCreate(75, 70, 'star');
    starCreate(100, 70, 'star');
    starCreate(1175, 70, 'star');
    starCreate(1150, 70, 'star');
    starCreate(1125, 70, 'star');
    starCreate(1100, 70, 'star');
    starCreate(1075, 70, 'star');
    starCreate(200, 550, 'star');
    starCreate(220, 550, 'star');
    starCreate(280, 550, 'star');
    starCreate(300, 550, 'star');
    starCreate(500, 470, 'star');
    starCreate(550, 470, 'star');
    starCreate(10, 320, 'star');
    starCreate(10, 290, 'star');
    starCreate(10, 260, 'star');
    starCreate(170, 320, 'star');
    starCreate(195, 350, 'star');
    starCreate(220, 380, 'star');
    starCreate(250, 210, 'star');
    starCreate(270, 210, 'star');
    starCreate(570, 210, 'star');
    starCreate(590, 210, 'star');
    starCreate(700, 350, 'star');
    starCreate(700, 325, 'star');
    starCreate(1050, 400, 'star');
    starCreate(1025, 375, 'star');
    starCreate(1000, 350, 'star');
    starCreate(1050, 325, 'star');
    starCreate(1025, 300, 'star');
    starCreate(1000, 275, 'star');
    starCreate(975, 250, 'star');
    starCreate(950, 225, 'star');
    starCreate(925, 200, 'star');
    starCreate(900, 175, 'star');
    starCreate(100, 550, 'star');
}

function createvolcanos() {
    volcanos = game.add.physicsGroup();

    volcanoCreate(700, 220, 'volcano');
    volcanoCreate(700, 400, 'volcano');
    volcanoCreate(750, 400, 'volcano');
    volcanoCreate(150, 530, 'volcano');
    volcanoCreate(330, 530, 'volcano');
    volcanoCreate(800, 530, 'volcano');
    volcanoCreate(850, 530, 'volcano');
    volcanoCreate(900, 530, 'volcano');
    volcanoCreate(950, 530, 'volcano');
    volcanoCreate(1000, 530, 'volcano');
    volcanoCreate(1050, 530, 'volcano');
    volcanoCreate(1100, 530, 'volcano');
    volcanoCreate(1150, 530, 'volcano');
    volcanoCreate(1200, 530, 'volcano');
    volcanoCreate(380, 220, 'volcano');
    volcanoCreate(440, 220, 'volcano');
}


function createPlatforms() {
    platforms = game.add.physicsGroup();


    platforms.create(400, 520, 'mainplatform');
    platforms.create(670, 460, 'small1');
    platforms.create(0, 370, 'small1');
    platforms.create(250, 500, 'jump');
    platforms.create(170, 240, 'grass1');
    platforms.create(330, 270, 'grass2');
    platforms.create(500, 240, 'grass1');
    platforms.create(0, 100, 'medium');
    platforms.create(450, 150, 'jump');
    platforms.create(750, 90, 'jump');
    platforms.create(1000, 90, 'medium');
    platforms.create(1050, 430, 'jump');

    platforms.setAll('body.immovable', true);
}

function starCreate(left, top, starImage) {
    var star = stars.create(left, top, starImage);
    star.animations.add('spin');
    star.animations.play('spin', 8, true);
}

function volcanoCreate(left, top, volcanoImage) {
    var volcano = volcanos.create(left, top, volcanoImage);
    volcano.animations.add('bubble');
    volcano.animations.play('bubble', 8, true);
}

function starCollect(player, star) {
    star.kill();
    currentScore = currentScore + 20;
    if (currentScore === winningScore) {
        player.kill();
        won = true;
    }
}

function volcanoCollect(player, volcano) {
    volcano.kill();
    lives = 0;
    if (lives === 0) {
        player.kill();
        gameOver = true;
    }
}

window.onload = function () {

    game = new Phaser.Game(1256, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

    function preload() {

        //Load images
        game.load.image('mainbackground','assets/mainbackground1.jpg');
        game.load.image('mainplatform', 'assets/mainplatform.png');
        game.load.image('mainplatform1', 'assets/platform_1.png');
        game.load.image('small1', 'assets/smallestplatform.png');
        game.load.image('medium', 'assets/mediumplatform.png');
        game.load.image('grass1', 'assets/grassplatform1.png');
        game.load.image('grass2', 'assets/grassplatform2.png');
        game.load.image('jump', 'assets/jumpbox.png');

        //Load spritesheets
        game.load.spritesheet('player', 'assets/coolguyviky.png', 32.8,53);
        game.load.spritesheet('coin', 'assets/coin.png', 36, 44);
        game.load.spritesheet('badge', 'assets/badge.png', 42, 54);
        game.load.spritesheet('volcano', 'assets/volcano.png', 39.2, 70);
        game.load.spritesheet('star', 'assets/star.png', 32, 32);
    }

    function create() {
        background = game.add.tileSprite(0, 0, 1256, 600, "mainbackground");
        player = game.add.sprite(50, 600, 'player');
        player.animations.add('walk');
        player.anchor.setTo(0.5, 1);

        game.physics.arcade.enable(player);

        player.body.collideWorldBounds = true;
        player.body.gravity.y = 350;

        createStars();
        createvolcanos();
        createPlatforms();

        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        scoreText = game.add.text(16, 16, "SCORE: " + currentScore, { font: "30px Times", fill: "black" });
        livesText = game.add.text(936, 16, "LIVES: " + lives, { font: "30px Times", fill: "black" });
        finalMessage = game.add.text(game.world.centerX, 250, "", { font: "48px Arial", fill: "black" });
        finalMessage.anchor.setTo(0.5, 1);
    }

    function update() {
        scoreText.text = "SCORE: " + currentScore;
        livesText.text = "COLLECT ALL COINS";

        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.overlap(player, stars, starCollect);
        game.physics.arcade.overlap(player, volcanos, volcanoCollect);

        player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            player.animations.play('walk', 10, true);
            player.body.velocity.x = -350;
            player.scale.x = - 1;
        }
        else if (cursors.right.isDown) {
            player.animations.play('walk', 10, true);
            player.body.velocity.x = 350;
            player.scale.x = 1;
        }
        else {
            player.animations.stop();
        }

        if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
            player.body.velocity.y = -300;
        }
        if (won) {
            finalMessage.text = "YOU WIN!!! Refresh to play again!";
        }
        if (gameOver) {
            finalMessage.text = "GAME OVER!!! Refresh to play again!";

        }

    }

    function render() {

    }

};
