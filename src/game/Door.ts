import Point from "./Point";
import {TILE_SIZE} from "../app";
import {Activable} from "./Activable";

export class Door implements Activable {
  private position: Point;

  constructor(point: Point) {
    this.position = point;
  }

  create(game: Phaser.Game) {
  }

  getPosition(): Point {
    return this.position;
  }

  update(game: Phaser.Game) {

  }

  doAction() {
    console.log('Try to open the door!');
  }
}
