
export default class Basket {

    private sprite: Phaser.Sprite;
    private name: string;
    private price: number;

    public create(game: Phaser.Game, x: number, y: number) {
        this.name = 'basket 80\'s';
        this.price = 12;
        this.sprite = game.add.sprite(x, y, 'basket');
        this.sprite.scale.setTo(0.1, 0.1);
    }
}
