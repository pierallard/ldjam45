export class Cursor extends Phaser.Sprite {
  private enable: boolean;

  constructor(game: Phaser.Game) {
    super(game, 0, 0, 'cursor');
    this.enable = true;
  }

  create(game: Phaser.Game) {
    game.add.sprite(game.world.centerX, game.world.centerY, 'cursor');
    this.anchor.set(0.5, 0.5);
  }

  update2(game: Phaser.Game) {
    if (this.enable) {
      this.x = game.input.mousePointer.x;
      this.y = game.input.mousePointer.y;
    }
  }

  setEnabled(b: boolean) {
    this.enable = b;
  }
}
