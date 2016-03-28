cycleRacing.MainMenu = function(game) {};
cycleRacing.MainMenu.prototype = {
    create: function() {

        var selef = this;

        this.music = this.add.audio('gameMusic', true);
        this.music.play('',0,1,true);

        this.add.sprite(0, 0, 'gameBg');

        this.liuxingGroup = this.add.group();

        for(var i=0;i<3;i++)
        {
            this.liuxingGroup.create(500, 300*i,'liuxing');
        }

        this.liuxingGroup.forEach(function(item) {
            selef.add.tween(item).to( { y:item.y+350,x:item.x-700 }, selef.rnd.integerInRange(500, 1500), "Linear", true, 0, -1);
        });

        this.add.sprite(cycleRacing.GAME_WIDTH/2-136, 70, 'homeLogos');

        this.home_firepp_logo = this.add.sprite(cycleRacing.GAME_WIDTH/2-125, 130, 'home_firepp_logo');

        this.home_firepp_logo.animations.add('fly');
        this.home_firepp_logo.animations.play('fly',7,true);

        this.add.tween(this.home_firepp_logo).to( { y: 140 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);

        this.add.sprite(cycleRacing.GAME_WIDTH / 2 - 78, cycleRacing.GAME_HEIGHT - 70, 'tf365');

        this.add.button(cycleRacing.GAME_WIDTH/2-101, cycleRacing.GAME_HEIGHT-300,'button-start', this.startGame, this);
        this.add.button(cycleRacing.GAME_WIDTH/2-101, cycleRacing.GAME_HEIGHT-210,'button-rule', this.showRule, this);


        var blackFade = this.add.sprite(0,0,"blackFade");
        var fadeTween = this.add.tween(blackFade);
        fadeTween.to({
            alpha:0
        },1000,Phaser.Easing.Cubic.Out,true);
    },

    startGame: function() {
        this.state.start('Game');
    },
    showRule : function(){
        this.state.start('showRule');
    }
};