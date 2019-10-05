import { Stage } from "./Stage";
import {Level3} from "../../levels/Level3";
import {SoundManager} from "../../SoundManager";

export default class Stage3 extends Stage {
  constructor() {
    super(new Level3());
  }

  onGameWin() {
    SoundManager.setEvil(false);
    this.game.state.start("Credits");
  }

  onGameOver() {
    this.game.state.restart(true);
  }
}
