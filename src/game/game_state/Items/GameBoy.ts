
import {ItemToSell} from "./ItemToSell";

export default class GameBoy extends ItemToSell {

    public create(game: Phaser.Game) {
        this.name = 'Game boy';
        this.price = 25;
        if (!this.sold) {
            this.sprite = game.add.sprite(this.x, this.y, 'game_boy');
            this.sprite.inputEnabled = true;
            this.sprite.events.onInputDown.add(this.sell, this);
        }
        super.create(game);
    }
}
