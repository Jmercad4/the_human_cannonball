

/**
 * Reusable components for each level
 * @param pgame current phaser game instance
 */
ajtxz_hcgame.levelbase = function (pgame) {
    //Constants
    var SLIDER_X_POS = 230;
    var SLIDER_Y_POS = 575;
    var CANNON_DEFAULT = -Math.PI/10.0; //45 degrees
    var CAPTAIN_DEFAULT = Math.PI/4.0; //45 degrees
    var CAPTAIN_ANGLE_OFFSET = -Math.PI/2.0
    var MAX_VELOCITY = 1000; //NEED TO FIND BEST VALUE

    //Game
    var game = ajtxz_hcgame.game;

    //Controls
    var crank, crank_knob, crank_noise_sfx;
    var fire_button;
    var slider_button, slider_box, slider_bar;

    //Obstacles
    var cannon_body;
    var captain;
    var pool;
    var bird;

    //Global booleans
    var inMotion = false; //Is the captain flying

    function collide_obstacles(){
        // Handle collision with obstacles

    }

    //Returns velocity with respect to current gunpowder level
    function getVelocity()
    {
        var x_position = slider_button.x - slider_box.x; //Determine x position of slider button within box
        var percentage = x_position / (slider_box.width - slider_button.width); //Determine percentage of gunpowder bar filled
        return percentage * MAX_VELOCITY; //Determine velocity
    }

    function disableControls()
    {
        inMotion = true;
        crank_knob.inputEnabled = false;
        slider_button.inputEnabled = false;
        fire_button.inputEnabled = false;
    }

    function enableControls()
    {
        inMotion = false;
        crank_knob.inputEnabled = true;
        slider_button.inputEnabled = true;
        fire_button.inputEnabled = true;
    }

    function drawCannon_captain() {

        var cb_x = 80, cb_y = 506;
        var cs_x = cb_x - 14, cs_y = cb_y - 6;

        captain = game.addAsset(cb_x - 3, cb_y - 5, 'captain');
        captain.rotation = CAPTAIN_DEFAULT;
        captain.pivot = new PIXI.Point(16, 61);
        captain.animations.add('flying', [0,1,2,3,4,5,6,7], 5, true);
        captain.animations.play('flying');

        cannon_body = game.addAsset(cb_x, cb_y, 'cannon_body');
        cannon_body.anchor.setTo(0.42, 0.70);
        cannon_body.rotation = CANNON_DEFAULT;

        game.addAsset(cs_x, cs_y, 'cannon_stand');
    }

    function drawObstacles(){
        game.obstacles = pgame.add.group();
        game.obstacles.enableBody = true;

        // Add pool
        pool = game.addAsset(590, 330, 'pool');
        pool.scale.setTo(0.7,0.7);

        // Add bird
        bird = game.obstacles.create(pgame.world.centerX, 300, 'bird');

        // Two animations, flying left and right.
        bird.animations.add('left', [0,1,2,3,4], 10, true);
        bird.animations.add('right', [5,6,7,8,9], 10, true);

        // Add water jet
        var waterjet = game.obstacles.create(400, 290, 'waterjet');
        waterjet.scale.setTo(1,1);
        waterjet.body.immovable = true;
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
    }


    function initControls()
    {
        ////Initialize Angle Crank////
        crank = game.addAsset(90, 609, 'crank');
        crank_knob = game.addAsset(crank.x, crank.y, 'crank_knob');

        crank.scale.setTo(0.8, 0.8);
        crank.anchor.setTo(0.5, 0.5);

        crank_knob.scale.setTo(0.8, 0.8);
        crank_knob.anchor.setTo(0.5, 0.5);
        crank_knob.pivot = new PIXI.Point(-49, -1);
        crank_knob.inputEnabled = true;
        crank_knob.input.useHandCursor = true;

        crank_noise_sfx = pgame.add.audio('crank_noise');

        ////Initialize Gunpowder Slider////
        slider_box = game.addAsset(SLIDER_X_POS, SLIDER_Y_POS, 'slider_box'); //Load slider button
        slider_bar = game.addAsset(SLIDER_X_POS+13, SLIDER_Y_POS+20, 'slider_bar'); //Load slider button
        slider_button = game.addAsset(SLIDER_X_POS, SLIDER_Y_POS+5, 'slider_button'); //Load slider box
        //Set up input handler
        slider_button.inputEnabled = true;
        slider_button.input.enableDrag(false);
        slider_button.input.allowVerticalDrag = false;
        slider_button.input.useHandCursor = true;
        slider_button.input.boundsSprite = slider_box;

        ////Initialize Fire Button////
        fire_button = pgame.add.button(640, 573, 'fire_button', function() {
            if (!inMotion) {
                disableControls();
                captain.body.gravity.y = 800;

                //Velocity determined by current slider and crank positions
                var velocity = getVelocity();
                var angle = captain.rotation;

                //Need rotation to get velocity_x and velocity_y values from velocity
                var velocity_x = velocity * Math.cos(angle + CAPTAIN_ANGLE_OFFSET);
                var velocity_y = velocity * Math.sin(angle + CAPTAIN_ANGLE_OFFSET);
                captain.body.velocity.setTo(velocity_x, velocity_y);
            }
        }, this, null, null, 1, 0);

        fire_button.input.useHandCursor = true;
        var button_click_sfx = pgame.add.audio('button_click');
        fire_button.setDownSound(button_click_sfx);
    }

    this.init = function() {
        drawBackgrounds();
        initControls();
        drawCannon_captain();
        drawObstacles();

        //Set up world physics
        pgame.physics.arcade.enable(captain);
        captain.body.collideWorldBounds = true;
    };

    this.defaultUpdate = function()
    {
        if (!inMotion) {
            /////Slider Functionality///////
            //If slider button is being dragged, fill slider box with bar
            if (slider_button.input.pointerDragged())
                slider_bar.width = slider_button.x - slider_box.x;

            /////Crank Functionality//////
            var current_angle = Phaser.Math.ceilTo(cannon_body.angle); //Current angle of cannon body
            var previous_crank_angle = crank.rotation; //Angle of crank prior to change
            //If crank knob is being selected, determine rotations
            if (crank_knob.input.pointerDown()) {
                //Find angle between crank knob and crank center
                var click = pgame.input.activePointer;
                var angle = Phaser.Math.angleBetween(crank.x, crank.y, click.x, click.y);

                //Rotate crank and cannon accordingly. Block if 90 or 0 degrees is reached. Do nothing is no change in angleg
                if ((angle != previous_crank_angle) && (current_angle != -62 || angle < 0) && (current_angle != 27 || angle > 0)) {
                    crank_knob.rotation = crank.rotation = angle;
                    captain.rotation = CAPTAIN_DEFAULT + angle / 4;
                    cannon_body.rotation = CANNON_DEFAULT + angle / 4; //cannon max is 90, min is 0

                    //Play crank sound effect
                    crank_noise_sfx.play('', 0, 1, false, false);
                }
            }
        }
        else {
            //////Determine collisions//////
            pgame.physics.arcade.collide(captain, game.controlBoard);
            pgame.physics.arcade.collide(captain, game.obstacles, collide_obstacles);
        }


    }

};
