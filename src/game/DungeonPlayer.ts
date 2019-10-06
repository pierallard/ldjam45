import Point from "./Point";
import {TILE_SIZE} from "../app";
import TilemapLevel from "./TilemapLevel";

export const MOVE_TIME = Phaser.Timer.SECOND * 0.3;

export class DungeonPlayer {
  public sprite: Phaser.Sprite;
  private position: Point;
  private leftKey: Phaser.Key;
  private rightKey: Phaser.Key;
  private upKey: Phaser.Key;
  private downKey: Phaser.Key;
  private actionKey: Phaser.Key;
  private isMoving: boolean;
  private tilemap: TilemapLevel;
  private isBusinessMan = false;

  constructor(point: Point) {
    this.isMoving = false;
    this.position = point;
  }

  public create(game: Phaser.Game, tilemap: TilemapLevel) {
    const spriteName = this.isBusinessMan ? 'player_business_front' : 'player_front';
    this.sprite = game.add.sprite(DungeonPlayer.getRealPosition(this.position).x, DungeonPlayer.getRealPosition(this.position).y, spriteName);
    this.tilemap = tilemap;

    this.sprite.anchor.setTo(.5,.5);
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.setCircle(3, 5, 12);

    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.actionKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  }

  public update(game: Phaser.Game) {
    this.stopPlayer();
    const velocityDeFrite = 300;
    if (this.isMoving) {
      // c'est une animation, ne fais rien Michel.
    } else if (this.leftKey.isDown) {
      this.sprite.body.velocity.x = -velocityDeFrite;
    } else if (this.rightKey.isDown) {
      this.sprite.body.velocity.x = +velocityDeFrite;
    } else if (this.upKey.isDown) {

      if (this.isBusinessMan) { this.sprite.loadTexture('player_business_back'); }
      else { this.sprite.loadTexture('player_back'); }

      this.sprite.body.velocity.y = -velocityDeFrite;
    } else if (this.downKey.isDown) {

      if (this.isBusinessMan) { this.sprite.loadTexture('player_business_front'); }
      else { this.sprite.loadTexture('player_front'); }

      this.sprite.body.velocity.y = +velocityDeFrite;
    } else if (this.actionKey.isDown) {
      this.doAction(game);
    } else {
      this.stopPlayer();
    }
    this.setFakePosition();
  }

  public stopPlayer() {
    this.sprite.body.velocity.y = 0;
    this.sprite.body.velocity.x = 0;
    this.setFakePosition();
  }

  public activateBusiness(game)
  {
    this.isBusinessMan = true;
    this.sprite.loadTexture('player_business_front');
  }

  private doAction(game: Phaser.Game) {
    if (this.tilemap.isThereSomethingActivableNearTheCurrentPositionOfThePlayerPlease(this.position)) {
      this.tilemap.doAction(this.position, game);
    }
  }

  private setFakePosition() {
    this.position = new Point(
        Math.floor(this.sprite.x / TILE_SIZE),
        Math.floor(this.sprite.y / TILE_SIZE)
    );
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
