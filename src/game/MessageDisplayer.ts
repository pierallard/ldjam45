import BitmapText = Phaser.BitmapText;
import Game = Phaser.Game;


export class MessageDisplayer {
  static WIDTH = 200;
  static HEIGHT = 50;
  static GAP = 10;

  private textBlock: Phaser.Graphics;
  private text: BitmapText;
  private bigText: BitmapText;
  private visible: boolean;

  create(game: Phaser.Game, interfaceGroup: Phaser.Group) {
    this.textBlock = game.add.graphics(0, 0);
    interfaceGroup.add(this.textBlock);
    this.textBlock.beginFill(0x000000, 0.5);
    this.textBlock.drawRect(
      (game.width - MessageDisplayer.WIDTH) / 2,
      (game.height - MessageDisplayer.HEIGHT) / 2,
      MessageDisplayer.WIDTH,
      MessageDisplayer.HEIGHT
    );
    this.textBlock.fixedToCamera = true;

    this.text = game.add.bitmapText(
      (game.width - MessageDisplayer.WIDTH) / 2 + MessageDisplayer.GAP,
      (game.height - MessageDisplayer.HEIGHT) / 2 + MessageDisplayer.GAP,
      "Carrier Command", "", 5, interfaceGroup);
    this.text.fixedToCamera = true;
    this.bigText = game.add.bitmapText(
      (game.width - MessageDisplayer.WIDTH + 15) / 2 + MessageDisplayer.GAP,
      (game.height - MessageDisplayer.HEIGHT + 10) / 2 + MessageDisplayer.GAP,
      "Carrier Command", "", 15, interfaceGroup);
    this.bigText.align = 'center';
    this.bigText.fixedToCamera = true;

    interfaceGroup.add(this.text);

    this.text.setText("default text");
    this.text.fixedToCamera = true;
    this.setVisible(false);
  }

  update(game: Phaser.Game) {
  }

  displayBig(game, text, duration) {
    this.setBigVisible(true);
    this.bigText.setText(text);
    game.time.events.add(duration, () => {
      this.setBigVisible(false);
    });
  }

  display(game: Game, text: string, duration: number) {
    this.setVisible(true);
    this.text.setText(text);
    this.textBlock.alpha = 1;
    game.time.events.add(duration, () => {
      this.setVisible(false);
    });
  }

  private setVisible(vis: boolean) {
    this.visible = vis;
    if (this.visible) {
      this.textBlock.alpha = 1;
      this.text.alpha = 1;
    } else {
      this.textBlock.alpha = 0;
      this.text.alpha = 0;
    }
  }

  private setBigVisible(vis: boolean) {
    this.visible = vis;
    if (this.visible) {
      this.textBlock.alpha = 1;
      this.bigText.alpha = 1;
    } else {
      this.textBlock.alpha = 0;
      this.bigText.alpha = 0;
    }
  }

  isVisible() {
    return this.visible;
  }

  setBigText(youLost: string) {
    this.bigText.setText(youLost);
  }
}
