import {ItemToSell} from "./ItemToSell";

export default class Bed extends ItemToSell{

    public create(game: Phaser.Game) {
        this.name = 'Scandinavian bed';
        this.price = 300;
        if (!this.sold) {
            this.sprite = game.add.sprite(this.x, this.y, 'bed');
            this.sprite.scale.setTo(0.8, 0.8);
            this.sprite.inputEnabled = true;
            this.sprite.events.onInputDown.add(this.sell, this);
        }
        super.create(game);
    }
}
