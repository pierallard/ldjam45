import {DungeonPlayer} from "../DungeonPlayer";
import {Door} from "../Door";
import Point from "../Point";
import {MessageBox} from "../MessageBox";
import Prison from "../Prison";
import {Pie} from "../Pie";

export default class DungeonLevel1 extends Phaser.State {
  private player: DungeonPlayer;
  private messageBox: MessageBox;
  private tilemap: Prison;
  private showDoorMessage: boolean;
  private pie: Pie;

  constructor(sprite: Phaser.Sprite) {
    super();
    this.player = new DungeonPlayer(new Point(1, 2));
    this.messageBox = null;
    this.tilemap = new Prison(this);
    this.showDoorMessage = true;
    this.pie = null;
  }

  public create(game: Phaser.Game) {
    this.tilemap.create(game);

    game.add.bitmapText(50, 180, 'Carrier Command', "Dungeon Level 1", 5);
    this.game.add.button(5, 5, 'button', () => {
      game.state.start('PlayerRoom');
    }, this, 2, 1, 0);

    this.player.create(game, this.tilemap);
    this.addMessageBox(game, 'je suis enfermay ! Je dois sortir!',() => {
      game.time.events.add(0.5  * Phaser.Timer.SECOND, () => {
        this.addMessageBox(game, 'Appuyez sur AZDS pour bougeay', () => {});
      });
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
}
