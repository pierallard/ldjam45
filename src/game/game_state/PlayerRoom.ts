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
import {DLC} from "../DLCs";
import GameBoy from "./Items/GameBoy";
import PokemonCard from "./Items/PokemonCard";
import {GAME_HEIGHT, GAME_WIDTH, SCALE} from "../../app";
import MarioFigurine from "./Items/MarioFigurine";
import {ItemToSell} from "./Items/ItemToSell";
import Underpants from "./Items/Underpants";
import PlayerMessageBox from "../PlayerMessageBox";


export default class PlayerRoom extends Phaser.State {
  private itemsToSell: ItemsToSell;
  private wallet: Wallet;
  private walletGUI: WalletGUI;
  public dlc: DLC;
  private levelName: string;
  private background: Phaser.Image;
  private playerMessageBox: PlayerMessageBox;
  private haveDisplayedFirstMessage: boolean;

  constructor() {
    super();
    this.itemsToSell = new ItemsToSell();
    this.wallet = new Wallet();
    this.walletGUI = new WalletGUI(this.wallet);
    this.initSellableItems();
    this.playerMessageBox = new PlayerMessageBox();
    this.haveDisplayedFirstMessage = false;
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
    //game.add.image(0, 0, 'playerroombackground');
    /*this.game.add.button(250, 50, 'button', () => {
      game.state.start('DungeonLevel1');
    }, this, 2, 1, 0);*/

    this.playerMessageBox.create(game);
    if (!this.haveDisplayedFirstMessage) {
      this.playerMessageBox.addMessageBox(game, "Oh, I don't have money to buy\nthis DLC...\nI have to sell one of my stuff...");
      this.haveDisplayedFirstMessage = true;
    }
  }

  private initSellableItems() {
    const tshirt = new Tshirt(this.wallet, this, 35, 70);
    this.itemsToSell.add(tshirt);

    const britneyPoster = new BritneyPoster(this.wallet, this, 840, 15);
    this.itemsToSell.add(britneyPoster);

    const playboy = new Playboy(this.wallet, this, 109, 621);
    this.itemsToSell.add(playboy);

    const office = new Office(this.wallet, this, 1, 1);
    this.itemsToSell.add(office);

    const basket = new Basket(this.wallet, this, 731, 624);
    this.itemsToSell.add(basket);

    const lampLava = new Lamp(this.wallet, this, 701,139);
    this.itemsToSell.add(lampLava);

    const chair = new Chair(this.wallet, this, 820, 188);
    this.itemsToSell.add(chair);

    const bed = new Bed(this.wallet, this, 363 , 169);
    this.itemsToSell.add(bed);

    const gameBoy = new GameBoy(this.wallet, this, 130, 70);
    this.itemsToSell.add(gameBoy);

    const pokemonCard = new PokemonCard(this.wallet, this, 1, 116);
    this.itemsToSell.add(pokemonCard);

    const marioFigurine = new MarioFigurine(this.wallet, this, 130, 300);
    this.itemsToSell.add(marioFigurine);

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
    this.walletGUI.update(game);

    this.itemsToSell.items.forEach((itemToSell) => {
      itemToSell.update(game);
    });
  }

  public setdlcItem(dlc: DLC) {
    this.dlc = dlc;
  }

  public setCurrentLevelName(str: string) {
    this.levelName = str;
    console.log('Set current level name to ' + str);
  }

  public backToTheGame()
  {
    this.game.state.start('DungeonL' + this.levelName.substr(1));
  }
}
