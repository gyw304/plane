var cycleRacing = {};
cycleRacing.Boot = function(game) {
    cycleRacing.GAME_WIDTH = 640;
    cycleRacing.GAME_HEIGHT = 1010;
};
cycleRacing.Boot.prototype = {
    preload: function() {
        this.load.image('loadingBar_1', 'assets/loadingBar_1.png?3');
        this.load.image('loadingBar_0', 'assets/loadingBar_0.png?3');
        this.load.image('loadingBg','assets/gameBg.jpg?1');
        this.load.spritesheet('loadingLogo','assets/fire_pps.png',196,318,2)
        //this.load.image('loadingLogo','assets/fire_pp.png');
        this.load.image('tf365','assets/tf365.png');

    },
    create: function() {
        this.input.maxPointers = 1;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);
        this.state.start('Preloader');
    }
};