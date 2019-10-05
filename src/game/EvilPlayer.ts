import Sprite = Phaser.Sprite;
import Point from "./Point";
import { TILE_SIZE } from "../app";
import { Level } from "../levels/Level";
import { js as EasyStar } from "easystarjs";
import {Positionable} from "./Positionable";
import {Coin} from "./Coin";
import Game = Phaser.Game;
import {SOUND, SoundManager} from "../SoundManager";
import {PlayableCoin} from "./PlayableCoin";
import {Player} from "./Player";

type Path = { x: number; y: number }[];

export class EvilPlayer implements Positionable {
  private static SPEED = 0.24 * Phaser.Timer.SECOND;
  private sprite: Sprite;
  private position: Point;
  private isMoving: boolean;
  private target: Positionable;
  private shadow: Sprite;
  private coins: Coin[];
  private normalPlayerIsKilling: boolean = false;
  visible: boolean;
  canMove: boolean;
  private playableCoin: PlayableCoin;
  private hunterMode: boolean;
  private normalPlayer: Player;

  private path: Path = null;
  private calculatingPath = false;

  constructor(private pathfinder: EasyStar, playableCoin: PlayableCoin, position) {
    this.position = position;
    this.isMoving = false;
    this.visible = true;
    this.playableCoin = playableCoin;
  }

  create(game: Phaser.Game, group: Phaser.Group) {
    this.hunterMode = false;
    this.canMove = true;
    this.shadow = game.add.sprite(this.position.x * TILE_SIZE, this.position.y * TILE_SIZE, 'shadow');
    group.add(this.shadow);
    this.shadow.anchor.set(0.1, 0.1);

    this.sprite = game.add.sprite(this.position.x * TILE_SIZE, this.position.y * TILE_SIZE, 'evil_hero');

    this.sprite.animations.add('IDLE', [0, 1, 2, 3], Phaser.Timer.SECOND / 150, true);
    this.sprite.animations.add('RUN', [4, 5, 6, 7, 8, 9], Phaser.Timer.SECOND / 100, true);
    this.sprite.animations.add('KILL1', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], Phaser.Timer.SECOND / 100, true);
    this.sprite.animations.add('WIN', [23, 24, 25], Phaser.Timer.SECOND / 150, true);
    this.sprite.animations.add('FALL', [26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46], Phaser.Timer.SECOND / 150, false);
    this.sprite.animations.add('FALLEN', [47,48], Phaser.Timer.SECOND / 250, true);
    this.sprite.animations.play('IDLE');
    this.sprite.anchor.set(0.3, 0.3);

