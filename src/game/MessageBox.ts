export class MessageBox {
  private message;

  constructor(str: string) {
    this.message = str;
  }

  create(game: Phaser.Game) {
    const graphics = game.add.graphics(0, 0);
    graphics.beginFill(0xff0000);
    graphics.lineStyle(1, 0xffffff);
    graphics.drawRect(20.5, 150.5, 260, 20);

    game.add.bitmapText(50, 160, 'Carrier Command', this.message, 5);
  }
}
