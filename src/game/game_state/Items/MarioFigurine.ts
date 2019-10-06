
import {ItemToSell} from "./ItemToSell";

export default class MarioFigurine extends ItemToSell {

    public create(game: Phaser.Game) {
        this.name = 'Mario figurine';
        this.price = 6;
        if (!this.sold) {
            this.sprite = game.add.sprite(this.x, this.y, 'mario_figurine');
            this.sprite.scale.setTo(0.3, 0.3);
            this.sprite.inputEnabled = true;
            this.sprite.events.onInputDown.add(this.sell, this);
        }
    }
}
