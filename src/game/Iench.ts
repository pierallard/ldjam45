import Point from "./Point";
import {Activable} from "./Activable";
import {AbstractDungeonLevel} from "./game_state/AbstractDungeonLevel";
import {DLC_ANIMALS} from "./DLCs";

export class Iench implements Activable {
  private position: Point;
  private level: AbstractDungeonLevel;

  constructor(level: AbstractDungeonLevel, point: Point) {
    this.level = level;
    this.position = point;
  }

  create(game: Phaser.Game)
  {
  }

  getPosition(): Point {
    return this.position;
  }

  doAction(game: Phaser.Game) {
    if (this.level.hasAchetedDlc(DLC_ANIMALS)) {
      this.level.addMessageBox(game, "Dog: 'Hello human! I often see people\n\nhere taping on this machine. They always\n\nstart by 'admin123', weird!'", () => {});
      (game.state.getCurrentState() as AbstractDungeonLevel).player.obtainPassword();
    } else {
      this.level.addMessageBox(game, "Dog: 'WAF WAF WAF! WAF!'", () => {});
    }
  }
}
