import { Game, BitmapText } from "phaser-ce";
import { Coin } from "./Coin";
import {PlayableCoin} from "./PlayableCoin";

export class CoinCounter {
  private textBlock: Phaser.Graphics;
  private text: BitmapText;
  private coins: Coin[];
  private playableCoin: PlayableCoin;
  private isEvil: boolean = false;

  constructor(coins: Coin[], playableCoin: PlayableCoin) {
    this.coins = coins;
    this.playableCoin = playableCoin;
  }

  create = (game: Game, group: Phaser.Group) => {
    this.textBlock = game.add.graphics(0, 0);
    this.textBlock.beginFill(0x000000, 0.5);
    this.textBlock.drawRect(
      0,
      game.height - 15,
      120,
      15
    );
    this.textBlock.fixedToCamera = true;
    this.textBlock.alpha = 0;
    group.add(this.textBlock);

    this.text = game.add.bitmapText(3, game.height - 10, "Carrier Command", "", 5, group);
    this.text.fixedToCamera = true;
    this.text.align = 'center';
    group.add(this.text);
  };

  update = () => {
    this.textBlock.alpha = 1;

    let coinAliveCount = 0;
    for (const coin of this.coins) {
        if (coin.isAlive()) {
            coinAliveCount++;
        }
    }
    if (this.playableCoin.isAlive()) {
      coinAliveCount++;
    }

    let s = coinAliveCount > 1 ? 's' : '';

    this.text.setText(coinAliveCount + (this.isEvil ? " coin"+s+" still alive" : " coin"+s+" to collect"));
    this.text.updateText();
  };

  setGood = () => {
    this.isEvil = false;
    this.update();
  };

  setEvil = () => {
    this.isEvil = true;
    this.update();
  };
}
