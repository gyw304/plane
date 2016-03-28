cycleRacing.login = function(game) {};

cycleRacing.login.prototype = {
    create: function() {
        var self = this.state;
        this.add.sprite(0, 0, 'gameBg');


        //this.scoreTxtss = this.add.text(this.world.centerX, 40, '',{ font: "40px microsoft yahei", fill: "#ed6d00", align: "center" });

        this.scoreTxtss = this.add.text(this.world.centerX, 60, '���ϣ�������Ŷ��',{ font: "40px microsoft yahei", fill: "#ed6d00", align: "center" });
        this.scoreTxtss.anchor.set(0.5);
        if(_score<=10)
        {
            this.scoreTxtss.setText('���磬������Ŷ��22222122222');
        }
        else if(_score>100&&_score<=5000){
            this.scoreTxtss.setText('���磬55555��');
        }


        this.add.text(this.world.centerX, 120, '�����εĳɼ���'+_score+'���꣬������'+_useRank+'��',{ font: "30px microsoft yahei", fill: "#ed6d00", align: "center" }).anchor.set(0.5);
        this.add.text(this.world.centerX, 160, '��д���ϲμӱ���Ӯ�󽱣�',{ font: "24px microsoft yahei", fill: "#ed6d00", align: "center" }).anchor.set(0.5,0);


        $('#subBtn').on('click',function(){
            $('#login-screen').hide()
            self.start('ranking');
        });
        $('#replay-btn').on('click',function(){
            $('#login-screen').hide()
            self.start('Game');
        });
        var blackFade = this.add.sprite(0,0,"blackFade");
        var fadeTween = this.add.tween(blackFade);
        fadeTween.to({
            alpha:0
        },1000,Phaser.Easing.Cubic.Out,true).onComplete.add(function(){
            $('#login-screen').show()
        });
    }
};