ajtxz_hcgame.level5_2 = function () {

    var pgame = this;
    var levelbase;
    var timer;

    this.preload = function() {
        levelbase = new ajtxz_hcgame.levelbase(pgame, [5,2]);
    }

    this.create = function() {
        levelbase.init();
        levelbase.initPool(835);
        levelbase.initWaterJet(210);
        levelbase.initBird(300, 3000, 900, 410);
        levelbase.initRing(370, 60);
        levelbase.initRing(655, 170);

        //Display level intro
        var lvl_intro = pgame.add.sprite(this.world.centerX, this.world.centerY-50, 'lvl_intro_5_2');
        lvl_intro.anchor.setTo(0.5, 0.5);

        //Initialize timer for level intro (kill it after 1 second)
        timer = pgame.time.create(true);
        timer.add(1000, function(){
            lvl_intro.destroy();
            pgame.add.sprite(10, 15, 'lvl_tag_5_2');
        }, this);
        timer.start();
    }

    this.update = function() {
        levelbase.defaultUpdate();
    }
};