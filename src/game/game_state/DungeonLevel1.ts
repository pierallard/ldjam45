import {Door} from "../Door";
import Point from "../Point";
import TilemapLevel from "../TilemapLevel";
import {DLC} from "../DLCs";
import {AbstractDungeonLevel} from "./AbstractDungeonLevel";

export default class DungeonLevel1 extends AbstractDungeonLevel {
  public LEVEL_NUMBER = 1;
  private showDoorMessage: boolean;
  private showBeginningMessage: boolean;
  private paypal: Phaser.Image;
  private paypalAlreadyMontred: boolean;

  constructor() {
    super();
    this.tilemap = new TilemapLevel(this, this.tilemapProperties);
    this.showDoorMessage = true;
    this.showBeginningMessage = true;
    this.paypalAlreadyMontred = false;
    this.showDLCButton = true;
  }

  getLevelName(): string {
    return 'level1';
  }

  public getStartPosition(): Point {
    return new Point(1, 2);
  }

  public create(game: Phaser.Game) {
    super.create(game);

    if (this.showBeginningMessage) {
      this.showBeginningMessage = false;
      this.addMessageBox(game, "YOU: 'Ahhh.. Lubrisoft. I must enter and \n\ndestroy their DLC generator!\n\n*Use arrow keys to move*'", () => {
        this.player.stopPlayer();
      });
    }

    this.paypal = game.add.image(0, 0, 'paypal');
    this.paypal.visible = false;

    if (this.paypalAlreadyMontred) {
      this.displayDLCButton();
    }
  }

  public getDlcCallback(game: Phaser.Game, dlc: DLC) {
    if (!this.paypalAlreadyMontred) {
      this.paypalAlreadyMontred = true;
      this.paypal.visible = true;
      game.time.events.add(2 * Phaser.Timer.SECOND, () => {
        this.defaultDlcCallback(game, dlc);
      });
    } else {
      this.defaultDlcCallback(game, dlc);
    }
  }

  public update(game: Phaser.Game) {
    if (super.update(game)) {
      if (this.showDoorMessage && this.tilemap.getActivable(this.player.getPosition()) instanceof Door) {
        this.player.stopPlayer();
        this.showDoorMessage = false;
        this.addMessageBox(game, "*Use ENTER key to interact with objects*", () => {
        });
      }
    }
    return true;
  }
}
