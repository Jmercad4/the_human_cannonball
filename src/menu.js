ajtxz_hcgame.Menu = function () {
    var pgame = this;

    //buttons
    var enter_button, level_button, howTo_button;
    var lvl_select_buttons = [null];
    //flags
    var howToOn = false, levelOn = false;
    //popups
    var howTo, level, background;
    var selection;

    var game = ajtxz_hcgame.game;

    function disableMainButtons() {
        enter_button.input.stop();
        level_button.input.stop();
        howTo_button.input.stop();
    }

    function enableMainButtons() {
        enter_button.input.start(0, true);
        level_button.input.start(0, true);
        howTo_button.input.start(0, true);
    }

    function enter() {
        pgame.state.start(game.selected_lvl+'_1');
        //pgame.state.start('5_3');
    }

    function levelSelection(sprite, pointer) {
        game.selected_lvl = parseInt(sprite.key.charAt(3));
        selection.x = lvl_select_buttons[game.selected_lvl].x + 17;
    }

    //Initialize Level Select Pop Up
    var LVL_POS_Y = 235;
    var lvl_pos = [null, new Phaser.Point(195, LVL_POS_Y), new Phaser.Point(327, LVL_POS_Y), new Phaser.Point(457, LVL_POS_Y),
        new Phaser.Point(587, LVL_POS_Y), new Phaser.Point(719, LVL_POS_Y), new Phaser.Point(849, LVL_POS_Y)];
    function lvlSelect() {
        level = pgame.add.sprite(pgame.world.centerX, pgame.world.centerY, 'lvl_select');
        level.anchor.setTo(0.5,0.5);
        level.inputEnabled = true;

        //Set up lvl buttons
        for (var i = 1; i <= 5; ++i) {
            if (game.unlocked_lvls[i]) {
                lvl_select_buttons.push(pgame.add.sprite(lvl_pos[i].x, lvl_pos[i].y, 'lvl' + i + '_button'));
                lvl_select_buttons[i].inputEnabled = true;
                lvl_select_buttons[i].input.useHandCursor = true;
                lvl_select_buttons[i].events.onInputDown.add(levelSelection, this);
            }
            //If level is locked display locked button
            else
                lvl_select_buttons.push(pgame.add.sprite(lvl_pos[i].x, lvl_pos[i].y, 'locked_button'));
        }

        selection = pgame.add.sprite(lvl_select_buttons[game.selected_lvl].x + 17, 280, 'life');

        disableMainButtons();
        levelOn = true;
    }

    //Initialize How To Play Pop Up
    function howToPlay() {
        howTo = pgame.add.sprite(pgame.world.centerX, pgame.world.centerY, 'how_to_play');
        howTo.anchor.setTo(0.5,0.5);
        howTo.inputEnabled = true;
        howTo.input.useHandCursor = true;

        disableMainButtons();
        howToOn = true;
     }

    this.preload = function() {
    }

    this.create = function() {
        //Add background
        background = pgame.add.image(0, 0, 'menu_background');
        background.inputEnabled = true;

        ////Add buttons////
        //Enter
        enter_button = pgame.add.button(pgame.world.centerX, pgame.world.centerY + 38, 'enter_button', enter, this, null, null, 1, 0);
        enter_button.input.useHandCursor = true;
        enter_button.anchor.setTo(0.5, 0.5);

        //Level Select
        level_button = pgame.add.button(pgame.world.centerX, pgame.world.centerY + 138, 'level_select_button', lvlSelect, this, null, null, 1, 0);
        level_button.input.useHandCursor = true;
        level_button.anchor.setTo(0.5, 0.5);

        //How to Play
        howTo_button = pgame.add.button(pgame.world.centerX, pgame.world.centerY + 238, 'how_to_play_button', howToPlay, this, null, null, 1, 0);
        howTo_button.input.useHandCursor = true;
        howTo_button.anchor.setTo(0.5, 0.5);
    }

    var nextInstr = 0, i = 0;
    var prevInstr;
    var instr_pos = [null, new Phaser.Point(185, 400), new Phaser.Point(305, 405), new Phaser.Point(235, 195),
        new Phaser.Point(652, 275), new Phaser.Point(337, 400), new Phaser.Point(460, 365)];
    this.update = function() {
        //If How to Play pop up is on
        if (howToOn) {
            //If pop up is clicked, cycle through instructions
            if (pgame.input.activePointer.isDown && howTo.input.pointerOver() && pgame.time.now > nextInstr)
            {
                nextInstr = pgame.time.now + 150; //timeout between clicks

                //Kill previous instruction if not instr1
                if (i != 0)
                    prevInstr.kill();

                //Determine next instruction, close pop up after final (6th) instruction
                i++;
                if (i > 6) {
                    howTo.kill();
                    enableMainButtons();
                    i = 0;
                    howToOn = false;
                }
                else
                    prevInstr = pgame.add.sprite(instr_pos[i].x, instr_pos[i].y, 'instr'+i);
            }
            //If outside is clicked, close popup
            else if (pgame.input.activePointer.isDown && pgame.time.now > nextInstr)
            {
                nextInstr = pgame.time.now + 150; //timeout between clicks

                if (i != 0)
                    prevInstr.kill();
                howTo.kill();
                i = 0;
                howToOn = false;
                enableMainButtons();
            }
        }

        //If Level Select pop up is on
        else if (levelOn) {
            //If outside is clicked, close popup
            if (pgame.input.activePointer.isDown && background.input.pointerOver()) {
                level.kill();
                for (var j = 5; j > 0; --j) {
                    lvl_select_buttons[j].kill();
                    lvl_select_buttons.pop();
                }
                selection.kill();
                enableMainButtons();
                levelOn = false;
            }

        }
    }
};
