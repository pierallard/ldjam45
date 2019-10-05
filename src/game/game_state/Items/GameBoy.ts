
import {ItemToSell} from "./ItemToSell";

export default class GameBoy extends ItemToSell {

    public create(game: Phaser.Game, x: number, y: number) {
        this.name = 'Game boy';
        this.price = 40;
        this.sprite = game.add.sprite(x, y, 'game_boy');
        this.sprite.scale.setTo(0.1, 0.1);
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(this.sell, this);
    }
}
