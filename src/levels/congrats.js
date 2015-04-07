ajtxz_hcgame.congrats = function () {

    var pgame = this;

    this.preload = function() {
    }

    this.create = function() {
        var congrats_screen = pgame.add.button(0, 0, 'congrats_screen', function() {pgame.state.start('menu');});
        congrats_screen.input.useHandCursor = true;
    }

    this.update = function() {
    }
};