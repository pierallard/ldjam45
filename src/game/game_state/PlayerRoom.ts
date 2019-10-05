export default class PlayerRoom extends Phaser.State {

  public create(game: Phaser.Game) {
    game.add.bitmapText(50, 180, 'Carrier Command', "Player Room", 5);
    this.game.add.button(5, 5, 'button', () => {
      game.state.start('DungeonLevel1');
    }, this, 2, 1, 0);
  }

  public update(game: Phaser.Game) {

  }
}
