import Point from "./Point";
import Sprite = Phaser.Sprite;
import {TILE_SIZE} from "../app";

export class Tile {
  protected position: Point;
  protected normalSprite: Sprite;
  protected evilSprite: Sprite;

  constructor(position: Point) {
    this.position = position;
  }

  create(game: Phaser.Game, normalGroup: Phaser.Group, evilGroup: Phaser.Group) {
    const random = Math.ceil(Math.random() * 2);
    this.normalSprite = game.add.sprite(this.position.x * TILE_SIZE, this.position.y * TILE_SIZE, 'basic_ground', random);
    normalGroup.add(this.normalSprite);

    this.evilSprite = game.add.sprite(this.position.x * TILE_SIZE, this.position.y * TILE_SIZE, 'evil_ground', random);
    evilGroup.add(this.evilSprite);
  }

  getPosition(): Point {
    return this.position;
  }

  isAllowedForPlayer(): boolean {
    return true;
  }

  isAllowedForCoin(): boolean {
    return true;
  }
}
