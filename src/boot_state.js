

ajtxz_hcgame.bootState = function () {

    //ajtxz_hcgame.game instance !not phaser.game
    var game = ajtxz_hcgame.game;

    //Phaser game instance
    var pgame = this;

    this.init = function() {
        game.log("boot state: starting")
        pgame.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    }

    this.preload = function() {

        if(ajtxz_hcgame.initialized) {
            //TODO load boot screen assets: background + progress bar
            game.loadAsset('boot_logo', 'boot_logo.jpg', ajtxz_hcgame.AssetType.IMAGE);

            game.loadAsset('cannon_body', 'cannon_body.png', ajtxz_hcgame.AssetType.IMAGE);
            game.loadAsset('cannon_stand', 'cannon_stand.png', ajtxz_hcgame.AssetType.IMAGE);
            game.loadAsset('captain', 'captain.png', ajtxz_hcgame.AssetType.IMAGE);

            
        }

    }

    this.loadUpdate = function (e) {
        //TODO update progress bar here
        //console.log(e);
    }

    this.create = function() {
        game.addAsset(200,100,'boot_logo');

        //Call to main menu

        //simulate progress loading before going to next state
        setTimeout(function(){
            pgame.state.start('lvl1_1');
        }, 1000);

    }

    this.update = function() {
        //console.log("boot:update");
    }

    this.test = 4;


}
