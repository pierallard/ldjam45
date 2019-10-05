import { Level1 } from "../../levels/Level1";
import { Stage } from "./Stage";

export default class Stage1 extends Stage {
  constructor() {
    super(new Level1());
  }

  onGameWin = () => this.game.state.start("Stage2");

  onGameOver() {
    this.game.state.restart(true);
  }
}
