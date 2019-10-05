/// <reference path="../dist/lib/phaser.d.ts"/>

import Boot from "./game/game_state/Boot";
import Preload from "./game/game_state/Preload";
import Stage1 from "./game/game_state/Stage1";
import Stage2 from "./game/game_state/Stage2";
import Stage3 from "./game/game_state/Stage3";
import {Credits} from "./game/game_state/Credits";
import {Logo} from "./game/game_state/Logo";
import DungeonLevel1 from "./game/game_state/DungeonLevel1";
import PlayerRoom from "./game/game_state/PlayerRoom";

export const DEBUG = true;

export const SCALE = 4;
export const GAME_WIDTH = 1200;
export const GAME_HEIGHT = 800;
export const TILE_SIZE = 16;

class SimpleGame extends Phaser.Game {
    constructor() {
        super({
            width: GAME_WIDTH / SCALE,
            height: GAME_HEIGHT / SCALE,
            renderer: Phaser.CANVAS,
            parent: null,
            state: 'content',
            transparent: false,
            antialias: false,
            physicsConfig: false
        });

        this.antialias = false;
        this.state.add('Boot', Boot);
        this.state.add('Preload', Preload);
        this.state.add('DungeonLevel1', DungeonLevel1);
        this.state.add('PlayerRoom', PlayerRoom);
        this.state.add('Stage1', Stage1);
        this.state.add('Stage2', Stage2);
        this.state.add('Stage3', Stage3);
        this.state.add('Credits', Credits);
        this.state.add('Logo', Logo);
        this.state.start('Boot');
    }
}

window.onload = () => {
    new SimpleGame();
};
