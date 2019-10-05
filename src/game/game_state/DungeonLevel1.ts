import {DungeonPlayer} from "../DungeonPlayer";
import {Door} from "../Door";
import Point from "../Point";
import {MessageBox} from "../MessageBox";
import Prison from "../Prison";
import MenuDLC from '../MenuDLC';
import {Pie} from "../Pie";
import {DLCItem} from "../DLCList";
import PlayerRoom from "./PlayerRoom";
import TilemapsProperties from "../TilemapsProperties";
import {Cursor} from "./Cursor";
import {SCALE, TILE_SIZE} from "../../app";

export default class DungeonLevel1 extends Phaser.State {
  private player: DungeonPlayer;
  private messageBox: MessageBox;
  private tilemap: Prison;
  private tilemapProperties: TilemapsProperties;
  private menuDLC: MenuDLC;
  private showDoorMessage: boolean;
  private pie: Pie;
  private showBeginningMessage: boolean;
  private cursor: Cursor;
  private paypal: Phaser.Image;
  private paypalAlreadyMontred: boolean;

  constructor(sprite: Phaser.Sprite) {
    super();
    this.tilemapProperties = new TilemapsProperties();
    this.player = new DungeonPlayer(new Point(1, 2));
    this.messageBox = null;
    this.tilemap = new Prison(this, this.tilemapProperties);
    this.showDoorMessage = true;
    this.showBeginningMessage = true;
    this.pie = null;
    this.menuDLC = new MenuDLC(true);
    this.paypalAlreadyMontred = false;
  }

  public create(game: Phaser.Game) {
    this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    this.game.scale.setUserScale(SCALE, SCALE);

    this.game.renderer.renderSession.roundPixels = true;
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

    this.tilemap.create(game);

    this.player.create(game, this.tilemap);
    if (this.showBeginningMessage) {
      this.showBeginningMessage = false;

      this.addMessageBox(game, 'je suis enfermay ! Je dois sortir!', () => {
        game.time.events.add(0.5 * Phaser.Timer.SECOND, () => {
          this.addMessageBox(game, 'Appuyez sur AZDS pour bougeay', () => {
          });
        });
      });
    }

    this.menuDLC.create(game, (dlcItem: DLCItem) => {
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
    });

    this.paypal = game.add.image(0, 0, 'paypal');
    this.paypal.visible = false;

    this.cursor = new Cursor(game);
    this.game.add.existing(this.cursor);
  }

  public update(game: Phaser.Game) {
    this.cursor.update2(game);
    if (null !== this.messageBox) {
      if (this.messageBox.update(game)) {
        this.messageBox = null;
      }
      return;
    }
    if (null !== this.pie) {
      if (this.pie.update(game)) {
        this.pie = null;
      }
      return;
    }
    this.player.update(game);
    if (this.showDoorMessage && this.tilemap.getActivable(this.player.getPosition()) instanceof Door) {
      this.showDoorMessage = false;
      this.addMessageBox(game, 'Appuyay sur Entray pour crochtay la porte', () => {
      });
    }
  }

  public addMessageBox(game: Phaser.Game, message: string, callback) {
    this.messageBox = new MessageBox(message, callback);
    this.messageBox.create(game);
  }

  public addPie(game: Phaser.Game, position: Point, duration: number, callback: any) {
    this.pie = new Pie(position, duration, callback);
    this.pie.create(game);
  }

  public displayDLCButton() {
    this.menuDLC.displayButton();
  }

  public hasAchetedDlc(name): boolean {
    return this.menuDLC.dlcIsAcheted(name);
  }
}
