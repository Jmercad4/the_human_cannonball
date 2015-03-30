

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
    var CAPTAIN_ANGLE_OFFSET = -Math.PI/2.0;
    var MAX_VELOCITY = 1000; //NEED TO FIND BEST VALUE
    var cb_x = 80, cb_y = 506;
    var cs_x = cb_x - 14, cs_y = cb_y - 6;
    var CAP_INITIAL_X = cb_x - 3, CAP_INITIAL_Y = cb_y - 5;

    //Game
    var game = ajtxz_hcgame.game;

    //SFX
    var SFX;

    //Groups
    var character_group, obstacle_group;

    //Controls
    var crank, crank_knob;
    var fire_button;
    var slider_button, slider_box, slider_bar;

    //Objects
    var cannon_body, captain, pool;
    var bird, waterjet;
    var life1, life2, life3;

    //Global flags
    var inMotion = false; //Is the captain flying

    function reloadLevel(levelNum){
        if(levelNum == 1)
            pgame.state.start('lvl1_1');
    }

    function killLife(){
        if(life3.alive == true)
            life3.kill();
        else if(life2.alive == true)
            life2.kill();
        else if(life1.alive == true)
            life1.kill();
    }

    function handleCollision(object1, object2) {
        if(object2.key != 'pool')
            killLife();

        if (object2.key == 'control_board' || object2.key == 'bird') {
            var selection = Math.random() % 2;
            if (selection == 0)
                SFX.crash1.play('', 0, 1, false, false);
            else
                SFX.crash2.play('', 0, 1, false, false);

            if (object2.key == 'bird')
                SFX.bird_hit.play('', 0, 1, false, false);
        }
        else if (object2.key == 'waterjet' || object2.key == 'pool') {
            SFX.crash_water.play('', 0, 1, false, false);
        }

        SFX.crowd_whisper.play('', 0, 0.2, false, false);

        captain.body.velocity = 0;
        captain.body.gravity.y = 0;

        captain.destroy();
        reinitCaptain();

        enableControls();
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
        //fire_button.inputEnabled = false;
    }

    function enableControls()
    {
        inMotion = false;
        crank_knob.inputEnabled = true;
        slider_button.inputEnabled = true;
        //fire_button.inputEnabled = true;
    }

    function initCaptain() {
        captain = character_group.create(CAP_INITIAL_X, CAP_INITIAL_Y, 'captain');
        captain.rotation = CAPTAIN_DEFAULT + crank.rotation / 4;
        captain.pivot = new PIXI.Point(16, 61);
        captain.animations.add('flying', [0,1,2,3,4,5,6,7], 5, true);
        captain.animations.play('flying');
    }

    function reinitCaptain() {
        initCaptain();
        pgame.physics.enable(character_group, Phaser.Physics.ARCADE);
        captain.body.setSize(3, 5, 10.5, 30.5); //fix bounding box
    }

    function initCannon() {
        cannon_body = game.addAsset(cb_x, cb_y, 'cannon_body');
        cannon_body.anchor.setTo(0.42, 0.70);
        cannon_body.rotation = CANNON_DEFAULT;

        game.addAsset(cs_x, cs_y, 'cannon_stand');
    }

    function initObstacles(){
        // Add pool
        pool = obstacle_group.create(690, 472, 'pool');
        pool.scale.setTo(0.7,0.7);

        // Add bird
        bird = obstacle_group.create(pgame.world.centerX, 300, 'bird');
        // Two animations, flying left and right.
        bird.animations.add('left', [0,1,2,3,4], 10, true);
        bird.animations.add('right', [5,6,7,8,9], 10, true);

        // Add water jet
        waterjet = obstacle_group.create(400, 349, 'waterjet');
        waterjet.scale.setTo(1.3,1.3);
        waterjet.animations.add('shooting', [0,1,2], 2, true);
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


    function initControls()
    {
        ////Initialize Angle Crank////
        crank = game.addAsset(105, 609, 'crank');
        crank_knob = game.addAsset(crank.x, crank.y, 'crank_knob');

        crank.scale.setTo(0.8, 0.8);
        crank.anchor.setTo(0.5, 0.5);

        crank_knob.scale.setTo(0.8, 0.8);
        crank_knob.anchor.setTo(0.5, 0.5);
        crank_knob.pivot = new PIXI.Point(-49, -1);
        crank_knob.inputEnabled = true;
        crank_knob.input.useHandCursor = true;

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
        fire_button = pgame.add.button(635, 573, 'fire_button', function() {
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
        fire_button.setDownSound(SFX.button_click);
    }

    function initLives(){
        // Initialize lives
        life1 = game.addAsset(pgame.world.width-170, pgame.world.height-97, 'life');
        life1.scale.setTo(0.55, 0.55);
        life2 = game.addAsset(pgame.world.width-109, pgame.world.height-97, 'life');
        life2.scale.setTo(0.55, 0.55);
        life3 = game.addAsset(pgame.world.width-51, pgame.world.height-97, 'life');
        life3.scale.setTo(0.55, 0.55);
    }

    this.init = function() {
        game.addAsset(0, 0, 'level_background');
        character_group = pgame.add.group();
        obstacle_group = pgame.add.group();
        game.controlBoard = obstacle_group.create(0, pgame.world.height - 110, 'control_board');

        SFX = {
            bird_hit: pgame.add.audio('bird_hit'),
            crash1: pgame.add.audio('crash1'),
            crash2: pgame.add.audio('crash2'),
            crash_water: pgame.add.audio('crash_water'),
            button_click: pgame.add.audio('button_click'),
            crank_noise: pgame.add.audio('crank_noise'),
            applause_medium_crowd: pgame.add.audio('applause-medium_crowd'),
            applause_small_crowd: pgame.add.audio('applause-small_crowd'),
            cheering_large_crowd: pgame.add.audio('cheering_large_crowd'),
            cannon_blast: pgame.add.audio('cannon_blast'),
            crowd_whisper: pgame.add.audio('crowd_whisper'),
            fuse_burning: pgame.add.audio('fuse_burning')
        }

        initControls();
        initCaptain();
        initCannon();
        initObstacles();
        initLives();

        //Set up world physics
        pgame.physics.enable(character_group, Phaser.Physics.ARCADE);
        captain.body.setSize(3, 5, 10.5, 30.5); //fix bounding box
        pgame.physics.enable(obstacle_group, Phaser.Physics.ARCADE);
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
                    SFX.crank_noise.play('', 0, 1, false, false);
                }
            }
        }
        else {
            //Rotate body of captain with parabola
            captain.rotation = captain.body.angle - CAPTAIN_ANGLE_OFFSET;

            //////Determine collisions//////
            pgame.physics.arcade.overlap(character_group, obstacle_group, handleCollision);

            if(life1.alive == false)
                reloadLevel(1);
        }


    }

};
