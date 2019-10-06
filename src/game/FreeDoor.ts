import Point from "./Point";
import {Activable} from "./Activable";
import {DEBUG, TILE_SIZE} from "../app";
import {DLC_CROCHETAGE} from "./MenuDLC";
import {AbstractDungeonLevel} from "./game_state/AbstractDungeonLevel";

export class FreeDoor implements Activable {
  private position: Point;
  private crochetage: number;
  private level: AbstractDungeonLevel;

  constructor(level: AbstractDungeonLevel, point: Point) {
    this.level = level;
    this.position = point;
    this.crochetage = 100;
  }

  getPosition(): Point {
    return this.position;
  }

  doAction(game: Phaser.Game) {
    if (this.crochetage >= 100) {
      this.level.goToNextLevel(game);
      return;
    }
    if (this.level.hasAchetedDlc(DLC_CROCHETAGE)) {
      this.crochetage = 100;
    } else {
      this.crochetage += 1;
    }
    this.level.addPie(game, new Point(
      this.position.x * TILE_SIZE + 2,
      this.position.y * TILE_SIZE + 2
    ), DEBUG ? Phaser.Timer.SECOND / 2 : Phaser.Timer.SECOND * 3, () => {
        let message = 'Congrats, tu as deverouillay ' + this.crochetage + '% de la porte!';
        if (this.crochetage > 1) {
            message += "\n\nUn petit DLCay ? ;)"
        }
        if (this.crochetage >= 100) {
          message = 'You opened the door!';
        }
      this.level.addMessageBox(game, message, () => {
        if (this.crochetage > 1) {
          this.level.displayDLCButton();
        }
      });
    });
  }
}
