
export default class Playboy {

    private sprite: Phaser.Sprite;
    private name: string;
    private price: number;

    public create(game: Phaser.Game, x: number, y: number) {
        this.name = 'Playboy magazine Nabila <3';
        this.price = 12;
        this.sprite = game.add.sprite(x, y, 'playboy_magazine');
        this.sprite.scale.setTo(0.05, 0.05);


    }
}
