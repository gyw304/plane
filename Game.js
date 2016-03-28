cycleRacing.Game = function(game) {

};

var right = false;
var left = false;
var nextSpawnAt= 0;
var nextCarAt=0;
var counter = 6;

cycleRacing.Game.prototype = {
    create: function() {

        this.gameoverMusic = this.add.audio('gameoverMusic');
        this.getscoreMusic = this.add.audio('getscoreMusic');


        this.bg = this.add.tileSprite(0,0,cycleRacing.GAME_WIDTH,cycleRacing.GAME_HEIGHT,'gameBg');



        this.myCar = this.add.sprite(cycleRacing.GAME_WIDTH/2, cycleRacing.GAME_HEIGHT/2+340, 'player');

        this.myCar.animations.add('fly2');
        this.myCar.animations.play('fly2',7,true);

        this.myCar.anchor.set(0.5);
        this.physics.enable(this.myCar,Phaser.Physics.ARCADE);
        this.myCar.body.setSize(65, 147, 20, 20);


        this.enemyGroup = this.add.group();
        this.enemyGroup.enableBody = true;

        this.hasStarted = false;

        this.right_btn = this.add.button(cycleRacing.GAME_WIDTH - 135, cycleRacing.GAME_HEIGHT - 200, 'right_btn', null, this);
        this.right_btn.events.onInputOver.add(function(){right=true;});
        this.right_btn.events.onInputOut.add(function(){right=false;});
        this.right_btn.events.onInputDown.add(function(){right=true;});
        this.right_btn.events.onInputUp.add(function(){right=false;});

        this.left_btn = this.add.button(40, cycleRacing.GAME_HEIGHT - 200, 'left_btn', null, this);
        this.left_btn.events.onInputOver.add(function(){left=true;});
        this.left_btn.events.onInputOut.add(function(){left=false;});
        this.left_btn.events.onInputDown.add(function(){left=true;});
        this.left_btn.events.onInputUp.add(function(){left=false;});


        this.blackTop = this.add.sprite(0, 0,'blackTop');

        this.scoreTxt = this.add.text(this.world.centerX, 45, '0光年', { font: "40px Arial", fill: "#ed6d00", align: "left" });
        this.scoreTxt.anchor.set(0.5);

        //this.carLogo = this.add.sprite(0, 0,carName+'_logo');

        this.explain = this.add.sprite(0,0,'explain');
        this.text = this.add.text(260, 190, '0', { font: "220px Arial", fill: "#ffffff", align: "center" });

        var blackFade = this.add.sprite(0,0,"blackFade");
        var fadeTween = this.add.tween(blackFade);
        fadeTween.to({
            alpha:0
        },1000,Phaser.Easing.Cubic.Out,true);

        this.time.events.loop(50, this.createCar, this);
        this.time.events.loop(50, this.spawn, this);
        this.resTime = this.time.events.loop(Phaser.Timer.SECOND, this.readinessTime, this);
        this.time.events.stop(false);
        this.readinessTime();

    },
    update: function() {
        if(!this.hasStarted) return;

        this.physics.arcade.overlap(this.myCar, this.enemyGroup, this.hitEnemy, null, this);
        this.physics.arcade.overlap(this.myCar, this.speedUpCard, this.hitSpeedUpCardHit, null, this);
        if(!this.gameIsover)
        {
            if (right) {
                if(this.myCar.x>=570)
                {
                    this.myCar.x = 570;
                    right = false;
                }
                else
                {
                    this.myCar.x += 5;
                    right = true;
                }
            }
            if (left) {
                if(this.myCar.x<=80)
                {
                    this.myCar.x = 80;
                    left = false;
                }
                else
                {
                    this.myCar.x -= 5;
                    left = true;
                }
            }
            this.gameSpeed+=0.1;
            this.bg.autoScroll(0,this.gameSpeed);
            this.checkScore();
        }
    },

    readinessTime : function(){
        this.time.events.start();
        if(counter <=0)
        {
            this.startGame();
            this.time.events.remove(this.resTime);
            return
        }
        else
        {
            --counter;
            this.text.setText(counter);
        }
    },

    startGame:function(){
        this.gameSpeed = 800;
        this.score = 0;
        this.fireRate = 2000;
        this.nextFire = 0;
        this.isEatSpeedUpCard = false;
        this.hasStarted = true;
        this.gameIsover = false;
        this.explain.destroy();
        this.text.destroy();
    },
    gameover:function(){

        this.bg.stopScroll();
        this.time.events.stop(true);
        this.enemyGroup.forEachExists(function(enemyCars){
            enemyCars.body.velocity.y = 0;
        }, this);
        this.speedUpCard.kill();
        this.hasStarted = false;
        this.gameIsover = true;
        this.isEatSpeedUpCard = false;
        right = false;
        left = false;


        //游戏结束 (_score)

        if(islogin)
        {
            this.state.start('ranking');
        }
        else
        {
            this.state.start('login');
        }


    },
    spawn: function() {
        if (nextSpawnAt > this.time.now) {
            return;
        }
        this.speedUpCard = this.add.sprite(0, -240, 'speedupCard');
        this.physics.arcade.enable(this.speedUpCard);
        this.speedUpCard.kill();
        nextSpawnAt = this.time.now + 10000 - this.gameSpeed;

        if (!this.speedUpCard.alive) {
            var random = this.rnd.integerInRange(150, 340);
            this.speedUpCard.reset(random, -240);
            this.speedUpCard.body.gravity.y = this.gameSpeed/5;
        }
    },
    hitSpeedUpCardHit : function(){
        this.speedUpCard.kill();
        //this.music.pause();
        this.getscoreMusic.play();
        //this.music.play();
        this.fen = this.add.sprite(this.myCar.x, this.myCar.y, 'fen');
        this.add.tween(this.fen).to( { y:this.myCar.y-100, alpha: 0 }, 1000, Phaser.Easing.Cubic.Out, true);
        this.score+=100;
    },
    createCar : function(){
        if (this.time.now > this.nextFire > 0)
        {
            this.nextFire = this.time.now + this.fireRate - this.gameSpeed/10;
            this.enemy = this.add.sprite(this.rnd.integerInRange(20, 530), -137, 'enemyCar', this.rnd.integerInRange(0, 2), this.enemyGroup);
            this.enemyGroup.setAll('checkWorldBounds',true);
            this.enemyGroup.setAll('outOfBoundsKill',true);
            this.enemyGroup.setAll('body.velocity.y', this.gameSpeed/2);
        }
    },
    hitEnemy : function(){
        if(this.gameIsover) return;
        //this.music.pause();
        this.gameoverMusic.play();
        this.gameover();
    },
    checkScore : function(){
        ++this.score
        _score = this.score;
        this.scoreTxt.setText(this.score+'光年');
    }
};
