

/**
 * Reusable components for each level
 * @param pgame current phaser game instance
 */
ajtxz_hcgame.levelbase = function (pgame) {
    var game = ajtxz_hcgame.game;
    var pgame = this;

    function addDefaultAssets() {

        game.addAsset(10, 20, 'captain');
        game.addAsset(100, 80, 'cannon_body');
        game.addAsset(100, 120, 'cannon_stand');

    }

    this.init = function() {
        addDefaultAssets();


    };


};