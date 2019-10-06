export default class PlayerMessageBox {
  private image: Phaser.Image;
  private text: Phaser.Text;

  constructor() {
  }

  create(game: Phaser.Game) {
    this.image = game.add.image(250, 300, 'playerdialogmessage');
    this.image.scale.set(0.7, 0.7);
    this.image.alpha = 0;
    this.text = game.add.text(280, 330, '', { font: "35px Gloria Hallelujah", fill: "#333333" });
    this.text.alpha = 0;
  }

  public addMessageBox(game: Phaser.Game, text: string) {
    this.text.text = text;
    game.add.tween(this.image).to({alpha: 1}, Phaser.Timer.SECOND * 0.5, Phaser.Easing.Default, true);
    game.add.tween(this.text).to({alpha: 1}, Phaser.Timer.SECOND * 0.5, Phaser.Easing.Default, true);
    game.time.events.add(Phaser.Timer.SECOND * text.length * 0.06, () => {
      game.add.tween(this.image).to({alpha: 0}, Phaser.Timer.SECOND * 0.5, Phaser.Easing.Default, true);
      game.add.tween(this.text).to({alpha: 0}, Phaser.Timer.SECOND * 0.5, Phaser.Easing.Default, true);
    });
  }
}
