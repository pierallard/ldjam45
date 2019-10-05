import {SoundManager} from "../../SoundManager";

export class Logo extends Phaser.State {
  private enter;

  create(game: Phaser.Game) {
    game.add.image(30, 15, 'logo');

    game.add.bitmapText(50, 180, 'Carrier Command', "Use arrow keys or wasd/zqsd to move", 5);
    game.add.bitmapText(85, 188, 'Carrier Command', "Press enter to begin!", 5);

    this.enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    SoundManager.create(game);
  }

  update(game: Phaser.Game) {
    if (this.enter.justDown) {
      game.state.start('Stage1');
    }
  }
}
