import Point from "./Point";
import {Activable} from "./Activable";
import {AbstractDungeonLevel} from "./game_state/AbstractDungeonLevel";
import {DEBUG, TILE_SIZE} from "../app";

export class CocaMachine implements Activable {
  private position: Point;
  private level: AbstractDungeonLevel;

  constructor(level: AbstractDungeonLevel, point: Point) {
    this.level = level;
    this.position = point;
  }

  getPosition(): Point {
    return this.position;
  }

  doAction(game: Phaser.Game) {
    console.log('coca machine');
    this.level.addPie(game, new Point(
        this.position.x * TILE_SIZE + 2,
        this.position.y * TILE_SIZE + 2
    ), DEBUG ? Phaser.Timer.SECOND / 2 : Phaser.Timer.SECOND * 3, () => {
      let message = 'Aaaaah, I was thirsty, and now even more!\n\nBurp.';
      if ((game.state.getCurrentState() as AbstractDungeonLevel).player.hasToPee()) {
        message = 'Please stop, I will pee on myself!';
      }
      this.level.addMessageBox(game, message, () => {});
      (game.state.getCurrentState() as AbstractDungeonLevel).player.drink();
    });

  }
}
