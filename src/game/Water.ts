import Point from "./Point";
import {Activable} from "./Activable";
import {AbstractDungeonLevel} from "./game_state/AbstractDungeonLevel";

export class Water implements Activable {
  private position: Point;
  private level: AbstractDungeonLevel;

  constructor(level: AbstractDungeonLevel, point: Point) {
    this.level = level;
    this.position = point;
  }

  getPosition(): Point {
    return this.position;
  }

  doAction(game: Phaser.Game) {
    console.log('fontaine a eau');
  }
}
