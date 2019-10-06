import {ItemToSell} from "./ItemToSell";

export default class Bed extends ItemToSell{

    public create(game: Phaser.Game) {
        this.name = 'Scandinavian bed';
        this.price = 300;
        if (!this.sold) {
            this.sprite = game.add.sprite(this.x, this.y, 'bed');
            this.sprite.inputEnabled = true;
            this.sprite.events.onInputDown.add(this.sell, this);
        }
    }
}
