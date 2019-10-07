import Point from "./Point";
import {Activable} from "./Activable";
import {AbstractDungeonLevel} from "./game_state/AbstractDungeonLevel";
import {DEBUG, TILE_SIZE} from "../app";

export class Water implements Activable {
  private position: Point;
  private level: AbstractDungeonLevel;
  private sound;

  constructor(level: AbstractDungeonLevel, point: Point) {
    this.level = level;
    this.position = point;
    this.sound = level.game.add.audio('water');
    this.sound.allowMultiple = false;
  }

  getPosition(): Point {
    return this.position;
  }

  doAction(game: Phaser.Game) {
    console.log('fontaine a eau');
    if (!this.sound.isPlaying) {
      this.sound.play();
    }
    this.level.addPie(game, new Point(
        this.position.x * TILE_SIZE + 2,
        this.position.y * TILE_SIZE + 2
    ), DEBUG ? Phaser.Timer.SECOND / 2 : Phaser.Timer.SECOND * 3, () => {
      let message = 'Aaaaah, I was thirsty!';
      if ((game.state.getCurrentState() as AbstractDungeonLevel).player.hasToPee()) {
        message = 'Please stop, I will pee on myself!';
      }
      this.level.addMessageBox(game, message, () => {});
      (game.state.getCurrentState() as AbstractDungeonLevel).player.drink();
    });

  }
}
