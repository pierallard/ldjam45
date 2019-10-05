import Point from "./Point";
import {Activable} from "./Activable";
import DungeonLevel1 from "./game_state/DungeonLevel1";
import {TILE_SIZE} from "../app";

export class DigicodableDoor implements Activable {
  private position: Point;
  private level: DungeonLevel1;

  constructor(level: DungeonLevel1, point: Point) {
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
  }
}
