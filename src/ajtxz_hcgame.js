


ajtxz_hcgame.game = (function() {
    var self = this;

    //private static
    var test0 = 0;

    /**
     * Constructor
     */
    var game = function(options) {

        /**
         * Phaser game instance
         */
        var _pGame; //private

        var DEFAULT_WIDTH = 900;
        var DEFAULT_HEIGHT = 600;

        this.start = function() {
            console.log("starting game...");

            //Make sure Phaser is included
            if(typeof Phaser == 'undefined') {
                console.log('Phaser not installed');
                return;
            }

            _pGame = new Phaser.Game(DEFAULT_WIDTH, DEFAULT_HEIGHT, Phaser.AUTO, options.id);
            _pGame.state.add('boot', ajtxz_hcgame.bootState);
            _pGame.state.start('boot');

        };


    };

    return game;
}());



