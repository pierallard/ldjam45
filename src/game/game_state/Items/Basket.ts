import {ItemToSell} from "./ItemToSell";

export default class Basket extends ItemToSell{

    public create(game: Phaser.Game, x: number, y: number) {
        this.name = 'basket 80\'s';
        this.price = 70;
        this.sprite = game.add.sprite(x, y, 'basket');
        this.sprite.scale.setTo(0.2, 0.2);
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(this.sell, this);
    }
}
