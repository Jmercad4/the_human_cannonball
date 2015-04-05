ajtxz_hcgame.Menu = function () {
    var pgame = this;

    //buttons
    var enter_button, level_button, howTo_button;
    //flags
    var howToOn = false, levelOn = false;
    //popups
    var howTo, level;

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
        pgame.state.start("1_1");
    }

    function lvlSelect() {
        level = pgame.add.sprite(pgame.world.centerX, pgame.world.centerY, 'lvl_select');
        level.anchor.setTo(0.5,0.5);

        disableMainButtons();
        levelOn = true;
    }


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
        pgame.add.image(0, 0, 'menu_background');

        ////Add buttons////
        //Enter
        enter_button = pgame.add.button(pgame.world.centerX, pgame.world.centerY + 35, 'menu_start', enter);
        enter_button.input.useHandCursor = true;
        enter_button.scale.setTo(0.9,0.9);
        enter_button.anchor.setTo(0.5, 0.5);

        //Level Select
        level_button = pgame.add.button(pgame.world.centerX, pgame.world.centerY + 135, 'menu_level', lvlSelect);
        level_button.input.useHandCursor = true;
        level_button.scale.setTo(0.9,0.9);
        level_button.anchor.setTo(0.5, 0.5);

        //How to Play
        howTo_button = pgame.add.button(pgame.world.centerX, pgame.world.centerY + 235, 'menu_instr', howToPlay);
        howTo_button.input.useHandCursor = true;
        howTo_button.scale.setTo(0.9,0.9);
        howTo_button.anchor.setTo(0.5, 0.5);
    }

    var nextInstr = 0, i = 0;
    var prevInstr;
    var instr_pos = [null, new Phaser.Point(185, 400), new Phaser.Point(305, 405), new Phaser.Point(235, 195), new Phaser.Point(652, 275), new Phaser.Point(337, 400), new Phaser.Point(460, 365)];
    this.update = function() {
        if (howToOn) {
            if (pgame.input.activePointer.isDown && howTo.input.pointerOver() && pgame.time.now > nextInstr)
            {
                nextInstr = pgame.time.now + 150;

                if (i != 0)
                    prevInstr.kill();

                i++;
                if (i > 6) {
                    howTo.kill();
                    enableMainButtons();
                    i = 0;
                }
                else
                    prevInstr = pgame.add.sprite(instr_pos[i].x, instr_pos[i].y, 'instr'+i);
            }
            else if (pgame.input.activePointer.isDown && pgame.time.now > nextInstr)
            {
                nextInstr = pgame.time.now + 150;

                prevInstr.kill();
                howTo.kill();
                i = 0;
                enableMainButtons();
            }
        }

        else if (levelOn) {

        }
    }
};
