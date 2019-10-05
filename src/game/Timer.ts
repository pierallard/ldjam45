import BitmapText = Phaser.BitmapText;
import Sprite = Phaser.Sprite;
import Point from "./Point";

export class Timer {
  private text: BitmapText;
  private remainingTime: number;
  private sprite: Sprite;
  private isClignoting: boolean;
  private switch: boolean = true;

  public static dist = new Point(7, 14);
  public static dep = new Point(9, 5);

  create(game: Phaser.Game, interfaceGroup: Phaser.Group) {
    this.isClignoting = false;
    this.sprite = game.add.sprite(Timer.dep.x, Timer.dep.y, 'watch', 0);
    this.sprite.fixedToCamera = true;
    this.sprite.alpha = 0;
    interfaceGroup.add(this.sprite);

    this.text = game.add.bitmapText(Timer.dep.x + Timer.dist.x, Timer.dep.y + Timer.dist.y, "Carrier Command Red", "", 5, interfaceGroup);
    this.text.fixedToCamera = true;

    game.time.events.loop(Phaser.Timer.SECOND, () => {
      if (this.remainingTime !== null) {
        this.remainingTime--;
      }
    }, this);
  }

  update(game: Phaser.Game) {
    if (this.isClignoting) {
      if (this.switch) {
        this.sprite.alpha = this.sprite.alpha ? 0 : 1;
        this.text.alpha = this.text.alpha ? 0 : 1;

        this.switch = false;
        game.time.events.add(0.2 * Phaser.Timer.SECOND, () => {
          this.switch = true;
        });
      }
      return;
    }

    if (this.remainingTime === null) {
      this.text.setText('');
      this.sprite.alpha = 0;
    } else {
      this.sprite.alpha = 1;
      let remainingSeconds = Math.ceil(Math.max(0, this.remainingTime));
      this.updateSprite();
      let timebar = '';
      for (let _i = 0; _i < remainingSeconds; _i++) {
        timebar += '|';
      }

      this.text.setText(remainingSeconds + '');
    }
  }

  setRemainingTime(remainingTime: number) {
    this.remainingTime = remainingTime;
  }

  isOver() {
    if (this.remainingTime === null) {
      return false;
    }
    return this.remainingTime <= 0;
  }

  shouldGotoHunderMode() {
    return this.remainingTime < 18 && this.remainingTime > 0.5;
  }

  private updateSprite() {
    const toto = - this.remainingTime + 35;
    const toto2 = toto * 3 / 5;

    this.sprite.loadTexture('watch', Math.round(Math.min(Math.max(0, toto2), 19)));

    if (this.remainingTime <= 9) {
      this.text.fontSize = 10;
    } else {
      this.text.fontSize = 5;
    }
  }

  clignote() {
    this.isClignoting = true;
  }

  StopClignote() {
    this.isClignoting = false;
  }
}
