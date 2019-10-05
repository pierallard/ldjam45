export default class DungeonLevel1 extends Phaser.State {

  public create(game: Phaser.Game) {
    game.add.bitmapText(50, 180, 'Carrier Command', "Dungeon Level 1", 5);
    this.game.add.button(5, 5, 'button', () => {
      game.state.start('PlayerRoom');
    }, this, 2, 1, 0);
  }

  public update(game: Phaser.Game) {

  }
}
