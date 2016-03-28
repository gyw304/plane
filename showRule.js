cycleRacing.showRule = function(game) {};

cycleRacing.showRule.prototype = {
    create: function() {
        this.add.sprite(0, 0, 'gameBg');
        this.add.sprite(65, 100, 'rule_bg');
        this.add.button(520, 110,'button-close', this.goIndex, this);
        //this.add.button(carList[i].frame.x, carList[i].frame.y,carList[i].carName,this.startGame, this);
        var blackFade = this.add.sprite(0,0,"blackFade");
        var fadeTween = this.add.tween(blackFade);
        fadeTween.to({
            alpha:0
        },1000,Phaser.Easing.Cubic.Out,true);
    },
    goIndex: function() {
        this.state.start('MainMenu');
    }
};