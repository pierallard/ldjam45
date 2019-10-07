import {SoundManager} from "../../SoundManager";

export class Logo extends Phaser.State {
  private enter;

  create(game: Phaser.Game) {
    game.add.image(30, 15, 'logo');

    game.add.bitmapText(80, 90, 'Carrier Command', "Use arrow keys to move", 5);
    game.add.bitmapText(85, 100, 'Carrier Command', "Press enter to begin!", 5);

    this.enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    SoundManager.create(game);
    SoundManager.playMusic(game);
  }

  update(game: Phaser.Game) {
    if (this.enter.justDown) {
     game.state.start('DungeonLevel1');
     // game.state.start('DungeonLevel4');
     // game.state.start('PlayerRoom');
     // game.state.start('Credits');
    }
  }
}
