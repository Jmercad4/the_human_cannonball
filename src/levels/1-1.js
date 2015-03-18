
ajtxz_hcgame.level1_1 = function () {

    var game = ajtxz_hcgame.game;
    var pgame = this;
    var levelbase = new ajtxz_hcgame.levelbase(pgame);

    this.preload = function() {
    }

    this.create = function() {
        levelbase.init();

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