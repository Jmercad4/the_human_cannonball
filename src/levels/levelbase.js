

/**
 * Reusable components for each level
 * @param pgame current phaser game instance
 */
ajtxz_hcgame.levelbase = function (pgame) {
    var game = ajtxz_hcgame.game;

    var options = game.options;

    // Obstacle variable
    var bird;

    function collide_obstacles(){
        // Handle collision with obstacles

    }

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

    function drawObstacles(){
        game.obstacles = pgame.add.group();
        game.obstacles.enableBody = true;

        // Add bird
        bird = game.obstacles.create(pgame.world.centerX, 300, 'bird');

        // Two animations, flying left and right.
        bird.animations.add('left', [0,1,2,3,4], 10, true);
        bird.animations.add('right', [5,6,7,8,9], 10, true);

        // Add water jet
        var waterjet = game.obstacles.create(pgame.world.centerX-100, 210, 'waterjet');
        waterjet.immovable = true;
        waterjet.animations.add('shooting', [0,1], 2, true);
        waterjet.animations.play('shooting');

        // Add fire rings
    }

    this.birdFly = function(motionDst, motionTime){
        var bird_orientation = 1;

        bird.animations.play('right');

        var tweenbird = pgame.add.tween(bird).to({ x: motionDst }, motionTime, Phaser.Easing.Linear.None, true, 0, Number.POSITIVE_INFINITY, true);

        tweenbird.onLoop.add(function(){
            if (bird_orientation == 1){
                bird.animations.play('left');
                bird_orientation = 0;
            }else{
                bird.animations.play('right');
                bird_orientation = 1;
            }
        });
    };

    function drawBackgrounds () {

        game.addAsset(0, 0, 'level_background');
        //game.controlBoard = game.addAsset(0, 480, 'control_board');
        var g = pgame.add.group();
        g.enableBody = true;

        game.controlBoard = g.create(0, pgame.world.height - 110, 'control_board');
        game.controlBoard.body.immovable = true;


        pgame.add.button(660, 565, 'fire_button', function() {
            game.captain.body.gravity.y = 800;
            game.captain.body.velocity.setTo(500, -800);

        }).scale.setTo(0.70, 0.70);
    }


    function initControls()
    {
        var slider_box = game.addAsset(300, 575, 'slider_box');
        var slider_button = game.addAsset(300, 575, 'slider_button');

        slider_button.inputEnabled = true;
        slider_button.input.enableDrag(false);
        slider_button.input.allowVerticalDrag = false;
        slider_button.input.useHandCursor = true;
        slider_button.input.boundsSprite = slider_box;

    }

    this.init = function() {
        drawBackgrounds();
        drawCannon_captain();
        drawObstacles();
        initControls();

        pgame.physics.arcade.enable(game.captain);
        game.captain.body.collideWorldBounds = true;
        game.captain.body.bounce.y = 0.3;

    };

    this.defaultUpdate = function() {
        pgame.physics.arcade.collide(game.captain, game.controlBoard);
        pgame.physics.arcade.collide(game.captain, game.obstacles, collide_obstacles);
    }

};