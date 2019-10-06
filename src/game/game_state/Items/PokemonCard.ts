
import {ItemToSell} from "./ItemToSell";

export default class PokemonCard extends ItemToSell {

    public create(game: Phaser.Game) {
        this.name = 'very rare pokemon card';
        this.price = 6;
        if (!this.sold) {
            this.sprite = game.add.sprite(this.x, this.y, 'pokemon_card');
            this.sprite.inputEnabled = true;
            this.sprite.events.onInputDown.add(this.sell, this);
        }
        super.create(game);
    }
}
