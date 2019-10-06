export default class PlayerMessageBox {
  private image: Phaser.Image;

  constructor() {

  }

  create(game: Phaser.Game) {
    this.image = game.add.image(0, 0, 'playerdialogmessage');

  }
}
