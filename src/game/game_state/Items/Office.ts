import {ItemToSell} from "./ItemToSell";

export default class Office extends ItemToSell{

    public create(game: Phaser.Game, x: number, y: number) {
        this.name = 'Scandinavian office';
        this.price = 200;
        this.sprite = game.add.sprite(x, y, 'office');
        this.sprite.scale.setTo(0.1, 0.1);
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(this.sell, this);
    }
}
