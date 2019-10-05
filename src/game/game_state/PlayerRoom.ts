
import Tshirt from "./Items/Tshirt";
import Lamp from "./Items/Lamp";
import Wallet from "./Kapitalism/Wallet";
import WalletGUI from "./Kapitalism/WalletGUI";

export default class PlayerRoom extends Phaser.State {
  private sprite: Phaser.Sprite;
  private wallet: Wallet;
  private walletGUI: WalletGUI;

  private tshirt: Tshirt;
  private lampLava: Lamp;

  constructor() {
    super();
    this.tshirt = new Tshirt();
    this.lampLava = new Lamp();
    this.wallet = new Wallet();
    this.walletGUI = new WalletGUI(this.wallet);
  }

  public create(game: Phaser.Game) {

    this.walletGUI.create(game);
    //game.add.image(0, 0, 'playerroombackground');
    this.game.add.button(5, 5, 'button', () => {
      game.state.start('DungeonLevel1');
    }, this, 2, 1, 0);




    this.sprite = game.add.sprite(50, 50, 'normal_hero');
    this.tshirt.create(game, 90, 90);
    this.lampLava.create(game, 200, 90);
  }

  public update(game: Phaser.Game) {
    this.walletGUI.update(game);

  }
}
