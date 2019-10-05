import Point from "./Point";
import {TILE_SIZE} from "../app";

export class Door {
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

  update(game: Phaser.Game) {

  }

  private static getRealPosition(point: Point) {
    return new Point(
      point.x * TILE_SIZE,
      point.y * TILE_SIZE
    );
  }
}
