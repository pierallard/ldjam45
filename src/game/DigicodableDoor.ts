import Point from "./Point";
import {Activable} from "./Activable";
import {AbstractDungeonLevel} from "./game_state/AbstractDungeonLevel";
import {TILE_SIZE} from "../app";

export class DigicodableDoor implements Activable {
  private position: Point;
  private level: AbstractDungeonLevel;

  constructor(level: AbstractDungeonLevel, point: Point) {
    this.level = level;
    this.position = point;
  }

  create(game: Phaser.Game) {
  }

  getPosition(): Point {
    return this.position;
  }

  update(game: Phaser.Game) {

  }

  doAction(game: Phaser.Game) {
    if (this.level.hasAchetedDlc('Hacker DLC Pack Premium')) {
      this.level.goToLevel3(game);
      return;
    }
    this.level.addMessageBox(game, 'NOOB', () => {
    });
  }
}
