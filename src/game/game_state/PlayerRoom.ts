import Tshirt from "./Items/Tshirt";
import Lamp from "./Items/Lamp";
import Chair from "./Items/Chair";
import Basket from "./Items/Basket";
import Wallet from "./Kapitalism/Wallet";
import WalletGUI from "./Kapitalism/WalletGUI";
import Playboy from "./Items/Playboy";
import ItemsToSell from "./Items/ItemsToSell";
import BritneyPoster from "./Items/BritneyPoster";
import Bed from "./Items/Bed";
import {DLC, achete} from "../DLCs";
import GameBoy from "./Items/GameBoy";
import PokemonCard from "./Items/PokemonCard";
import {GAME_HEIGHT, GAME_WIDTH} from "../../app";
import Sock from "./Items/Sock";
import {ItemToSell} from "./Items/ItemToSell";
import Underpants from "./Items/Underpants";
import PlayerMessageBox from "../PlayerMessageBox";
import {AbstractDungeonLevel} from "./AbstractDungeonLevel";


export default class PlayerRoom extends Phaser.State {
  public itemsToSell: ItemsToSell;
  private wallet: Wallet;
  private walletGUI: WalletGUI;
  public dlc: DLC;
  private levelName: string;
  private background: Phaser.Image;
  public playerMessageBox: PlayerMessageBox;
  private haveDisplayedFirstMessage: boolean;
  blackScren: Phaser.Graphics;
  private gameEnded: boolean;

  constructor() {
    super();
    this.itemsToSell = new ItemsToSell();
    this.wallet = new Wallet();
    this.walletGUI = new WalletGUI(this.wallet);
    this.initSellableItems();
    this.playerMessageBox = new PlayerMessageBox();
    this.haveDisplayedFirstMessage = false;
    this.gameEnded = false;
  }

  public create(game: Phaser.Game) {
    this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    this.game.renderer.renderSession.roundPixels = false;
    this.game.width = GAME_WIDTH;
    this.game.height = GAME_HEIGHT;
    this.game.renderer.resize(GAME_WIDTH, GAME_HEIGHT);

    this.background = game.add.image(0, 0, 'backgroundplayerroom');

    this.drawItems(game);
    this.walletGUI.create(game);
    game.add.image(1060, 196, 'laptop');

    this.playerMessageBox.create(game);
    if (!this.haveDisplayedFirstMessage) {
      this.playerMessageBox.addMessageBox(game, "Oh, I don't have money to buy\nthis DLC...\nI have to sell one of my stuff...");
      this.haveDisplayedFirstMessage = true;
    }

    this.blackScren = this.game.add.graphics(0, 0);
    this.blackScren.beginFill(0x000000);
    this.blackScren.drawRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    let timing = Phaser.Timer.SECOND * 2;
    if (this.gameEnded) {
      timing = Phaser.Timer.SECOND * 5;
    }
    game.add.tween(this.blackScren).to({alpha: 0}, timing, Phaser.Easing.Default, true);
    game.time.events.add(timing, () => {
      if (!this.gameEnded) {
        this.blackScren.visible = false;
      } else {
        this.playerMessageBox.addMessageBox(game, "This game was cool! I started it\nwith nothing... but now my\nlife is empty!");
        game.time.events.add(timing, () => {
          game.add.tween(this.blackScren).to({alpha: 1}, timing, Phaser.Easing.Default, true);
          game.time.events.add(timing, () => {
            this.goCredits(game);
          });
        });
      }
    });
  }

  public goCredits(game: Phaser.Game) {
    game.state.start('Credits');
  }

  private initSellableItems() {
    const tshirt = new Tshirt(this.wallet, this, 144, 340);
    this.itemsToSell.add(tshirt);

    const britneyPoster = new BritneyPoster(this.wallet, this, 140, 15);
    this.itemsToSell.add(britneyPoster);

    const playboy = new Playboy(this.wallet, this, 109, 601);
    this.itemsToSell.add(playboy);

    const basket = new Basket(this.wallet, this, 780, 624);
    this.itemsToSell.add(basket);

    const lampLava = new Lamp(this.wallet, this, 701,139);
    this.itemsToSell.add(lampLava);

    const chair = new Chair(this.wallet, this, 820, 188);
    this.itemsToSell.add(chair);

    const bed = new Bed(this.wallet, this, 363 , 169);
    this.itemsToSell.add(bed);

    const gameBoy = new GameBoy(this.wallet, this, 15, 457);
    this.itemsToSell.add(gameBoy);

    const pokemonCard = new PokemonCard(this.wallet, this, 5, 125);
    this.itemsToSell.add(pokemonCard);

    const sock = new Sock(this.wallet, this, 700, 488);
    this.itemsToSell.add(sock);

    const underpants = new Underpants(this.wallet, this, 720, 330);
    this.itemsToSell.add(underpants);
  }

    private drawItems(game: Phaser.Game) {
        this.itemsToSell.items.forEach((item: ItemToSell) => {
            //console.log(item);
            item.create(game);
        });
    }

  public update(game: Phaser.Game) {
    if (this.gameEnded) {
      return;
    }

    this.walletGUI.update(game);

    this.itemsToSell.items.forEach((itemToSell) => {
      itemToSell.update(game);
    });
  }

  public setdlcItem(dlc: DLC) {
    this.dlc = dlc;
    this.walletGUI.setDLC(dlc);
  }

  public setCurrentLevelName(str: string) {
    this.levelName = str;
    console.log('Set current level name to ' + str);
  }

  public backToTheGame()
  {
    this.blackScren.visible = true;
    this.game.add.tween(this.blackScren).to({alpha: 1}, Phaser.Timer.SECOND * 2, Phaser.Easing.Default, true);
    this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
      this.wallet.remove(this.dlc.price);
      const name = 'DungeonL' + this.levelName.substr(1);
      achete(this.dlc.name);
      this.game.state.start(name);
      const dungeon = <AbstractDungeonLevel> this.game.state.states[name];
      dungeon.setDlcBuy(this.dlc);
    });
  }

  getWallet() {
    return this.wallet;
  }

  endGame() {
    this.gameEnded = true;
  }
}
