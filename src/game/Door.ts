import Point from "./Point";
import {TILE_SIZE} from "../app";
import {Activable} from "./Activable";

export class Door implements Activable {
  private position: Point;
  private sprite: Phaser.Sprite;

  constructor(point: Point) {
    this.position = point;
  }

  create(game: Phaser.Game) {
    this.sprite = game.add.sprite(
      Door.getRealPosition(this.position).x,
      Door.getRealPosition(this.position).y,
      'bloc_box',
      0
    );
  }

  getPosition(): Point {
    return this.position;
  }

  update(game: Phaser.Game) {

  }

  doAction() {
    console.log('Try to open the door!');
  }

  private static getRealPosition(point: Point) {
    return new Point(
      point.x * TILE_SIZE,
      point.y * TILE_SIZE
    );
  }
}
