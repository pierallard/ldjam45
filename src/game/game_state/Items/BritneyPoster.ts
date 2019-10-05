
export default class BritneyPoster {

    private sprite: Phaser.Sprite;
    private name: string;
    private price: number;

    public create(game: Phaser.Game, x: number, y: number) {
        this.name = 'Britney Baby One More Time Poster';
        this.price = 5;
        this.sprite = game.add.sprite(x, y, 'britney_poster');
        this.sprite.scale.setTo(0.2, 0.2);


    }
}
