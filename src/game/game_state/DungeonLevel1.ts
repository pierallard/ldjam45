import {DungeonPlayer} from "../DungeonPlayer";
import {Door} from "../Door";
import Point from "../Point";
import {MessageBox} from "../MessageBox";
import Prison from "../Prison";
import MenuDLC from '../MenuDLC';
import {Pie} from "../Pie";
import {DLCItem} from "../DLCList";

export default class DungeonLevel1 extends Phaser.State {
  private player: DungeonPlayer;
  private messageBox: MessageBox;
  private tilemap: Prison;
  private menuDLC: MenuDLC;
  private showDoorMessage: boolean;
  private pie: Pie;
  private showBeginningMessage: boolean;

  constructor(sprite: Phaser.Sprite) {
    super();
    this.player = new DungeonPlayer(new Point(1, 2));
    this.messageBox = null;
    this.tilemap = new Prison(this);
    this.showDoorMessage = true;
    this.showBeginningMessage = true;
    this.pie = null;
    this.menuDLC = new MenuDLC(false);
  }

  public create(game: Phaser.Game) {
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
      // TODO Cinematic
      game.state.start('PlayerRoom');
    });
  }

  public update(game: Phaser.Game) {
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
}
