import Point from "./Point";
import {TILE_SIZE} from "../app";
import TilemapLevel from "./TilemapLevel";
import {AbstractDungeonLevel} from "./game_state/AbstractDungeonLevel";
import DLCs, { DLC_FAST } from "../game/DLCs";

export const MOVE_TIME = Phaser.Timer.SECOND * 0.3;

export class DungeonPlayer {
  public sprite: Phaser.Sprite;
  private position: Point;
  private leftKey: Phaser.Key;
  private rightKey: Phaser.Key;
  private upKey: Phaser.Key;
  private downKey: Phaser.Key;
  private actionKey: Phaser.Key;
  private tilemap: TilemapLevel;
  private isForbidMove: boolean;
  public vessie: number = 0;
  public hasPassword: boolean = false;

  constructor(point: Point) {
    this.position = point;
    this.isForbidMove = false;
  }

  public forbidMove(b: boolean) {
    this.isForbidMove = b;
  }

  public create(game: Phaser.Game, tilemap: TilemapLevel) {
    const spriteName = this.isBusinessMan(game) ? 'player_business_front' : 'player_front';
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
    if (this.isForbidMove) {
      return;
    }

    let velocityDeFrite = window['velocityDeFrite'] || 50;
    if (this.isSpeedRun(game)) {
      velocityDeFrite = 150;
    }

    if (this.leftKey.isDown) {
      this.sprite.body.velocity.x = -velocityDeFrite;
    } else if (this.rightKey.isDown) {
      this.sprite.body.velocity.x = +velocityDeFrite;
    } else if (this.upKey.isDown) {

      if (this.isBusinessMan(game)) { this.sprite.loadTexture('player_business_back'); }
      else { this.sprite.loadTexture('player_back'); }

      this.sprite.body.velocity.y = -velocityDeFrite;
    } else if (this.downKey.isDown) {

      if (this.isBusinessMan(game)) { this.sprite.loadTexture('player_business_front'); }
      else { this.sprite.loadTexture('player_front'); }

      this.sprite.body.velocity.y = +velocityDeFrite;
    } else if (this.actionKey.isDown) {
      this.doAction(game);
    } else {
      this.stopPlayer();
    }
    this.setFakePosition();
  }

  public isBusinessMan(game: Phaser.Game)
  {
    return (game.state.getCurrentState() as AbstractDungeonLevel).hasAchetedDlc('Business Man Skin Pack (Cosmetic)');
  }

  public isSpeedRun(game: Phaser.Game) {
    return (game.state.getCurrentState() as AbstractDungeonLevel).hasAchetedDlc(DLC_FAST);
  }

  public stopPlayer() {
    this.sprite.body.velocity.y = 0;
    this.sprite.body.velocity.x = 0;
    this.setFakePosition();
  }

  public switchToBusinessSuits()
  {
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

  public drink()
  {
    if (this.vessie < 4) {
      this.vessie = this.vessie + 1;
    }
  }

  public hasToPee(): boolean
  {
    return this.vessie == 4;
  }

  public obtainPassword(): void
  {
    this.hasPassword = true;
  }
}
