import {Door} from "../Door";
import Point from "../Point";
import Prison from "../Prison";
import {DLCItem} from "../DLCList";
import PlayerRoom from "./PlayerRoom";
import TilemapsProperties from "../TilemapsProperties";
import {AbstractDungeonLevel} from "./AbstractDungeonLevel";

export default class DungeonLevel1 extends AbstractDungeonLevel {
  private showDoorMessage: boolean;
  private showBeginningMessage: boolean;
  private paypal: Phaser.Image;
  private paypalAlreadyMontred: boolean;

  constructor() {
    super();
    this.tilemapProperties = new TilemapsProperties();
    this.tilemap = new Prison(this, this.tilemapProperties, this.player);
    this.showDoorMessage = true;
    this.showBeginningMessage = true;
    this.paypalAlreadyMontred = false;
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

  public getDlcCallback(game: Phaser.Game, dlcItem: DLCItem) {
    if (!this.paypalAlreadyMontred) {
      this.paypalAlreadyMontred = true;
      this.paypal.visible = true;
      this.cursor.enablez(false);
      game.add.tween(this.cursor).to({
        x: 156,
        y: 101
      }, 2 * Phaser.Timer.SECOND, Phaser.Easing.Default, true);
      game.time.events.add(2 * Phaser.Timer.SECOND, () => {
        game.state.start('PlayerRoom');
        this.cursor.enablez(true);

        const playerRoom = game.state.states['PlayerRoom'];
        (<PlayerRoom>playerRoom).setdlcItem(dlcItem);
        dlcItem.achete();
      });
    } else {
      game.state.start('PlayerRoom');
      this.cursor.enablez(true);

      const playerRoom = game.state.states['PlayerRoom'];
      (<PlayerRoom>playerRoom).setdlcItem(dlcItem);
      dlcItem.achete();
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
