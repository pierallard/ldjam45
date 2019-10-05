
import Tshirt from "./Items/Tshirt";
import Lamp from "./Items/Lamp";
import Chair from "./Items/Chair";
import Basket from "./Items/Basket";
import Office from "./Items/Office";
import Wallet from "./Kapitalism/Wallet";
import WalletGUI from "./Kapitalism/WalletGUI";
import Playboy from "./Items/Playboy";

export default class PlayerRoom extends Phaser.State {
  private sprite: Phaser.Sprite;
  private wallet: Wallet;
  private walletGUI: WalletGUI;

  private tshirt: Tshirt;
  private lampLava: Lamp;
  private chair: Chair;
  private basket: Basket;
  private office: Office;
  private playboy: Playboy;

  constructor() {
    super();
    this.tshirt = new Tshirt();
    this.lampLava = new Lamp();
    this.chair = new Chair();
    this.basket = new Basket();
    this.office = new Office();
    this.playboy = new Playboy();
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
    this.chair.create(game, 90, 150);
    this.basket.create(game, 90, 1);
    this.office.create(game, 1, 1);
    this.playboy.create(game, 1, 70);
  }

  public update(game: Phaser.Game) {
    this.walletGUI.update(game);

  }
}
