
export default class Lamp {

    private sprite: Phaser.Sprite;
    private name: string;
    private price: number;

    public create(game: Phaser.Game, x: number, y: number) {
        this.name = 'Lamp Lava DRF';
        this.price = 12;
        this.sprite = game.add.sprite(x, y, 'lamp-lava');
        this.sprite.scale.setTo(0.1, 0.1);
    }
}