    group.add(this.sprite);
  }

  update(game: Phaser.Game, level: Level) {
    console.log('hunter ' + this.hunterMode);
    if (!this.visible) {
      return;
    }
    if (this.isMoving) {
      return;
    }
    if (this.normalPlayerIsKilling) {
      return;
    }
    if (!this.canMove) {
      return;
    }

    if (!this.target || this.hunterMode) {
      this.target = this.findNextTarget();
    }

    const coin = this.canKill();
    if (coin) {
      this.kill(game, coin);
      return;
    }

    this.pathfinder.calculate();
    if (this.calculatingPath) {
      return;
    }
    if (this.isPathUpdateRequired()) {
      this.pathfinder.findPath(
        this.position.x,
        this.position.y,
        this.target.getPosition().x,
        this.target.getPosition().y,
        path => {
          this.calculatingPath = false;
          this.path = path;
          if (this.path !== null) {
            path.shift(); // drop the first element (it's the current position).
          }
        }
      );
      this.calculatingPath = true;
      return;
    }

    const destination = this.path.shift();
    if (destination) {
      const point = new Point(destination.x, destination.y);
      if (!point.equals(this.position)) {
        this.moveTo(game, level, point);
      }
    } else {
      this.playIdle();
    }
  }

  private isPathUpdateRequired = () => {
    if (!this.target) {
      return false;
    }
    if (this.calculatingPath) {
      return false;
    }
    if (!this.path || this.path.length === 0) {
      return true;
    }
    if (this.position.equals(this.target.getPosition())) {
      return true;
    }

    return false;
  };

  setNormalPlayer(player: Player) {
    this.normalPlayer = player;
  }

  moveTo(game: Phaser.Game, level: Level, position: Point, speed: number = null) {
    if (!this.isMovingAllowed(level, position)) {
      return;
    }

    if (speed === null) {
      this.normalPlayer.moveTo(game, level, position, EvilPlayer.SPEED);
    }
    this.isMoving = true;
    if (this.position.x < position.x) {
      this.sprite.scale.set(1, 1);
      this.sprite.anchor.set(0.3, 0.3);
    } else if (this.position.x > position.x) {
      this.sprite.scale.set(-1, 1);
      this.sprite.anchor.set(0.7, 0.3);
    }
    this.sprite.animations.play('RUN');
    game.add.tween(this.sprite).to({
      x: position.x * TILE_SIZE,
      y: position.y * TILE_SIZE
    }, (speed || EvilPlayer.SPEED) - Phaser.Timer.SECOND / 50, Phaser.Easing.Default, true);

    game.add.tween(this.shadow).to({
      x: position.x * TILE_SIZE,
      y: position.y * TILE_SIZE
    }, (speed || EvilPlayer.SPEED) - Phaser.Timer.SECOND / 50, Phaser.Easing.Default, true);

    game.time.events.add(speed || EvilPlayer.SPEED, () => {
      this.position = position;
      this.isMoving = false;
      this.sprite.position.x = this.position.x * TILE_SIZE;
      this.sprite.position.y = this.position.y * TILE_SIZE;
    }, this)
  }

  private isMovingAllowed(level: Level, position: Point) {
    if (position.x < 0) {
      return false;
    }
    if (position.x >= level.getWidth()) {
      return false;
    }
    if (position.y < 0) {
      return false;
    }
    if (position.y >= level.getHeight()) {
      return false;
    }
    if (!level.isAllowedForPlayer(position)) {
      return false;
    }

    return true;
  }

  getPosition() {
    return this.position;
  }

  setCoins(coins: Coin[]) {
    this.coins = coins;
  }

  private canKill(): Coin {
    const coins = this.coins.filter((coin) => {
      return coin.getPosition().equals(this.position) && coin.isAlive();
    });
    if (coins.length) {
      return coins[0];
    }
    return null;
  }

  followCamera(game: Phaser.Game) {
    game.camera.follow(this.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
  }

  private kill(game: Game, coin: Coin) {
    this.isMoving = true;
    this.playKill();
    if (this.target === coin) {
      this.target = null;
    }

    this.normalPlayer.playKill();

    game.camera.shake(0.005, 500);

    SoundManager.play(SOUND.SWORD);
    SoundManager.play(SOUND.OTHER_COIN_DEATH);
    game.time.events.add(0.7 * Phaser.Timer.SECOND, () => {
      SoundManager.play(SOUND.SWORD);
      SoundManager.play(SOUND.OTHER_COIN_DEATH);
    }, this);

    coin.stopMoving(game, this.sprite.scale.x > 0);
    game.time.events.add(Phaser.Timer.SECOND, () => {
      this.sprite.animations.play('IDLE');
      this.isMoving = false;
      coin.kill();
    }, this)
  }

  setPosition(point: Point) {
    this.hunterMode = false;
    this.position = point;
    this.sprite.position.x = this.position.x * TILE_SIZE;
    this.sprite.position.y = this.position.y * TILE_SIZE;
    this.shadow.position.x = this.position.x * TILE_SIZE;
    this.shadow.position.y = this.position.y * TILE_SIZE;
  }

  playKillAnimationTimeboxed(game: Phaser.Game, duration: number) {
    this.normalPlayerIsKilling = true;
    this.playKill();
    game.time.events.add(duration, () => {
      this.normalPlayerIsKilling = false;
    });
  }

  playKill() {
    const animations = ['KILL1'];
    const anim = animations[Math.floor(Math.random() * animations.length)];
    this.sprite.animations.play(anim);
  }

  playIdle() {
    this.sprite.animations.play('IDLE');
  }

  playWin()
  {
    this.sprite.animations.play('WIN');
  }

  playFall()
  {
    this.sprite.animations.play('FALL');
  }

  playFallen()
  {
    this.sprite.animations.play('FALLEN');
  }

  setVisible(visible: boolean) {
    this.visible = visible;
    if (!this.visible) {
      this.sprite.alpha = 0;
      this.shadow.alpha = 0;
    } else {
      this.sprite.alpha = 1;
      this.shadow.alpha = 1;
    }
  }

  private findNextTarget(): Positionable {
    if (this.hunterMode) {
      return this.playableCoin;
    }

    const aliveCoins = this.coins.filter((coin) => {
      return coin.isAlive();
    });
    const closests = aliveCoins.sort((c1, c2) => {
      return Coin.dist(this.position, c1.getPosition()) - Coin.dist(this.position, c2.getPosition());
    });
    if (closests.length) {
      if (Coin.dist(this.position, this.playableCoin.getPosition()) < Coin.dist(this.position, closests[0].getPosition())) {
        return this.playableCoin;
      }
      return closests[0];
    }

    return this.playableCoin;
  }

  setHunderMode(b: boolean) {
    this.hunterMode = b;
    if (!this.hunterMode && this.target instanceof PlayableCoin) {
      this.target = null;
    }
  }
}
