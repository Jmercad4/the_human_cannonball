

ajtxz_hcgame.bootState = function () {

    //ajtxz_hcgame.game instance !not phaser.game
    var game = ajtxz_hcgame.game;

    //Phaser game instance
    var pgame = this;

    this.init = function() {
        game.log("boot state: starting")

        this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
        if(game.options.maxScreen) {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.setScreenSize(true);
            this.stage.backgroundColor = '#ffffff';
        }

        pgame.physics.startSystem(Phaser.Physics.ARCADE);
    }

    this.preload = function() {

        if(ajtxz_hcgame.initialized) {
            // Load picture for loading page
            game.loadAsset('boot_background', 'boot_background.png', ajtxz_hcgame.AssetType.IMAGE);
            this.load.spritesheet('captain', './assets/images/captain.png', 26, 61);
        }
    }

    this.create = function() {
        this.state.start('preloader');
    }

    this.update = function() {
        //console.log("boot:update");
    }

}

