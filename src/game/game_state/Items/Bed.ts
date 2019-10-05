import {ItemToSell} from "./ItemToSell";

export default class Bed extends ItemToSell{

    public create(game: Phaser.Game, x: number, y: number) {
        this.name = 'Scandinavian bed';
        this.price = 300;
        this.sprite = game.add.sprite(x, y, 'bed');
        this.sprite.scale.setTo(0.1, 0.1);
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(this.sell, this);
    }
}
