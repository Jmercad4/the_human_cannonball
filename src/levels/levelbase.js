

/**
 * Reusable components for each level
 * @param pgame current phaser game instance
 */
ajtxz_hcgame.levelbase = function (pgame) {
    var game = ajtxz_hcgame.game;
    var pgame = this;
    var options = game.options;

    function drawCannon_captain() {

        var cb_x = 10,
            cb_y = (options.height * 0.6),
            cs_x = 20,
            cs_y = (options.height * 0.7) + 10;

        game.addAsset(cb_x + 20, cb_y - 10, 'captain');

        var cannon_body = game.addAsset(cb_x, cb_y, 'cannon_body')
            .scale.setTo(0.5, 0.5);

        var cannon_stand = game.addAsset(cs_x, cs_y, 'cannon_stand')
            .scale.setTo(0.5, 0.5);

    }

    this.init = function() {

        drawCannon_captain();


    };


};