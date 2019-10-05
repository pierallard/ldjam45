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
import Bed from "./Items/Bed";
import {DLCItem} from "../DLCList";

export default class PlayerRoom extends Phaser.State {
  private itemsToSell: ItemsToSell;
  private sprite: Phaser.Sprite;
  private wallet: Wallet;
  private walletGUI: WalletGUI;
  private dlcItem: DLCItem;

  constructor() {
    super();
    this.itemsToSell = new ItemsToSell();
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
  }

  private setupItems(game: Phaser.Game) {
    const tshirt = new Tshirt(this.wallet);
    tshirt.create(game, 35, 70);
    this.itemsToSell.add(tshirt);

    const britneyPoster = new BritneyPoster(this.wallet);
    britneyPoster.create(game, 70, 40);
    this.itemsToSell.add(britneyPoster);

    const playboy = new Playboy(this.wallet);
    playboy.create(game, 1, 70);
    this.itemsToSell.add(playboy);

    const office = new Office(this.wallet);
    office.create(game, 1, 1);
    this.itemsToSell.add(office);

    const basket = new Basket(this.wallet);
    basket.create(game, 70, 1);
    this.itemsToSell.add(basket);

    const lampLava = new Lamp(this.wallet);
    lampLava.create(game, 1, 120);
    this.itemsToSell.add(lampLava);

    const chair = new Chair(this.wallet);
    chair.create(game, 70, 90);
    this.itemsToSell.add(chair);

    const bed = new Bed(this.wallet);
    bed.create(game, 130, 1);
    this.itemsToSell.add(bed);
  }

  public update(game: Phaser.Game) {
    this.walletGUI.update(game);

  }

  public setdlcItem(dlcItem: DLCItem) {
    this.dlcItem = dlcItem;
  }
}
