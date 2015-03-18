

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

        game.captain = game.addAsset(cb_x + 70, cb_y - 10, 'captain');

        var cannon_body = game.addAsset(cb_x + 40, cb_y + 20, 'cannon_body')
            .scale.setTo(0.5, 0.5);

        var cannon_stand = game.addAsset(cs_x + 40, cs_y + 20, 'cannon_stand')
            .scale.setTo(0.5, 0.5);

    }

    function drawBackgrounds () {

        game.addAsset(0, 0, 'level_background');
        //game.controlBoard = game.addAsset(0, 480, 'control_board');
        var g = pgame.add.group();
        g.enableBody = true;

        game.controlBoard = g.create(0, pgame.world.height - 110, 'control_board');
        game.controlBoard.body.immovable = true;


        pgame.add.button(660, 500, 'fire_button', function() {
            game.captain.body.gravity.y = 800;
            game.captain.body.velocity.setTo(500, -800);

        }).scale.setTo(0.70, 0.70);
    }

    this.init = function() {
        drawBackgrounds();
        drawCannon_captain();

        pgame.physics.arcade.enable(game.captain);
        game.captain.body.collideWorldBounds = true;
        game.captain.body.bounce.y = 0.3;

    };

    this.defaultUpdate = function() {
        pgame.physics.arcade.collide(game.captain, game.controlBoard);
    }

};