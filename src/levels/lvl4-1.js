ajtxz_hcgame.level4_1 = function () {

    var pgame = this;
    var levelbase;
    var timer;

    this.preload = function() {
        levelbase = new ajtxz_hcgame.levelbase(pgame, [4,1]);
    }

    this.create = function() {
        levelbase.init();
        levelbase.initPool(710);
        levelbase.initWaterJet(560);
        levelbase.initBird(480, 2000, 850, 115);
        levelbase.initRing(230, 150);

        //Display level intro
        var lvl_intro = pgame.add.sprite(this.world.centerX, this.world.centerY-50, 'lvl_intro_4_1');
        lvl_intro.anchor.setTo(0.5, 0.5);

        //Initialize timer for level intro (kill it after 1 second)
        timer = pgame.time.create(true);
        timer.add(1000, function(){
            lvl_intro.destroy();
            pgame.add.sprite(10, 15, 'lvl_tag_4_1');
        }, this);
        timer.start();
    }

    this.update = function() {
        levelbase.defaultUpdate();
    }
};