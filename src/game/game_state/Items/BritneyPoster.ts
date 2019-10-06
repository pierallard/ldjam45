import {ItemToSell} from "./ItemToSell";

export default class BritneyPoster extends ItemToSell{

    public create(game: Phaser.Game) {
        this.name = 'Britney Baby One More Time Poster';
        this.price = 5;
        if (!this.sold) {
            this.sprite = game.add.sprite(this.x, this.y, 'britney_poster');
            this.sprite.scale.setTo(0.5, 0.5);
            this.sprite.inputEnabled = true;
            this.sprite.events.onInputDown.add(this.sell, this);
        }
    }
}
