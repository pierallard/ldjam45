
import {ItemToSell} from "./ItemToSell";

export default class Tshirt extends ItemToSell {

    public create(game: Phaser.Game) {
        this.name = 'South park tshirt';
        this.price = 12;
        if (!this.sold) {
            this.sprite = game.add.sprite(this.x, this.y, 'tshirt');
            this.sprite.scale.setTo(0.05, 0.05);
            this.sprite.inputEnabled = true;
            this.sprite.events.onInputDown.add(this.sell, this);
        }
    }
}
