import {ItemToSell} from "./ItemToSell";

export default class Basket extends ItemToSell{

    public create(game: Phaser.Game) {
        this.name = 'basket 80\'s';
        this.price = 15;
        if (!this.sold) {
            this.sprite = game.add.sprite(this.x, this.y, 'basket');
            this.sprite.inputEnabled = true;
            this.sprite.events.onInputDown.add(this.sell, this);
        }
        super.create(game);
    }
}
