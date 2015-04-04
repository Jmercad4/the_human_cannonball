/**
 *
 *
 */

var ajtxz_hcgame = {

    AssetType : {
        AUDIO: 0,
        IMAGE: 1
    },

    //Game Instance
    game: {},

    //True only when game is started
    initialized : false,


    start: function (opt) {

        var options = (function () {
            return $.extend({}, {
                //DEFAULT OPTIONS
                DEBUG: false,    //Display debug info to console
                width: 1000,
                height: 670

            }, opt || {});
        }());

        this.game = new ajtxz_hcgame.game(options);
        this.game.init();


        this.initialized = true;
    }

}




