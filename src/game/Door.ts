import Point from "./Point";
import {Activable} from "./Activable";
import {DEBUG, TILE_SIZE} from "../app";
import {DLC_CROCHETAGE} from "./MenuDLC";
import {AbstractDungeonLevel} from "./game_state/AbstractDungeonLevel";

export class Door implements Activable {
  private position: Point;
  private crochetage: number;
  private level: AbstractDungeonLevel;
  private openSprite: Phaser.Sprite;

  constructor(level: AbstractDungeonLevel, point: Point) {
    this.level = level;
    this.position = point;
    this.crochetage = 0;
  }

  create(game: Phaser.Game)
  {
    this.openSprite = game.add.sprite(this.position.x * TILE_SIZE, this.position.y * TILE_SIZE, "main_spritesheet", 53);
    this.openSprite.visible = false;
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
        let message = 'Door unlocked at ' + this.crochetage + '%! Let\'s try again!';
        if (this.crochetage > 2) {
            message += "\n\nFEEL FREE TO BUY SOME NEW DLCs!!!"
        }
        if (this.crochetage >= 100) {
          message = 'Door is now opened!';
          this.openSprite.visible = true;
        }
      this.level.addMessageBox(game, message, () => {
        if (this.crochetage > 1) {
          this.level.displayDLCButton();
        }
      });
    });
  }
}
