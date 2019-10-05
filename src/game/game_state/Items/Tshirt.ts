
export default class Tshirt {

    private sprite: Phaser.Sprite;
    private name: string;
    private price: number;

    public create(game: Phaser.Game, x: number, y: number) {
        this.name = 'South park tshirt';
        this.price = 12;
        this.sprite = game.add.sprite(x, y, 'tshirt');
        this.sprite.scale.setTo(0.05, 0.05);


    }
}
