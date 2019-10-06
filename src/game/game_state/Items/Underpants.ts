import {ItemToSell} from "./ItemToSell";

export default class Underpants extends ItemToSell{

    public create(game: Phaser.Game) {
        this.name = 'Dirty boxer shorts';
        this.price = 3;
        if (!this.sold) {
            this.sprite = game.add.sprite(this.x, this.y, 'underpants');
            this.sprite.inputEnabled = true;
            this.sprite.events.onInputDown.add(this.sell, this);
        }
    }
}
