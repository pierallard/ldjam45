import Point from "./Point";
import {TILE_SIZE} from "../app";
import PhaserPoint = Phaser.Point;

const CIRCLE_SIZE = 10;

export class Pie {
  private position: Point;
  private duration: number;
  private graphics: Phaser.Graphics;
  private callback: any;

  public percentage: number;

  constructor(position: Point, duration: number, callback: any) {
    this.position = position;
    this.duration = duration;
    this.percentage = 0;
    this.callback = callback;
  }

  create(game: Phaser.Game) {
    this.graphics = game.add.graphics(this.position.x, this.position.y);
    game.add.tween(this).to({
      percentage: Math.PI * 2
    }, this.duration, Phaser.Easing.Default, true);
  }

  update(game: Phaser.Game): boolean {
    this.graphics.clear();
    this.graphics.lineStyle(0);
    this.graphics.beginFill(0x000000);
    this.graphics.drawCircle(CIRCLE_SIZE / 2, CIRCLE_SIZE / 2, CIRCLE_SIZE);
    this.graphics.endFill();

    this.graphics.beginFill(0x00FF00);
    let path = [new PhaserPoint(CIRCLE_SIZE/2, CIRCLE_SIZE/2)];
    for (let i = 0; i < this.percentage; i += 0.1) {
      path.push(new Phaser.Point(
        CIRCLE_SIZE/2 + Math.cos(i) * CIRCLE_SIZE/2,
        CIRCLE_SIZE/2 + Math.sin(i) * CIRCLE_SIZE/2
      ));
    }
    path.push(new PhaserPoint(CIRCLE_SIZE/2, CIRCLE_SIZE/2));
    this.graphics.drawPolygon(path);
    this.graphics.endFill();

    this.graphics.lineStyle(1, 0xFFFFFF);
    this.graphics.drawCircle(CIRCLE_SIZE / 2, CIRCLE_SIZE / 2, CIRCLE_SIZE);

    if (this.percentage >= Math.PI * 2) {
      this.graphics.destroy(true);
      this.callback();
      return true;
    }

    return false;
  }
}
