ajtxz_hcgame.game = function () {

    /**
     * static constants
     */
    //
    //var DEFAULT_WIDTH = 900;
    //var DEFAULT_HEIGHT = 600;

    /**
     * Constructor for our game wrapper
     */
    var game = function (options) {
        var self = this;

        //Expose options object
        this.options = options;

        /**
         * Phaser game instance
         */
        var _pGame;
        this.pgame = function () {
            return _pGame;
        }

        this.log = function (msg) {
            if (options.DEBUG) {
                console.log('%c ajtxz: ' + msg, 'background: #c0392b; color: white');
            }
        }

        this.unlocked_lvls = [null, true, false, false, false, false];

        this.selected_lvl = 1;

        this.captain = {};

        this.controlBoard = {};

        /**
         * Convenience call for other states to load assets
         * @param key   unique key
         * @param filename  filename without path
         * @param type  ajtxz_hcgame.AssetType
         */
        this.loadAsset = function (key, filename, type) {
            if (typeof type === "undefined") {
                type = ajtxz_hcgame.AssetType.IMAGE;
            }

            var aType = (type == ajtxz_hcgame.AssetType.IMAGE) ? "images" : "audio";
            var addr = 'assets/' + aType + "/" + filename;

            if (type === ajtxz_hcgame.AssetType.IMAGE) {
                _pGame.load.image(key, addr);
            }

        };


        this.addAsset = function (x, y, key) {
            return _pGame.add.sprite(x, y, key);
        };

        this.init = function () {
            console.log(document.cookie);

            if (document.cookie == '') {
                document.cookie = "lvl1=t";
                document.cookie = "lvl2=f";
                document.cookie = "lvl3=f";
                document.cookie = "lvl4=f";
                document.cookie = "lvl5=f";
            }
            
            //Restore unlocked levels
            var cookie_unlocked = document.cookie.split(';');
            for (var i = 1; i < 5; ++i) {
                if (cookie_unlocked[i].charAt(6) == 't')
                    this.unlocked_lvls[i+1] = true;
            }

            //Make sure Phaser is included
            if (typeof Phaser == 'undefined') {
                console.log('Phaser not installed');
                return;
            }

            _pGame = new Phaser.Game(options.width, options.height, Phaser.AUTO, options.id, null, false, true);

            //_pGame.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            _pGame.state.add('boot', new ajtxz_hcgame.bootState);
            _pGame.state.add('preloader', new ajtxz_hcgame.Preloader);
            _pGame.state.add('menu', new ajtxz_hcgame.Menu);
            _pGame.state.add('1_1', new ajtxz_hcgame.level1_1);
            _pGame.state.add('1_2', new ajtxz_hcgame.level1_2);
            _pGame.state.add('1_3', new ajtxz_hcgame.level1_3);
            _pGame.state.add('2_1', new ajtxz_hcgame.level2_1);
            _pGame.state.add('2_2', new ajtxz_hcgame.level2_2);
            _pGame.state.add('2_3', new ajtxz_hcgame.level2_3);
            _pGame.state.add('3_1', new ajtxz_hcgame.level3_1);
            _pGame.state.add('3_2', new ajtxz_hcgame.level3_2);
            _pGame.state.add('3_3', new ajtxz_hcgame.level3_3);
            _pGame.state.add('4_1', new ajtxz_hcgame.level4_1);
            _pGame.state.add('4_2', new ajtxz_hcgame.level4_2);
            _pGame.state.add('4_3', new ajtxz_hcgame.level4_3);
            _pGame.state.add('5_1', new ajtxz_hcgame.level5_1);
            _pGame.state.add('5_2', new ajtxz_hcgame.level5_2);
            _pGame.state.add('5_3', new ajtxz_hcgame.level5_3);
            _pGame.state.add('congrats', new ajtxz_hcgame.congrats);
            _pGame.state.start('boot');

        };

    };

    return game;
}();



