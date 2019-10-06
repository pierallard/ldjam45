import Point from "./Point";
import {Activable} from "./Activable";
import {AbstractDungeonLevel} from "./game_state/AbstractDungeonLevel";

export class DigicodableDoor implements Activable {
  private position: Point;
  private level: AbstractDungeonLevel;

  constructor(level: AbstractDungeonLevel, point: Point) {
    this.level = level;
    this.position = point;
  }

  create(game: Phaser.Game) {
  }

  getPosition(): Point {
    return this.position;
  }

  update(game: Phaser.Game) {

  }

  doAction(game: Phaser.Game) {
    if (this.level.hasAchetedDlc('Hacker DLC Pack Premium')) {
      this.level.goToNextLevel(game);
      return;
    }
    this.level.addMessageBox(game, `You: 'Ah.. this door needs a digicode... \
\n\nI have no idea nor the skills to open it.`, () => {
    });
  }
}
