import {AbstractDungeonLevel} from "./AbstractDungeonLevel";
import {DLCItem} from "../DLCList";
import Point from "../Point";
import TilemapLevel from "../TilemapLevel";

export default class DungeonLevel2 extends AbstractDungeonLevel {
  constructor() {
    super();
    this.tilemap = new TilemapLevel(this, this.tilemapProperties);
  }

  getDlcCallback(game: Phaser.Game, dlcItem: DLCItem) {

  }

  getLevelName(): string {
    return 'level2';
  }

  getStartPosition(): Point {
    return new Point(7, 8);
  }
}
