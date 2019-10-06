
import {ItemToSell} from "./ItemToSell";

export default class Tshirt extends ItemToSell {

    public create(game: Phaser.Game) {
        this.name = 'South park tshirt';
        this.price = 12;
        if (!this.sold) {
            this.sprite = game.add.sprite(this.x, this.y, 'tshirt');
            this.sprite.inputEnabled = true;
            this.sprite.events.onInputDown.add(this.sell, this);
        }
        super.create(game);
    }
}
