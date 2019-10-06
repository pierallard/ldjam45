import BitmapText = Phaser.BitmapText;

export class MessageBox {
  private message;
  private shouldRenderText;
  private bitmapText: BitmapText;
  private spacebar: Phaser.Key;
  private graphics: Phaser.Image;
  private callback: any;
  private spaceBarDown: boolean;

  constructor(str: string, callback: any) {
    this.message = str;
    this.callback = callback;
    this.spaceBarDown = false;
  }

  create(game: Phaser.Game) {
    this.graphics = game.add.image(20, 150, 'messagebox');
    this.bitmapText = game.add.bitmapText(28, 158, 'Carrier Command', '', 5);
    this.shouldRenderText = true;
    this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  update(game: Phaser.Game): boolean {
    if (this.shouldRenderText) {
      this.shouldRenderText = false;
      game.time.events.add(0.1 * Phaser.Timer.SECOND, () => {
        const length = this.bitmapText.text.length;
        this.bitmapText.text = this.message.substr(0, length + 1);
        this.shouldRenderText = true;
      });
    }

    if (this.spacebar.isDown) {
      if (this.spaceBarDown) {
        return false;
      }
      this.spaceBarDown = true;

      return this.actSpaceBar();
    } else if (this.spacebar.isUp) {
      this.spaceBarDown = false;
    }

    return false;
  }

  private actSpaceBar(): boolean {
    if (!this.textIsFullyDisplayed()) {
      this.displayFullText();
      return false;
    } else {
      this.removeBox();

      this.callback();

      return true;
    }
  }

  private textIsFullyDisplayed() {
    return this.bitmapText.text === this.message;
  }

  private displayFullText() {
    this.bitmapText.text = this.message;
  }

  private removeBox() {
    this.bitmapText.destroy(true);
    this.graphics.destroy(true);
  }
}
