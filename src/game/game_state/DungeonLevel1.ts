export default class DungeonLevel1 extends Phaser.State {
  private sprite: Phaser.Sprite;

  public create(game: Phaser.Game) {
    game.add.image(0, 0, 'dungeonlevel1', 0);

    game.add.bitmapText(50, 180, 'Carrier Command', "Dungeon Level 1", 5);
    this.game.add.button(5, 5, 'button', () => {
      game.state.start('PlayerRoom');
    }, this, 2, 1, 0);
    this.game.add.button(5, 5, 'button', () => {
      game.state.start('DungeonLevel1');
    }, this, 2, 1, 0);
    this.sprite = game.add.sprite(50, 50, 'normal_hero');
  }

  public update(game: Phaser.Game) {

  }
}
