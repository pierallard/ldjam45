import Point from "./Point";
import {Activable} from "./Activable";
import DungeonLevel1 from "./game_state/DungeonLevel1";
import {DEBUG, TILE_SIZE} from "../app";
import {AbstractDungeonLevel} from "./game_state/AbstractDungeonLevel";

export class Secretary implements Activable {
  private position: Point;
  private level: AbstractDungeonLevel;
  private letPass: boolean = false;

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
    this.letPass = this.level.hasAchetedDlc('Business Man Skin Pack (Cosmetic)');
    console.log(this.letPass);
  }
}
