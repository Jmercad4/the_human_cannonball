ajtxz_hcgame.menu = function () {
    var game = ajtxz_hcgame.game;

    // Use background.jpg
    // game.add.image(0, 0, 'menu_background');
    
    var title = game.add.image(game.world.centerX, game.world.centerY - 400, 'menu_title');
    title.anchor.setTo(0.5, 0.5);
    var start = game.add.button(game.world.centerX, game.world.centerY - 200, 'menu_start',this.playGame);
    start.anchor.setTo(0.5, 0.5);
    var level = game.add.button(game.world.centerX, game.world.centerY - 100, 'menu_level');
    level.anchor.setTo(0.5, 0.5);
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
