import Sprite = Phaser.Sprite;
import Point from "./Point";
import { TILE_SIZE} from "../app";
import {Level} from "../levels/Level";
import {Coin} from "./Coin";
import Game = Phaser.Game;
import {EvilPlayer} from "./EvilPlayer";
import {PlayableCoin} from "./PlayableCoin";
import {SOUND, SoundManager} from "../SoundManager";

export class Player {
  private sprite: Sprite;
  private position : Point;
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
  private coins: Coin[];
  private evilPlayer: EvilPlayer;
  private playableCoin: PlayableCoin;

  constructor(position: Point) {
    this.position = position;
    this.isMoving = false;
  }

  getPosition() {
    return this.position;
  }

  create(game: Phaser.Game, group: Phaser.Group) {
    this.shadow = game.add.sprite(this.position.x * TILE_SIZE, this.position.y * TILE_SIZE, 'shadow');
    group.add(this.shadow);
    this.shadow.anchor.set(0.1, 0.1);
    this.sprite = game.add.sprite(this.position.x * TILE_SIZE, this.position.y * TILE_SIZE, 'normal_hero');
    group.add(this.sprite);

    this.sprite.animations.add('IDLE', [0, 1, 2, 3], Phaser.Timer.SECOND / 150, true);
    this.sprite.animations.add('RUN', [4, 5, 6, 7, 8, 9], Phaser.Timer.SECOND / 100, true);
    this.sprite.animations.add('KILL', [10, 11, 12, 13, 14, 15, 16], Phaser.Timer.SECOND / 75, false);
    this.sprite.animations.add('LOST', [17, 18, 19, 20, 21, 22], Phaser.Timer.SECOND / 175, true);
    this.sprite.animations.play('IDLE');
    this.sprite.anchor.set(0.3, 0.1);

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

  update(game: Phaser.Game, level: Level) {
    if (this.isMoving) {
      return;
    }

    const coin = this.canKill();

    if (coin) {
      this.kill(game, coin);
      return 666;
    } else if (this.leftKey.isDown || this.qKey.isDown || this.aKey.isDown) {
      this.moveTo(game, level, this.position.left());
    } else if (this.rightKey.isDown || this.dKey.isDown) {
      this.moveTo(game, level, this.position.right());
    } else if (this.upKey.isDown || this.zKey.isDown || this.wKey.isDown) {
      this.moveTo(game, level, this.position.up());
    } else if (this.downKey.isDown || this.sKey.isDown) {
      this.moveTo(game, level, this.position.down());
    } else {
      this.sprite.animations.play('IDLE');
      this.evilPlayer.playIdle();
    }
  }

  setPlayableCoin(playableCoin: PlayableCoin) {
    this.playableCoin = playableCoin;
  }

  moveTo(game: Phaser.Game, level: Level, position: Point, speed: number = undefined) {
    if (speed === undefined) {
      this.evilPlayer.moveTo(game, level, position, 0.3 * Phaser.Timer.SECOND);
    }
    if (!this.isMovingAllowed(level, position)) {
      return;
    }
    this.isMoving = true;
    if (this.position.x < position.x) {
      this.sprite.scale.set(1, 1);
      this.sprite.anchor.set(0.3, 0.1);
    } else if (this.position.x > position.x) {
      this.sprite.scale.set(-1, 1);
      this.sprite.anchor.set(0.7, 0.1);
    }
    this.sprite.animations.play('RUN');

    const normalSpeed = 0.3 * Phaser.Timer.SECOND;

    game.add.tween(this.sprite).to({
      x: position.x * TILE_SIZE,
      y: position.y * TILE_SIZE
    }, speed || normalSpeed, Phaser.Easing.Default, true);
    game.add.tween(this.shadow).to({
      x: position.x * TILE_SIZE,
      y: position.y * TILE_SIZE
    }, speed || normalSpeed, Phaser.Easing.Default, true);

    game.time.events.add(speed || normalSpeed, () => {
      this.position = position;
      this.isMoving = false;
      this.sprite.position.x = this.position.x * TILE_SIZE;
      this.sprite.position.y = this.position.y * TILE_SIZE;
    }, this)
    this.coins.forEach((coin) => {
      if (coin.getPosition().equals(position)) {
        coin.stopMoving(game, this.sprite.scale.x > 0);
      }
    })
  }

  private isMovingAllowed(level: Level, position: Point) {
    if (!level.isAllowedForPlayer(position)) {
      return false;
    }

    return true;
  }

  setCoins(coins: Coin[]) {
    this.coins = coins;
  }

  private canKill(): Coin|PlayableCoin {
    const coins = this.coins.filter((coin) => {
      return coin.getPosition().equals(this.position) && coin.isAlive();
    });
    if (coins.length) {
      return coins[0];
    }
    if (this.playableCoin.getPosition().equals(this.position) && this.playableCoin.isAlive()) {
      return this.playableCoin;
    }
    return null;
  }

  private kill(game: Game, coin: Coin|PlayableCoin) {
    this.isMoving = true;
    this.sprite.animations.play('KILL');
    const duration = 0.5 * Phaser.Timer.SECOND;
    this.evilPlayer.playKillAnimationTimeboxed(game, duration);
    SoundManager.play(SOUND.PICK_COIN);
    if (coin instanceof Coin) {
      coin.stopMoving(game, this.sprite.scale.x > 0);
    }
    game.time.events.add(duration, () => {
      this.sprite.animations.play('IDLE');
      this.isMoving = false;
      coin.kill();
    }, this);
  }

  setPosition(point: Point) {
    this.isMoving = false;
    this.position = point;
    this.sprite.position.x = this.position.x * TILE_SIZE;
    this.sprite.position.y = this.position.y * TILE_SIZE;
    this.shadow.position.x = this.position.x * TILE_SIZE;
    this.shadow.position.y = this.position.y * TILE_SIZE;
  }

  setEvilPlayer(evilPlayer: EvilPlayer) {
    this.evilPlayer = evilPlayer;
  }

  playIdle() {
    this.sprite.animations.play('IDLE');
  }

  playLost()
  {
    this.sprite.animations.play('LOST');
  }

  playKill() {
    this.sprite.animations.play('KILL');
  }
}
