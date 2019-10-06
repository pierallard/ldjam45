export class Cursor extends Phaser.Sprite {
  private enable: boolean;

  constructor(game: Phaser.Game, isDefault: boolean = false) {
    super(game, 0, 0, isDefault ? 'cursordefault' : 'cursor');
    this.enable = true;
  }

  create(game: Phaser.Game) {
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
