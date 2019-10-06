
import {ItemToSell} from "./ItemToSell";

export default class Sock extends ItemToSell {

    public create(game: Phaser.Game) {
        this.name = 'sock';
        this.price = 1;
        if (!this.sold) {
            this.sprite = game.add.sprite(this.x, this.y, 'sock');
            this.sprite.inputEnabled = true;
            this.sprite.events.onInputDown.add(this.sell, this);
        }
        super.create(game);
    }
}
