import {AbstractDungeonLevel} from "./AbstractDungeonLevel";
import {DLC} from "../DLCs";
import Point from "../Point";
import TilemapLevel from "../TilemapLevel";
import PlayerRoom from "./PlayerRoom";

export default class DungeonLevel4 extends AbstractDungeonLevel {
  public LEVEL_NUMBER = 4;
  constructor() {
    super();
    this.tilemap = new TilemapLevel(this, this.tilemapProperties);
  }

  public create(game: Phaser.Game) {
    super.create(game);
    this.displayDLCButton();
  }

  getDlcCallback(game: Phaser.Game, dlc: DLC) {
    this.defaultDlcCallback(game, dlc);
  }

  getLevelName(): string {
    return 'level4';
  }

  getStartPosition(): Point {
    return new Point(7, 6);
  }
}
