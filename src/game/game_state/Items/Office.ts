
export default class Office {

    private sprite: Phaser.Sprite;
    private name: string;
    private price: number;

    public create(game: Phaser.Game, x: number, y: number) {
        this.name = 'Scandinavian office';
        this.price = 12;
        this.sprite = game.add.sprite(x, y, 'office');
        this.sprite.scale.setTo(0.1, 0.1);
    }
}
