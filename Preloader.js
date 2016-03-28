cycleRacing.Preloader = function(game){

};

cycleRacing.Preloader.prototype = {
    preload: function() {
        this.add.sprite(0,0,'loadingBg');
        this.loadBar = this.add.group();

        this.loadBar.create(0,0,'loadingBar_0');
        this.preloadBar = this.loadBar.create(6,6,'loadingBar_1');
        this.load.setPreloadSprite(this.preloadBar);

        this.loadBar.x = cycleRacing.GAME_WIDTH / 2 - 166;
        this.loadBar.y = cycleRacing.GAME_HEIGHT / 2;

        this.loadingLogo = this.add.sprite((cycleRacing.GAME_WIDTH)/2 - 90, 200, 'loadingLogo');
        this.add.tween(this.loadingLogo).to( { y: 230 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        this.loadingLogo.animations.add('fly3');
        this.loadingLogo.animations.play('fly3',7,true);

        this.add.sprite(cycleRacing.GAME_WIDTH / 2 - 78, cycleRacing.GAME_HEIGHT - 70, 'tf365');


        this.load.image('homeLogos','assets/homeLogos.png');
        this.load.spritesheet('home_firepp_logo','assets/home_firepp_logo.png',253,412,2)
        this.load.image('button-start','assets/playBtn.png?1');
        this.load.image('button-rule','assets/ruleBtn.png');
        this.load.image('button-replay','assets/replayBtn.png');
        this.load.image('gameBg','assets/gameBg.jpg?5');
        this.load.image('explain','assets/explain.png?2');
        this.load.image('fen','assets/fen.png');
        this.load.image('liuxing','assets/liuxing.png');

        this.load.image('rankBg','assets/rank_bg.png');
        this.load.image('button-close','assets/close.png');

        this.load.image('blackFade','assets/blackFade.gif');
        this.load.image('blackTop','assets/blackTop.png');

        this.load.spritesheet('player','assets/players.png',102,167,2)

        this.load.spritesheet('enemyCar', 'assets/enemy.png?1', 157, 139);
        this.load.image('speedupCard','assets/speedupCard.png?1');
        this.load.image('right_btn','assets/right_btn.png?2');
        this.load.image('left_btn','assets/left_btn.png?2');

        this.load.image('rule_bg','assets/rule_bg.png?1');
        this.load.image('button-share','assets/shareBtn.png?1');
        this.load.image('shareImg','assets/shareShow.png');

        this.load.audio('gameMusic', 'assets/music.mp3?1223');
        this.load.audio('gameoverMusic', 'assets/gameover.mp3');
        this.load.audio('getscoreMusic', 'assets/getscore.mp3');


    },
    create: function() {
       this.state.start('MainMenu');
    }
};