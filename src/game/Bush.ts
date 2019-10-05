import {Tile} from "./Tile";
import {TILE_SIZE} from "../app";

export class Bush extends Tile {
  create(game: Phaser.Game, normalGroup: Phaser.Group, evilGroup: Phaser.Group) {
    const variant = this.randomIntFromInterval(1, 2);
    let spriteName = '';
    let evilSpriteName = '';

    switch (variant) {
      case 1:
        spriteName = 'bush';
        evilSpriteName = 'evil_bush';
        break;
      case 2:
        spriteName = 'bush2';
        evilSpriteName = 'evil_bush2';
        break;
    }


    this.normalSprite = game.add.sprite(this.position.x * TILE_SIZE, this.position.y * TILE_SIZE, spriteName);
    normalGroup.add(this.normalSprite);
    this.evilSprite = game.add.sprite(this.position.x * TILE_SIZE, this.position.y * TILE_SIZE, evilSpriteName);
    evilGroup.add(this.evilSprite);
  }

  randomIntFromInterval(min,max) // min and max included
  {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  isAllowedForPlayer(): boolean {
    return false;
  }

  isAllowedForCoin(): boolean {
    return false;
  }
}
