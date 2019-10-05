
import Tshirt from "./Items/Tshirt";
import Lamp from "./Items/Lamp";

export default class PlayerRoom extends Phaser.State {
  private sprite: Phaser.Sprite;

  private tshirt: Tshirt;
  private lampLava: Lamp;

  constructor() {
    super();
    this.tshirt = new Tshirt();
    this.lampLava = new Lamp();
  }

  public create(game: Phaser.Game) {
    game.add.image(0, 0, 'playerroombackground', 0);
    game.add.bitmapText(50, 180, 'Carrier Command', "Player Room", 5);
    this.game.add.button(5, 5, 'button', () => {
      game.state.start('DungeonLevel1');
    }, this, 2, 1, 0);
    this.sprite = game.add.sprite(50, 50, 'normal_hero');
    this.tshirt.create(game, 90, 90);
    this.lampLava.create(game, 200, 90);
  }

  public update(game: Phaser.Game) {

  }
}
