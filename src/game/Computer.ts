import Point from "./Point";
import {Activable} from "./Activable";
import {DEBUG, TILE_SIZE} from "../app";
import {AbstractDungeonLevel} from "./game_state/AbstractDungeonLevel";

export class Computer implements Activable {
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
      let player = game.state.states['DungeonLevel4'].player;
      if (this.level.hasAchetedDlc('hacker')) {
          if (player.hasPassword) {
            this.level.addMessageBox(game, `You: Let's recompile the wifi firmware\n\n and rebind the printer \n\non the VGA keyboard!`, () => {
                this.level.addPie(game, new Point(this.position.x * TILE_SIZE + 2, this.position.y * TILE_SIZE + 2),
                DEBUG ? Phaser.Timer.SECOND / 2 : Phaser.Timer.SECOND * 8, () => {
                    this.level.goToNextLevel(game);
                });
            });
            return;
          }
      }
      if (this.level.hasAchetedDlc('businessman')) {
          if (this.level.hasAchetedDlc('vessie') && player.hasToPee()) {
            this.level.addMessageBox(game, `You: HAHA Take This! -- *unzips pants*`, () => {
                this.level.addPie(game, new Point(this.position.x * TILE_SIZE + 2, this.position.y * TILE_SIZE + 2),
                DEBUG ? Phaser.Timer.SECOND / 2 : Phaser.Timer.SECOND * 8, () => {
                    this.level.goToNextLevel(game);
                });
            });
            return;
          }
          if (player.hasPassword) {
            this.level.addMessageBox(game, `Ok, so... a-d-m-i-n...1-2-3, \n\nI'm in!... But I have no idea what to do...`, () => {});
            return;
          }
      }
  }
}
