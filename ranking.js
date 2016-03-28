cycleRacing.ranking = function(game) {};
var rankTxt;
cycleRacing.ranking.prototype = {
    create: function() {
        this.rank_bg=this.add.sprite(0, 0, 'gameBg');

        this.add.sprite(65, 170, 'rankBg');

        this.scoreTxtss = this.add.text(this.world.centerX, 60, '���ϣ�������Ŷ��',{ font: "40px microsoft yahei", fill: "#ed6d00", align: "center" });
        this.scoreTxtss.anchor.set(0.5);
        if(_score<=10)
        {
            this.scoreTxtss.setText('���磬������Ŷ��22222122222');
        }
        else if(_score>100&&_score<=5000){
            this.scoreTxtss.setText('���磬55555��');
        }


        this.tt = this.add.text(this.world.centerX, 120, '�����εĳɼ���'+_score+'���꣬������'+_useRank+'��',{ font: "30px microsoft yahei", fill: "#ed6d00", align: "center" });
        this.tt.anchor.set(0.5);
        this.style = { font: "24px microsoft yahei", fill: "#ed6d00", align: "left" }
        for(var i=0;i<5;i++)
        {
            this.add.text(150, 310+i*60, j_rankInfo[i].j_Ranking,this.style);
            this.add.text(200, 310+i*60, j_rankInfo[i].j_NickName,this.style);
            this.add.text(370, 310+i*60, j_rankInfo[i].j_score,this.style);
        }

        this.best = this.add.text(this.world.centerX, 670, '������óɼ��ǣ�'+_bestScore+'����,����'+_bestRank+'',{ font: "24px microsoft yahei", fill: "#ed6d00", align: "center" });
        this.best.anchor.set(0.5);
        this.add.button(220, 725,'button-replay', this.replayGame, this);


        var blackFade = this.add.sprite(0,0,"blackFade");
        var fadeTween = this.add.tween(blackFade);
        fadeTween.to({
            alpha:0
        },1000,Phaser.Easing.Cubic.Out,true);
    },
    replayGame:function(){
        this.state.start('Game');
    },
    share : function(){
        this.shareImg = this.add.sprite(0, 0, 'shareImg');
        this.shareImg.inputEnabled = true;
        this.shareImg.events.onInputDown.add(function(){
            this.shareImg.destroy()
        }, this);
    },
    lotteryDraw : function(){
        $('#warp').show();
        if(isSpoil)
        {
        	$('.logoNames').text(_MotorcadeName)
        	$('.logoImgs').attr('src','assets/'+carName+'_logo.png')
			$('#yes-spoil').show();
        }
        else
        {
            $('#no-spoil').show()
        }
        $('#no-spoil .ok').on('click',function(){
            $('#warp,#no-spoil').hide()
        });
    }
};