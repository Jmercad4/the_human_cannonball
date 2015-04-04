ajtxz_hcgame.level2_1 = function () {

    var pgame = this;
    var levelbase;
    var timer;

    this.preload = function() {
        levelbase = new ajtxz_hcgame.levelbase(pgame, [2,1]);
    }

    this.create = function() {
        levelbase.init();
        levelbase.initPool(790);
        levelbase.initWaterJet(605);

        //Display level intro
        var lvl_intro = pgame.add.sprite(this.world.centerX, this.world.centerY-50, 'lvl_intro_2_1');
        lvl_intro.anchor.setTo(0.5, 0.5);

        //Initialize timer for level intro (kill it after 1 second)
        timer = pgame.time.create(true);
        timer.add(1000, function(){
            lvl_intro.destroy();
            pgame.add.sprite(10, 15, 'lvl_tag_2_1');
        }, this);
        timer.start();
    }

    this.update = function() {
        levelbase.defaultUpdate();
    }
};