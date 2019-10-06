import {ItemToSell} from "./ItemToSell";

export default class Basket extends ItemToSell{

    public create(game: Phaser.Game) {
        this.name = 'basket 80\'s';
        this.price = 70;
        if (!this.sold) {
            this.sprite = game.add.sprite(this.x, this.y, 'basket');
            this.sprite.scale.setTo(0.3, 0.3);
            this.sprite.inputEnabled = true;
            this.sprite.events.onInputDown.add(this.sell, this);
        }
    }
}
