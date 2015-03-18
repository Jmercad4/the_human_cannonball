

ajtxz_hcgame.game = (function() {

    /**
     * static constants
     */
    //
    //var DEFAULT_WIDTH = 900;
    //var DEFAULT_HEIGHT = 600;

    /**
     * Constructor for our game wrapper
     */
    var game = function(options) {
        var self = this;

        //Expose options object
        this.options = options;

        /**
         * Phaser game instance
         */
        var _pGame;
        //this.getPGame = function(){ return _pGame; }

        this.log = function(msg) {
            if(options.DEBUG) {
                console.log('%c ajtxz: ' + msg, 'background: #c0392b; color: white');
            }
        }

        /**
         * Convenience call for other states to load assets
         * @param key   unique key
         * @param filename  filename without path
         * @param type  ajtxz_hcgame.AssetType
         */
        this.loadAsset = function(key, filename, type) {
            if (typeof type === "undefined") {
                type = ajtxz_hcgame.AssetType.IMAGE;
            }

            var aType = (type == ajtxz_hcgame.AssetType.IMAGE) ? "images" : "audio";
            var addr = 'assets/' + aType + "/" + filename;

            if (type === ajtxz_hcgame.AssetType.IMAGE) {
                _pGame.load.image(key,addr);
            }

            //TODO add audio type condition

        };


        this.addAsset = function(x, y, key) {
            return _pGame.add.sprite(x, y, key);
        };

        this.init = function() {
            self.log("starting game...");

            //Make sure Phaser is included
            if(typeof Phaser == 'undefined') {
                console.log('Phaser not installed');
                return;
            }

            _pGame = new Phaser.Game(options.width, options.height, Phaser.AUTO, options.id);

            //_pGame.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            _pGame.state.add('boot', new ajtxz_hcgame.bootState);
            _pGame.state.add('lvl1_1', new ajtxz_hcgame.level1_1);
            _pGame.state.start('boot');

        };


    };

    return game;
}());



