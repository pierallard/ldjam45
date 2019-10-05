import {DungeonPlayer} from "../DungeonPlayer";

export default class DungeonLevel1 extends Phaser.State {
  private player: DungeonPlayer;

  constructor(sprite: Phaser.Sprite) {
    super();
    this.player = new DungeonPlayer();
  }

  public create(game: Phaser.Game) {
    game.add.image(0, 0, 'dungeonlevel1', 0);

    game.add.bitmapText(50, 180, 'Carrier Command', "Dungeon Level 1", 5);
    this.game.add.button(5, 5, 'button', () => {
      game.state.start('PlayerRoom');
    }, this, 2, 1, 0);

    this.player.create(game);
  }

  public update(game: Phaser.Game) {
    this.player.update(game);
  }
}
