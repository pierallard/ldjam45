import {AbstractDungeonLevel} from "./AbstractDungeonLevel";
import {DLC} from "../DLCs";
import Point from "../Point";
import TilemapLevel from "../TilemapLevel";
import PlayerRoom from "./PlayerRoom";

export default class DungeonLevel2 extends AbstractDungeonLevel {
  constructor() {
    super();
    this.tilemap = new TilemapLevel(this, this.tilemapProperties);
  }

  getDlcCallback(game: Phaser.Game, dlc: DLC) {
    this.defaultDlcCallback(game, dlc);
  }

  getLevelName(): string {
    return 'level2';
  }

  getStartPosition(): Point {
    return new Point(7, 6);
  }
}
