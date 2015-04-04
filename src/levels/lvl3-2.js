ajtxz_hcgame.level3_2 = function () {

    var game = ajtxz_hcgame.game;
    var pgame = this;
    var levelbase = new ajtxz_hcgame.levelbase(pgame, '32');

    this.preload = function() {
    }

    this.create = function() {
        levelbase.init();

        // Set bird obstacle attributes and play
        var birdMoveTo = this.world.width - 100;
        var birdMoveTime = 2000;
        levelbase.birdFly(birdMoveTo, birdMoveTime);
        // cursors = pgame.input.keyboard.createCursorKeys();
    }

    this.update = function() {
        levelbase.defaultUpdate();
    }

    this.render = function(){
        if (game.options.DEBUG) {
            game.pgame().debug.bodyInfo(game.captain, 32, 64);
        }
    }
};