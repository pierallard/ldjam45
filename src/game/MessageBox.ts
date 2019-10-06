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
    this.graphics = game.add.image(20, 200, 'messagebox');
    this.bitmapText = game.add.bitmapText(28, 208, 'Carrier Command', '', 5);
    game.add.tween(this.graphics).to({y: 150}, Phaser.Timer.SECOND * 0.2, Phaser.Easing.Default, true);
    game.add.tween(this.bitmapText).to({y: 158}, Phaser.Timer.SECOND * 0.2, Phaser.Easing.Default, true);
    this.shouldRenderText = true;
    this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  update(game: Phaser.Game): boolean {
    if (this.shouldRenderText) {
      this.shouldRenderText = false;
      game.time.events.add(0.07 * Phaser.Timer.SECOND, () => {
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

      return this.actSpaceBar(game);
    } else if (this.spacebar.isUp) {
      this.spaceBarDown = false;
    }

    return false;
  }

  private actSpaceBar(game: Phaser.Game): boolean {
    if (!this.textIsFullyDisplayed()) {
      this.displayFullText();
      return false;
    } else {
      this.removeBox(game);

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

  private removeBox(game: Phaser.Game) {
    game.add.tween(this.graphics).to({y: 200}, Phaser.Timer.SECOND * 0.2, Phaser.Easing.Default, true);
    game.add.tween(this.bitmapText).to({y: 208}, Phaser.Timer.SECOND * 0.2, Phaser.Easing.Default, true);
    game.time.events.add(0.2 * Phaser.Timer.SECOND, () => {
      this.bitmapText.destroy(true);
      this.graphics.destroy(true);
    });
  }
}
