import Point from "./Point";
import {Activable} from "./Activable";
import DungeonLevel1 from "./game_state/DungeonLevel1";
import {TILE_SIZE} from "../app";

export class Door implements Activable {
  private position: Point;
  private crochetage: number;
  private level: DungeonLevel1;

  constructor(level: DungeonLevel1, point: Point) {
    this.level = level;
    this.position = point;
    this.crochetage = 0;
  }

  create(game: Phaser.Game) {
  }

  getPosition(): Point {
    return this.position;
  }

  update(game: Phaser.Game) {

  }

  doAction(game: Phaser.Game) {
    this.crochetage += 1;
    this.level.addPie(game, new Point(
      this.position.x * TILE_SIZE + 2,
      this.position.y * TILE_SIZE + 2
    ), Phaser.Timer.SECOND * 3, () => {
      this.level.addMessageBox(game, 'Congrats, tu as deverouillay ' + this.crochetage + '% de la porte', () => {});
    });
  }
}
