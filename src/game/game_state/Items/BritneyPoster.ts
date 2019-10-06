import {ItemToSell} from "./ItemToSell";

export default class BritneyPoster extends ItemToSell{

    public create(game: Phaser.Game, x: number, y: number) {
        this.name = 'Britney Baby One More Time Poster';
        this.price = 5;
        this.sprite = game.add.sprite(x, y, 'britney_poster');
        this.sprite.scale.setTo(0.5, 0.5);
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(this.sell, this);
    }
}
