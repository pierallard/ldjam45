import {AbstractDungeonLevel} from "./AbstractDungeonLevel";
import {DLC, DLC_FLASHLIGHT} from "../DLCs";
import Point from "../Point";
import TilemapLevel from "../TilemapLevel";
import {DEBUG} from "../../app";

export default class DungeonLevel3 extends AbstractDungeonLevel {
  private noLampScreen: Phaser.Graphics;
  private lampScreen: Phaser.Image;
  private showBeginningMessage: boolean;

  public LEVEL_NUMBER = 3;
  constructor() {
    super();
    this.tilemap = new TilemapLevel(this, this.tilemapProperties);
    this.showBeginningMessage = true;
  }

  public create(game: Phaser.Game) {
    super.create(game);
    this.displayDLCButton();

    this.lampScreen = game.add.image(this.player.sprite.x, this.player.sprite.y, 'backgroundlamp');
    this.lampScreen.anchor.set(0.5, 0.5);

    this.noLampScreen = game.add.graphics(0, 0);
    this.noLampScreen.beginFill(0x000000);
    this.noLampScreen.drawRect(0, 0, 300, 120);
    this.noLampScreen.alpha = DEBUG ? 0.9 : 0.985;

    this.updateNoLampScreen();

    if (this.showBeginningMessage) {
      this.showBeginningMessage = false;
      this.addMessageBox(game, "YOU: 'I can't see anything!\n\nWhere am I?\n\nWhat's this sound?'", () => {
        this.player.stopPlayer();
      });
    }
  }

  public update(game: Phaser.Game): boolean {
    this.lampScreen.x = this.player.sprite.x;
    this.lampScreen.y = this.player.sprite.y;

    this.updateNoLampScreen();
    return super.update(game);
  }

  getDlcCallback(game: Phaser.Game, dlc: DLC) {
    this.defaultDlcCallback(game, dlc);
  }

  getLevelName(): string {
    return 'level3';
  }

  getStartPosition(): Point {
    return new Point(7, 6);
  }

  private updateNoLampScreen() {
    if (this.hasAchetedDlc(DLC_FLASHLIGHT)) {
      this.noLampScreen.visible = false;
      this.lampScreen.visible = true;
    } else {
      this.noLampScreen.visible = true;
      this.lampScreen.visible = false;
    }
  }
}
