import Sprite = Phaser.Sprite;
import Point from "./Point";
import {TILE_SIZE} from "../app";
import { Level } from "../levels/Level";
import {SOUND, SoundManager} from "../SoundManager";
import {EvilPlayer} from "./EvilPlayer";
import {Coin} from "./Coin";

export class PlayableCoin {
  private sprite: Sprite;
  public position : Point;
  private leftKey: Phaser.Key;
  private rightKey: Phaser.Key;
  private upKey: Phaser.Key;
  private downKey: Phaser.Key;
  private wKey: Phaser.Key;
  private aKey: Phaser.Key;
  private sKey: Phaser.Key;
  private dKey: Phaser.Key;
  private zKey: Phaser.Key;
  private qKey: Phaser.Key;
  private isMoving: boolean;
  private shadow: Sprite;
  private normalSprite: Sprite;
  private dead: boolean;
  private player;
  private soundFear: boolean;
  private runSound: Phaser.Sound;

  constructor(position: Point) {
    this.position = position;
    this.isMoving = false;
  }

  create(game: Phaser.Game, evilGroup: Phaser.Group, normalGroup: Phaser.Group) {
    this.runSound = game.add.sound('evil_coin_fear_7');
    this.runSound.loop = true;
    this.runSound.play();
    this.runSound.volume = 0;

    this.soundFear = false;
    this.isMoving = false;
    this.dead = false;
    this.shadow = game.add.sprite(this.position.x * TILE_SIZE, this.position.y * TILE_SIZE, 'shadow');
    evilGroup.add(this.shadow);
    normalGroup.add(this.shadow);
    this.shadow.anchor.set(0.1, 0.1);
    this.sprite = game.add.sprite(this.position.x * TILE_SIZE, this.position.y * TILE_SIZE, 'coin');
    this.sprite.animations.add('IDLE', [0, 1, 2], Phaser.Timer.SECOND / 100, true);
    this.sprite.animations.add('RUN', [3, 4, 5, 6, 7, 8], Phaser.Timer.SECOND / 50, true);
    this.sprite.animations.play('IDLE');
    evilGroup.add(this.sprite);

    this.normalSprite = game.add.sprite(this.position.x * TILE_SIZE, this.position.y * TILE_SIZE, "normal_coin");
    normalGroup.add(this.normalSprite);
    this.normalSprite.animations.add('IDLE', [0, 1, 2, 3, 4, 5], Phaser.Timer.SECOND / 70, true);
    this.normalSprite.animations.play('IDLE');

    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.zKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
  }

  followCamera(game: Phaser.Game) {
    game.camera.follow(this.sprite);
  }

  unfollowCamera(game: Phaser.Game)
  {
    game.camera.unfollow();
  }

  setPlayer(player) {
    this.player = player;
  }

  update(game: Phaser.Game, level): boolean {
    if (this.isMoving) {
      return false;
    }

    if (this.playerIsClose()) {
      if (!this.soundFear) {
        SoundManager.play(SOUND.EVIL_COIN_FEAR);
        this.soundFear = true;
        game.time.events.add(Phaser.Timer.SECOND * 2, () => {
          this.soundFear = false;
        }, this);
      }
    }

    if (this.leftKey.isDown || this.qKey.isDown || this.aKey.isDown) {
      this.moveTo(game, this.position.left(), level);
      return true;
    } else if (this.rightKey.isDown || this.dKey.isDown) {
      this.moveTo(game, this.position.right(), level);
      return true;
    } else if (this.upKey.isDown || this.zKey.isDown || this.wKey.isDown) {
      this.moveTo(game, this.position.up(), level);
      return true;
    } else if (this.downKey.isDown || this.sKey.isDown) {
      this.moveTo(game, this.position.down(), level);
      return true;
    } else {
      if (this.sprite.animations.currentAnim.name !== 'IDLE') {
        this.sprite.animations.play('IDLE');
      }
    }

    return false;
  }

  playIdle() {
    if (this.sprite.animations.currentAnim.name !== 'IDLE') {
      this.sprite.animations.play('IDLE');
    }
  }

  private playerIsClose() {
    if (this.player instanceof EvilPlayer && !this.player.visible) {
      return false;
    }
    return Coin.dist(this.player.getPosition(), this.position) < Coin.SCARED_DISTANCE;
  }


  private moveTo(game: Phaser.Game, position: Point, level) {
    this.runSound.volume = 1;
    if (!this.isMovingAllowed(position, level)) {
      return;
    }
    if (this.sprite.animations.currentAnim.name !== 'RUN') {
      this.sprite.animations.play('RUN');
    }
    if (this.position.x > position.x) {
      this.sprite.scale.set(-1, 1);
      this.sprite.anchor.set(1, 0);
    } else {
      this.sprite.scale.set(1, 1);
      this.sprite.anchor.set(0, 0);
    }
    this.isMoving = true;
    this.position = position;

    [this.sprite, this.normalSprite, this.shadow].forEach((sprite) => {
      game.add.tween(sprite).to({
        x: this.position.x * TILE_SIZE,
        y: this.position.y * TILE_SIZE
      }, 0.3 * Phaser.Timer.SECOND, Phaser.Easing.Default, true);
    });

    game.time.events.add(0.3 * Phaser.Timer.SECOND, () => {
      this.isMoving = false;
      this.sprite.position.x = this.position.x * TILE_SIZE;
      this.sprite.position.y = this.position.y * TILE_SIZE;
      this.runSound.volume = 0;
    }, this)
  }

  private isMovingAllowed(position: Point, level: Level) {
    if (!level.isAllowedForCoin(position)) {
      return false;
    }

    return true;
  }

  setPosition(point: Point) {
    this.position = point;
    this.sprite.position.x = this.position.x * TILE_SIZE;
    this.sprite.position.y = this.position.y * TILE_SIZE;
    this.shadow.position.x = this.position.x * TILE_SIZE;
    this.shadow.position.y = this.position.y * TILE_SIZE;
  }

  kill() {
    this.dead = true;
    this.sprite.animations.play('DIE');
    this.sprite.alpha = 0;
    this.normalSprite.alpha = 0;
    this.shadow.alpha = 0;
  }

  getPosition() {
    return this.position;
  }

  isAlive() {
    return !this.dead;
  }

  ressussite() {
    this.sprite.alpha = 1;
    this.normalSprite.alpha = 1;
    this.shadow.alpha = 1;
    this.dead = false;
  }

  stopSound() {
    this.runSound.volume = 0;
  }

  disappear() {
    this.sprite.alpha = 0;
  }

  appear() {
    this.sprite.alpha = 1;
  }
}
