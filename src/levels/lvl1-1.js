ajtxz_hcgame.level1_1 = function () {

    var pgame = this;
    var levelbase = new ajtxz_hcgame.levelbase(pgame, '1_1');
    var timer;
    var lvl_intro;

    this.preload = function() {
    }

    this.create = function() {
        levelbase.init();

        // Set bird obstacle attributes and play
        var birdMoveTo = this.world.width - 100;
        var birdMoveTime = 2000;
        levelbase.birdFly(birdMoveTo, birdMoveTime);

        //Display level intro
        lvl_intro = pgame.add.sprite(this.world.centerX, this.world.centerY-50, 'lvl_intro_1_1')
        lvl_intro.anchor.setTo(0.5, 0.5);

        //Initialize timer for level intro (kill it after 1 second)
        timer = pgame.time.create(true);
        timer.add(1000, function(){
            lvl_intro.destroy();
            pgame.add.sprite(10, 15, 'lvl_tag_1_1');
        }, this);
        timer.start();
    }

    this.update = function() {
        levelbase.defaultUpdate();
    }
};