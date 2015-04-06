ajtxz_hcgame.Preloader = function(){
    var game = ajtxz_hcgame.game;

    var percentage = 0; // Loading percentage
    var percentageText; // Text of loading percentage
    var preloadBar;     // Progress bar shape
    var captainLoad;

    this.preload= function () {
        // Display loading page picture
        game.addAsset(0, 0, 'boot_background');
        captainLoad = game.addAsset(this.world.centerX, 300, 'captain');
        captainLoad.anchor.setTo(0.5, 0.5);
        captainLoad.scale.setTo(1.5, 1.5);

        // Add progress bar
        preloadBar = this.add.graphics(this.world.centerX-60, this.world.centerY+103);
        preloadBar.lineStyle(10, 0x000000, 1);
        preloadBar.moveTo(0,0);
        preloadBar.lineTo(126, 0);

        // Initialize progress bar to 0 in length
        preloadBar.scale.x = 0;
        
        // Add text for progress indication
        this.add.text(this.world.centerX - 60, this.world.centerY+70, 'LOADING...', {font: '18pt Arial', fill: "#000000", stroke: "#ffffff"});
        percentageText = this.add.text(this.world.centerX + 83, this.world.centerY + 90, percentage + '%', {font:'14pt Arial'});

        ///////Load all assets for entire game//////////
        // Load Sprites
        game.loadAsset('cannon_body', 'cannon_body.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('cannon_stand', 'cannon_stand.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('level_background', 'level_background.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('control_board', 'control_board.png', ajtxz_hcgame.AssetType.IMAGE);
        this.load.spritesheet('fire_button', './assets/images/fire_button.png', 120, 76);
        game.loadAsset('slider_box', 'slider_box.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('slider_bar', 'slider_bar.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('slider_button', 'slider_button.png', ajtxz_hcgame.AssetType.IMAGE);
        this.load.spritesheet('bird', './assets/images/bird.png', 27, 32);
        this.load.spritesheet('waterjet', './assets/images/waterjet.png',83,140);
        game.loadAsset('crank', 'crank.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('crank_knob', 'crank_knob.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('pool', 'pool.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('life', 'life.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('menu_background', 'menu_background.png', ajtxz_hcgame.AssetType.IMAGE);
        this.load.spritesheet('enter_button', './assets/images/enter_button.png', 186, 55);
        this.load.spritesheet('level_select_button', './assets/images/level_select_button.png', 186, 55);
        this.load.spritesheet('how_to_play_button', './assets/images/how_to_play_button.png', 186, 55);
        game.loadAsset('lvl_tag_1_1', 'lvl_tag_1_1.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_tag_1_2', 'lvl_tag_1_2.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_tag_1_3', 'lvl_tag_1_3.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_tag_2_1', 'lvl_tag_2_1.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_tag_2_2', 'lvl_tag_2_2.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_tag_2_3', 'lvl_tag_2_3.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_tag_3_1', 'lvl_tag_3_1.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_tag_3_2', 'lvl_tag_3_2.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_tag_3_3', 'lvl_tag_3_3.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_tag_4_1', 'lvl_tag_4_1.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_tag_4_2', 'lvl_tag_4_2.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_tag_4_3', 'lvl_tag_4_3.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_tag_5_1', 'lvl_tag_5_1.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_tag_5_2', 'lvl_tag_5_2.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_tag_5_3', 'lvl_tag_5_3.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_intro_1_1', 'lvl_intro_1_1.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_intro_1_2', 'lvl_intro_1_2.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_intro_1_3', 'lvl_intro_1_3.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_intro_2_1', 'lvl_intro_2_1.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_intro_2_2', 'lvl_intro_2_2.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_intro_2_3', 'lvl_intro_2_3.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_intro_3_1', 'lvl_intro_3_1.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_intro_3_2', 'lvl_intro_3_2.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_intro_3_3', 'lvl_intro_3_3.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_intro_4_1', 'lvl_intro_4_1.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_intro_4_2', 'lvl_intro_4_2.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_intro_4_3', 'lvl_intro_4_3.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_intro_5_1', 'lvl_intro_5_1.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_intro_5_2', 'lvl_intro_5_2.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_intro_5_3', 'lvl_intro_5_3.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('how_to_play', 'how_to_play_popup.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('instr1', 'instr1.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('instr2', 'instr2.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('instr3', 'instr3.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('instr4', 'instr4.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('instr5', 'instr5.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('instr6', 'instr6.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl_select', 'lvl_select_popup.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('locked_button', 'locked_lvl.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl1_button', 'lvl1_unlocked.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl2_button', 'lvl2_unlocked.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl3_button', 'lvl3_unlocked.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl4_button', 'lvl1_unlocked.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('lvl5_button', 'lvl2_unlocked.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('exit_sign', 'exit_sign.png', ajtxz_hcgame.AssetType.IMAGE);
        this.load.spritesheet('ring_bg', './assets/images/ring_bg.png', 70, 124);
        this.load.spritesheet('ring_fg', './assets/images/ring_fg.png', 70, 124);
        game.loadAsset('ring_pole', 'ring_pole.png', ajtxz_hcgame.AssetType.IMAGE);


        //Load Sound Effects & Music
        this.load.audio('button_click', './assets/sfx/button_click.m4a');
        this.load.audio('crank_noise', './assets/sfx/crank_noise.m4a');
        this.load.audio('applause-medium_crowd', './assets/sfx/applause-medium_crowd.m4a');
        this.load.audio('applause-small_crowd', './assets/sfx/applause-small_crowd.m4a');
        this.load.audio('bird_hit', './assets/sfx/bird_hit.m4a');
        this.load.audio('cannon_blast', './assets/sfx/cannon_blast.m4a');
        this.load.audio('cheering-large_crowd', './assets/sfx/cheering-large_crowd.m4a');
        this.load.audio('crash_water', './assets/sfx/crash_water.m4a');
        this.load.audio('crash1', './assets/sfx/crash1.m4a');
        this.load.audio('crash2', './assets/sfx/crash2.m4a');
        this.load.audio('crowd_whisper', './assets/sfx/crowd_whisper.m4a');
        this.load.audio('fuse_burning', './assets/sfx/fuse_burning.m4a');
    };

    this.create= function () {
        //Call to main menu
        this.time.events.add(Phaser.Timer.SECOND/2, function(){this.state.start('menu');}, this);

    };

    this.loadUpdate= function () {
        // Update percentage of loading progress
        captainLoad.rotation += 0.1;
        percentage = this.load.progress;
        percentageText.setText(percentage  + "%");
        preloadBar.scale.x = percentage * 0.01;
    };
};
