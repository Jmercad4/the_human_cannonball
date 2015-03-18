/**
 *
 *
 */

var ajtxz_hcgame = {

    "AssetType" : {
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
                maxScreen: true,    //Display game in max width + auto rescale
                DEBUG: false,    //Display debug info to console
                width: 1000,
                height: 600

            }, opt || {});
        }());

        this.game = new ajtxz_hcgame.game(options);
        this.game.init();


        this.initialized = true;
    }

}




