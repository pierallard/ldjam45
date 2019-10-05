import {DungeonPlayer} from "../DungeonPlayer";
import {Door} from "../Door";
import Point from "../Point";
import {MessageBox} from "../MessageBox";
import Prison from "../Prison";
import MenuDLC from '../MenuDLC';

export default class DungeonLevel1 extends Phaser.State {
  private player: DungeonPlayer;
  private door: Door;
  private messageBox: MessageBox;
  private tilemap: Prison;
  private menuDLC: MenuDLC;

  constructor(sprite: Phaser.Sprite) {
    super();
    this.player = new DungeonPlayer();
    this.door = new Door(new Point(5, 5));
    this.messageBox = null;
    this.tilemap = new Prison();
    this.menuDLC = new MenuDLC(true);
  }

  public create(game: Phaser.Game) {
    this.tilemap.create(game);

    game.add.bitmapText(50, 180, 'Carrier Command', "Dungeon Level 1", 5);
    this.game.add.button(5, 5, 'button', () => {
      game.state.start('PlayerRoom');
    }, this, 2, 1, 0);

    this.player.create(game, this.tilemap);
    this.door.create(game);
    this.addMessageBox(game, 'je suis enfermay ! Je dois sortir!',() => {
      game.time.events.add(0.5  * Phaser.Timer.SECOND, () => {
        this.addMessageBox(game, 'Appuyez sur AZDS pour bougeay', () => {});
      });
    });

    this.menuDLC.create(game);
  }

  public update(game: Phaser.Game) {
    if (null !== this.messageBox) {
      if (this.messageBox.update(game)) {
        this.messageBox = null;
      }
      return;
    }
    this.player.update(game);
    this.door.update(game);
  }

  private addMessageBox(game: Phaser.Game, message: string, callback) {
    this.messageBox = new MessageBox(message, callback);
    this.messageBox.create(game);
  }
}
