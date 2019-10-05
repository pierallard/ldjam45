
import Tshirt from "./Items/Tshirt";
import Lamp from "./Items/Lamp";
import Chair from "./Items/Chair";
import Basket from "./Items/Basket";
import Office from "./Items/Office";
import Wallet from "./Kapitalism/Wallet";
import WalletGUI from "./Kapitalism/WalletGUI";
import Playboy from "./Items/Playboy";
import ItemsToSell from "./Items/ItemsToSell";
import BritneyPoster from "./Items/BritneyPoster";

export default class PlayerRoom extends Phaser.State {
  private sprite: Phaser.Sprite;
  private wallet: Wallet;
  private walletGUI: WalletGUI;

  private itemsToSell: ItemsToSell;
  private lampLava: Lamp;
  private chair: Chair;
  private basket: Basket;
  private office: Office;
  private playboy: Playboy;

  constructor() {
    super();
    this.itemsToSell = new ItemsToSell();
    this.lampLava = new Lamp();
    this.chair = new Chair();
    this.basket = new Basket();
    this.office = new Office();
    this.playboy = new Playboy();

    this.wallet = new Wallet();
    this.walletGUI = new WalletGUI(this.wallet);
  }

  public create(game: Phaser.Game) {
    this.setupItems(game);
    this.walletGUI.create(game);
    //game.add.image(0, 0, 'playerroombackground');
    this.game.add.button(250, 50, 'button', () => {
      game.state.start('DungeonLevel1');
    }, this, 2, 1, 0);

    this.sprite = game.add.sprite(50, 50, 'normal_hero');
    this.lampLava.create(game, 1, 120);
    this.chair.create(game, 70, 90);
    this.basket.create(game, 70, 1);
    this.office.create(game, 1, 1);
    this.playboy.create(game, 1, 70);

  }

  private setupItems(game: Phaser.Game) {
    const tshirt = new Tshirt(this.wallet);
    tshirt.create(game, 35, 70);
    this.itemsToSell.add(tshirt);

    const britneyPoster = new BritneyPoster(this.wallet);
    britneyPoster.create(game, 70, 40);
    this.itemsToSell.add(britneyPoster);
  }

  public update(game: Phaser.Game) {
    this.walletGUI.update(game);

  }
}
