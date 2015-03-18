

/**
 * Reusable components for each level
 * @param pgame current phaser game instance
 */
ajtxz_hcgame.levelbase = function (pgame) {
    var game = ajtxz_hcgame.game;

    var options = game.options;

    function drawCannon_captain() {

        var cb_x = 10,
            cb_y = (options.height * 0.6),
            cs_x = 20,
            cs_y = (options.height * 0.7) + 10;

        game.addAsset(cb_x + 70, cb_y - 10, 'captain');

        var cannon_body = game.addAsset(cb_x + 40, cb_y + 20, 'cannon_body')
            .scale.setTo(0.5, 0.5);

        var cannon_stand = game.addAsset(cs_x + 40, cs_y + 20, 'cannon_stand')
            .scale.setTo(0.5, 0.5);

    }

    function drawBackgrounds () {

        game.addAsset(0, 0, 'level_background');
        game.addAsset(0, 480, 'control_board');

        pgame.add.button(660, 505, 'fire_button', function() {
            console.log('fire clicked');
        })
            .scale.setTo(0.75, 0.75);


    }

    this.init = function() {
        console.log(pgame);
        drawBackgrounds();
        drawCannon_captain();


    };


};