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
    initilized : false,

    start: function (opt) {

        var options = (function () {
            return $.extend({}, {
                //DEFAULT OPTIONS

            }, opt || {});
        }());

        this.game = new ajtxz_hcgame.game(options);
        this.game.init();


        this.initilized = true;
    }

}




