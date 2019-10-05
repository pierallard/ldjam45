import {MOVE_TIME} from "./DungeonPlayer";
import BitmapText = Phaser.BitmapText;
import Point from "./Point";

export class MessageBox {
  private message;
  private shouldRenderText;
  private bitmapText: BitmapText;
  private spacebar: Phaser.Key;
  private graphics: Phaser.Graphics;
  private callback: any;

  constructor(str: string, callback: any) {
    this.message = str;
    this.callback = callback;
  }

  create(game: Phaser.Game) {
    this.graphics = game.add.graphics(0, 0);
    this.graphics.beginFill(0x444444);
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.drawRect(20.5, 150.5, 260, 20);

    this.bitmapText = game.add.bitmapText(22, 152, 'Carrier Command', '', 5);
    this.shouldRenderText = true;
    this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  update(game: Phaser.Game): boolean {
    if (this.spacebar.isDown) {
      if (this.bitmapText.text === this.message) {
        if (this.shouldRenderText) {
          this.bitmapText.destroy(true);
          this.graphics.destroy(true);

          this.callback();

          return true;
        }
      } else {
        this.bitmapText.text = this.message;
        this.shouldRenderText = false;
        game.time.events.add(0.5 * Phaser.Timer.SECOND, () => {
          this.shouldRenderText = true;
        });

        return false;
      }
    }
    if (this.bitmapText.text === this.message) {
      return false;
    }
    if (!this.shouldRenderText) {
      return false;
    }
    this.shouldRenderText = false;
    game.time.events.add(0.1 * Phaser.Timer.SECOND, () => {
      const length = this.bitmapText.text.length;
      this.bitmapText.text = this.message.substr(0, length + 1);
      this.shouldRenderText = true;
    });

    return false;
  }
}
