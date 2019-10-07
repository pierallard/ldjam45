import Point from "./Point";
import {Activable} from "./Activable";
import {DEBUG, TILE_SIZE} from "../app";
import {AbstractDungeonLevel} from "./game_state/AbstractDungeonLevel";

export class Computer implements Activable {
  private position: Point;
  private level: AbstractDungeonLevel;
  private peeSound;
  private keyboardSound;

  constructor(level: AbstractDungeonLevel, point: Point) {
    this.level = level;
    this.position = point;

    this.peeSound = level.game.add.audio('pee');
    this.peeSound.allowMultiple = false;

    this.keyboardSound = level.game.add.audio('keyboard');
    this.keyboardSound.allowMultiple = false;

  }

  getPosition(): Point {
    return this.position;
  }

  doAction(game: Phaser.Game) {
      let level4 = game.state.states['DungeonLevel4'];
      let player = level4.player;
      if (this.level.hasAchetedDlc('hacker')) {
          if (player.hasPassword) {
            if (!this.keyboardSound.isPlaying) {
              this.keyboardSound.play();
            }
            this.level.addMessageBox(game, `You: Let's recompile the wifi firmware\n\n and rebind the printer \n\non the VGA keyboard!`, () => {
                level4.explose();
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
            if (!this.peeSound.isPlaying) {
              this.peeSound.play();
            }
            this.level.addMessageBox(game, `You: HAHA Take This! -- *unzips pants*`, () => {
                level4.explose();
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
      this.level.addMessageBox(game, `There must be a way to destroy it\n\nusing something in this room!`, () => {});
  }
}
