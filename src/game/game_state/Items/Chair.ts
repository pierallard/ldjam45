import {ItemToSell} from "./ItemToSell";

export default class Chair extends ItemToSell{

    public create(game: Phaser.Game) {
        this.name = 'racing car chair';
        this.price = 12;
        if (!this.sold) {
            this.sprite = game.add.sprite(this.x, this.y, 'chair');
            this.sprite.scale.setTo(0.1, 0.1);
            this.sprite.inputEnabled = true;
            this.sprite.events.onInputDown.add(this.sell, this);
        }
    }
}
