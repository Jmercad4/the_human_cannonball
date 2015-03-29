ajtxz_hcgame.Preloader = function(){
    var game = ajtxz_hcgame.game;

    var percentage = 0; // Loading percentage
    var percentageText; // Text of loading percentage
    var preloadBar;     // Progress bar shape

    this.preload= function () {
        // Display loading page picture
        game.addAsset(this.world.centerX - 170,0,'boot_logo');

        // Add progress bar
        preloadBar = this.add.graphics(this.world.centerX-49,this.world.centerY+103);
        preloadBar.lineStyle(10, 0x000000, 1);
        preloadBar.moveTo(0,0);
        preloadBar.lineTo(126, 0);

        // Initialize progress bar to 0 in length
        preloadBar.scale.x = 0;
        
        // Add text for progress indication
        this.add.text(this.world.centerX - 50, this.world.centerY+70, 'LOADING...', {font: '18pt Arial', fill: "#000000", stroke: "#ffffff"});
        percentageText = this.add.text(this.world.centerX + 83, this.world.centerY + 90, percentage + '%', {font:'14pt Arial'});

        ///////Load all assets for entire game//////////
        // Load Sprites
        game.loadAsset('cannon_body', 'cannon_body.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('cannon_stand', 'cannon_stand.png', ajtxz_hcgame.AssetType.IMAGE);
        this.load.spritesheet('captain', './assets/images/captain.png', 26, 61);
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

        game.loadAsset('menu_title', 'menu_title.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('menu_start', 'menu_start.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('menu_level', 'menu_level.png', ajtxz_hcgame.AssetType.IMAGE);
        game.loadAsset('menu_instr', 'menu_instr.png', ajtxz_hcgame.AssetType.IMAGE);

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
        percentage = this.load.progress;
        percentageText.setText(percentage  + "%");
        preloadBar.scale.x = percentage * 0.01;
    };
};
