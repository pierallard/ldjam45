import Point from "./Point";
import {Activable} from "./Activable";
import {DEBUG, TILE_SIZE} from "../app";
import {AbstractDungeonLevel} from "./game_state/AbstractDungeonLevel";

export class Computer implements Activable {
  private position: Point;
  private crochetage: number;
  private level: AbstractDungeonLevel;

  constructor(level: AbstractDungeonLevel, point: Point) {
    this.level = level;
    this.position = point;
    this.crochetage = 0;
  }

  getPosition(): Point {
    return this.position;
  }

  doAction(game: Phaser.Game) {
  }
}
