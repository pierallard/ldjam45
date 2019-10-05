import {ItemToSell} from "./ItemToSell";

export default class Playboy extends ItemToSell{

    public create(game: Phaser.Game, x: number, y: number) {
        this.name = 'Playboy magazine Nabila <3';
        this.price = 3;
        this.sprite = game.add.sprite(x, y, 'playboy_magazine');
        this.sprite.scale.setTo(0.05, 0.05);
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(this.sell, this);
    }
}
