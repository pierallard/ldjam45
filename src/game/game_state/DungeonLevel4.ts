import {AbstractDungeonLevel} from "./AbstractDungeonLevel";
import {DLC} from "../DLCs";
import Point from "../Point";
import TilemapLevel from "../TilemapLevel";
import PlayerRoom from "./PlayerRoom";

export default class DungeonLevel4 extends AbstractDungeonLevel {
  public LEVEL_NUMBER = 4;
  private server: Phaser.Sprite;
  private showBeginningMessage: boolean;

  constructor() {
    super();
    this.tilemap = new TilemapLevel(this, this.tilemapProperties);
    this.showBeginningMessage = true;
  }

  public create(game: Phaser.Game) {
    super.create(game);
    this.displayDLCButton();
    this.server = game.add.sprite(4 * 16, 16, 'server');
    this.server.animations.add('NORMAL', [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    this.server.animations.add('EXPLOSE', [0, 1]);
    this.server.animations.play('NORMAL', 10, true);

    if (this.showBeginningMessage) {
      this.showBeginningMessage = false;
      this.addMessageBox(game, "YOU: 'I finally reached my\n\ndestination! I have to switch off this\n\nevil DLC machine!'", () => {
        this.player.stopPlayer();
      });
    }
  }

  getDlcCallback(game: Phaser.Game, dlc: DLC) {
    this.defaultDlcCallback(game, dlc);
  }

  public explose() {
    this.server.animations.play('EXPLOSE', 10, true);
  }

  getLevelName(): string {
    return 'level4';
  }

  getStartPosition(): Point {
    return new Point(7, 6);
  }
}
