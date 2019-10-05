import {DungeonPlayer} from "../DungeonPlayer";
import {Door} from "../Door";
import Point from "../Point";
import {MessageBox} from "../MessageBox";

export default class DungeonLevel1 extends Phaser.State {
  private player: DungeonPlayer;
  private door: Door;
  private messageBox: MessageBox;

  constructor(sprite: Phaser.Sprite) {
    super();
    this.player = new DungeonPlayer();
    this.door = new Door(new Point(5, 5));
    this.messageBox = null;
  }

  public create(game: Phaser.Game) {
    game.add.image(0, 0, 'dungeonlevel1', 0);

    game.add.bitmapText(50, 180, 'Carrier Command', "Dungeon Level 1", 5);
    this.game.add.button(5, 5, 'button', () => {
      game.state.start('PlayerRoom');
    }, this, 2, 1, 0);

    this.player.create(game);
    this.door.create(game);
    this.addMessageBox(game, 'je suis enfermay ! Je dois sortir!');
  }

  public update(game: Phaser.Game) {
    if (null !== this.messageBox) {
      if (this.messageBox.update(game)) {
        this.messageBox = null;
      };
      return;
    }
    this.player.update(game);
    this.door.update(game);
  }

  private addMessageBox(game: Phaser.Game, jeSuisEnfermay: string) {
    this.messageBox = new MessageBox(jeSuisEnfermay);
    this.messageBox.create(game);
  }
}
