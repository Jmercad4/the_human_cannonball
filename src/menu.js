/*ajtxz_hcgame.menu = function () {
    var game = ajtxz_hcgame.game;

    // Use background.jpg
    // game.add.image(0, 0, 'menu_background');
    
    // Use game_title.png
    var title = game.add.image(game.world.centerX, game.world.centerY - 400, 'menu_title');
    title.anchor.setTo(0.5, 0.5);
    
    // Use play_button.png
    var start = game.add.button(game.world.centerX, game.world.centerY - 200, 'menu_start',this.playGame);
    start.anchor.setTo(0.5, 0.5);

    // Use lvl_button.png
    var level = game.add.button(game.world.centerX, game.world.centerY - 100, 'menu_level');
    level.anchor.setTo(0.5, 0.5);

    // Use instr_button.png
    var instr = game.add.button(game.world.centerX, game.world.centerY, 'menu_instr');
    instr.anchor.setTo(0.5, 0.5);

}


function playGame() {
    this.state.start("lvl1_1");
}
/*
function instruct() {
    game.state.start("");
}

function lvlSelect() {
    game.state.start("");
}
*/

ajtxz_hcgame.Menu = function () {
    var pgame = this;

    function playGame() {
        pgame.state.start("3_1");
    }
    /*
     function instruct() {
     game.state.start("");
     }

     function lvlSelect() {
     game.state.start("");
     }
     */

    this.preload = function() {
    }

    this.create = function() {
        //Add background
        pgame.add.image(0, 0, 'menu_background');

        ////Add buttons////
        //Enter
        var start = pgame.add.button(pgame.world.centerX, pgame.world.centerY + 35, 'menu_start', playGame);
        start.input.useHandCursor = true;
        start.scale.setTo(0.9,0.9);
        start.anchor.setTo(0.5, 0.5);

        //Level Select
        var level = pgame.add.button(pgame.world.centerX, pgame.world.centerY + 135, 'menu_level');
        level.input.useHandCursor = true;
        level.scale.setTo(0.9,0.9);
        level.anchor.setTo(0.5, 0.5);

        //How to Play
        var instr = pgame.add.button(pgame.world.centerX, pgame.world.centerY + 235, 'menu_instr');
        instr.input.useHandCursor = true;
        instr.scale.setTo(0.9,0.9);
        instr.anchor.setTo(0.5, 0.5);
    }

    this.update = function() {
    }
};
