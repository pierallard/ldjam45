import {AbstractDungeonLevel} from "./AbstractDungeonLevel";
import {DLC, DLC_BUSINESSPACK} from "../DLCs";
import Point from "../Point";
import TilemapLevel from "../TilemapLevel";
import PlayerRoom from "./PlayerRoom";

export default class DungeonLevel2 extends AbstractDungeonLevel {
  private helloDisplayed: boolean;
  private showBeginningMessage: boolean;
  public LEVEL_NUMBER = 2;

  constructor() {
    super();
    this.tilemap = new TilemapLevel(this, this.tilemapProperties);
    this.showBeginningMessage = true;
    this.helloDisplayed = false;
  }

  public create(game: Phaser.Game) {
    super.create(game);
    this.displayDLCButton();

    if (this.showBeginningMessage) {
      this.showBeginningMessage = false;
      this.addMessageBox(game, "YOU: 'Hehehe... The DLC generator machine \n\nshould be in this building.'", () => {
        this.player.stopPlayer();
      });
    }
  }

  public update(game: Phaser.Game):boolean {
    if (this.player.sprite.position.x > 216 && this.player.sprite.position.y > 50) {
      if (this.hasAchetedDlc(DLC_BUSINESSPACK)) {
        if (!this.helloDisplayed) {
          this.player.stopPlayer();
          this.addMessageBox(game, "Secretary: 'Oh, welcome comrade!'", () => {
          });
        }
        this.helloDisplayed = true;
      } else {
        this.player.stopPlayer();
        this.player.sprite.position.x = 215;
        const messages = [
          "Secretary: 'Sir you do not belong to\n\nthis company SIR'",
          "Secretary: 'Get out or I call\n\nthe security'",
          "Secretary: 'Who are you?'",
          "Secretary: 'This part of the building\n\nis for company members only!'",
          "Secretary: 'Maaaaaaayyyy I help you?'"
        ];
        this.addMessageBox(game, messages[Math.floor(Math.random() * messages.length)], () => {});
      }
    }
    return super.update(game);
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
