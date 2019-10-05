import Point from "./Point";
import {TILE_SIZE} from "../app";
import Prison from "./Prison";

export const MOVE_TIME = Phaser.Timer.SECOND * 0.3;

export class DungeonPlayer {
  private sprite: Phaser.Sprite;
  private position: Point;
  private leftKey: Phaser.Key;
  private rightKey: Phaser.Key;
  private upKey: Phaser.Key;
  private downKey: Phaser.Key;
  private actionKey: Phaser.Key;
  private isMoving: boolean;
  private tilemap: Prison;

  constructor(point: Point) {
    this.isMoving = false;
    this.position = point;
  }

  public create(game: Phaser.Game, tilemap: Prison) {
    this.sprite = game.add.sprite(DungeonPlayer.getRealPosition(this.position).x, DungeonPlayer.getRealPosition(this.position).y, 'normal_hero');
    this.tilemap = tilemap;
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.actionKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  }

  public update(game: Phaser.Game) {
    if (this.isMoving) {
      // c'est une animation, ne fais rien Michel.
    } else if (this.leftKey.isDown) {
      this.moveTo(game, this.position.left());
    } else if (this.rightKey.isDown) {
      this.moveTo(game, this.position.right());
    } else if (this.upKey.isDown) {
      this.moveTo(game, this.position.up());
    } else if (this.downKey.isDown) {
      this.moveTo(game, this.position.down());
    } else if (this.actionKey.isDown) {
      this.doAction(game);
    }
  }

  private doAction(game: Phaser.Game) {
    if (this.tilemap.isThereSomethingActivableNearTheCurrentPositionOfThePlayerPlease(this.position)) {
      this.tilemap.doAction(this.position);
    }
  }

  private moveTo(game: Phaser.Game, position: Point) {
    if (!this.tilemap.canGoTo(position)) {
      return;
    }

    this.isMoving = true;

    game.add.tween(this.sprite).to({
      x: DungeonPlayer.getRealPosition(position).x,
      y: DungeonPlayer.getRealPosition(position).y
    }, MOVE_TIME, Phaser.Easing.Default, true);

    game.time.events.add(MOVE_TIME, () => {
      this.isMoving = false;
      this.position = position;
      this.sprite.x = DungeonPlayer.getRealPosition(position).x;
      this.sprite.y = DungeonPlayer.getRealPosition(position).y;
    });
  }

  private static getRealPosition(point: Point) {
    return new Point(
      point.x * TILE_SIZE,
      point.y * TILE_SIZE
    );
  }

  public getPosition(): Point {
    return this.position;
  }
}
