

ajtxz_hcgame.bootState = function () {

    //ajtxz_hcgame.game instance !not phaser.game
    var game = ajtxz_hcgame.game;

    this.preload = function() {
        console.log("boot:preload");

        if(ajtxz_hcgame.initilized) {
            //TODO load boot screen assets: background + progress bar
            game.loadAsset('background', 'background.jpg', ajtxz_hcgame.AssetType.IMAGE);
        }

    }

    this.loadUpdate = function (e) {
        //TODO update progress bar here
        //console.log(e);
    }

    this.create = function() {
        console.log("boot:create");
        game.addAsset(0,0,'background');


        //Call to game start

    }

    this.update = function() {
        //console.log("boot:update");
    }

    this.test = 4;


}
