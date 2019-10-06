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
      this.addMessageBox(game, 'je suis enfermay ! Je dois sortir!', () => {
        this.player.stopPlayer();
        game.time.events.add(0.5 * Phaser.Timer.SECOND, () => {
          this.player.stopPlayer();
          this.addMessageBox(game, 'Appuyez sur AZDS pour bougeay', () => {
          });
        });
      });
    }

    this.paypal = game.add.image(0, 0, 'paypal');
    this.paypal.visible = false;
  }

  public getDlcCallback(game: Phaser.Game, dlc: DLC) {
    if (!this.paypalAlreadyMontred) {
      this.paypalAlreadyMontred = true;
      this.paypal.visible = true;
      this.cursor.setEnabled(false);
      game.add.tween(this.cursor).to({
        x: 156,
        y: 101
      }, 2 * Phaser.Timer.SECOND, Phaser.Easing.Default, true);
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
        this.addMessageBox(game, 'Appuyay sur Entray pour crochtay la porte', () => {
        });
      }
    }
    return true;
  }
}
