import {ItemToSell} from "./ItemToSell";

export default class Playboy extends ItemToSell{

    public create(game: Phaser.Game) {
        this.name = 'Playboy magazine Nabila <3';
        this.price = 3;
        if (!this.sold) {
            this.sprite = game.add.sprite(this.x, this.y, 'playboy_magazine');
            this.sprite.inputEnabled = true;
            this.sprite.events.onInputDown.add(this.sell, this);
        }
        super.create(game);
    }
}
