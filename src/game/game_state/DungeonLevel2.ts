import {AbstractDungeonLevel} from "./AbstractDungeonLevel";
import {DLC, DLC_BUSINESSPACK} from "../DLCs";
import Point from "../Point";
import TilemapLevel from "../TilemapLevel";
import PlayerRoom from "./PlayerRoom";

export default class DungeonLevel2 extends AbstractDungeonLevel {
  private helloDisplayed: boolean;
  public LEVEL_NUMBER = 2;

  constructor() {
    super();
    this.tilemap = new TilemapLevel(this, this.tilemapProperties);
    this.helloDisplayed = false;
  }

  public create(game: Phaser.Game) {
    super.create(game);
    this.displayDLCButton();

    this.addMessageBox(game, "YOU: 'Hehehe... The DLC generator machine \n\nshould be in this building.'", () => {
      this.player.stopPlayer();
    });
  }

  public update(game: Phaser.Game):boolean {
    if (this.player.sprite.position.x > 216 && this.player.sprite.position.y > 50) {
      if (this.hasAchetedDlc(DLC_BUSINESSPACK)) {
        if (!this.helloDisplayed) {
          this.player.stopPlayer();
          this.addMessageBox(game, 'Oh, welcome comrade!', () => {
          });
        }
        this.helloDisplayed = true;
      } else {
        this.player.stopPlayer();
        this.player.sprite.position.x = 215;
        const messages = [
          "Sir you do not belong to this company SIR",
          "Get out or I call the security",
          "Who are you?",
          "This part of the building is for\n\ncompany members only!",
          "Maaaaaaayyyy I help you?"
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
