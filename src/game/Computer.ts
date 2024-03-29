import Point from "./Point";
import {Activable} from "./Activable";
import {DEBUG, TILE_SIZE} from "../app";
import {AbstractDungeonLevel} from "./game_state/AbstractDungeonLevel";
import Sound = Phaser.Sound;
import {SOUND, SoundManager} from "../SoundManager";

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
      let level4 = game.state.states['DungeonLevel4'];
      let player = level4.player;
      if (this.level.hasAchetedDlc('hacker')) {
          if (player.hasPassword) {
            SoundManager.play(SOUND.KEYBOARD);
            this.level.addMessageBox(game, `You: Let's recompile the wifi firmware\n\nand rebind the printer \n\non the VGA keyboard!`, () => {
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
            SoundManager.play(SOUND.PEE);
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
            this.level.addMessageBox(game, `Ok, so... a-d-m-i-n...1-2-3      \n\nI'm in!...       \n\nBut I have no idea what to do...`, () => {});
            return;
          }
      }
      this.level.addMessageBox(game, `There must be a way to destroy it\n\nusing something in this room!`, () => {});
  }
}
