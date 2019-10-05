import {ItemToSell} from "./ItemToSell";

export default class Lamp extends ItemToSell{

    public create(game: Phaser.Game, x: number, y: number) {
        this.name = 'Lamp Lava DRF';
        this.price = 12;
        this.sprite = game.add.sprite(x, y, 'lamp-lava');
        this.sprite.scale.setTo(0.1, 0.1);
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(this.sell, this);
    }
}
