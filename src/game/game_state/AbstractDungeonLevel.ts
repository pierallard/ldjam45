import {DungeonPlayer} from "../DungeonPlayer";
import {MessageBox} from "../MessageBox";
import TilemapsProperties from "../TilemapsProperties";
import Point from "../Point";
import Prison from "../Prison";
import MenuDLC from "../MenuDLC";
import {Pie} from "../Pie";
import {Cursor} from "./Cursor";
import {SCALE} from "../../app";
import {DLCItem} from "../DLCList";

export abstract class AbstractDungeonLevel extends Phaser.State {
  protected player: DungeonPlayer;
  protected messageBox: MessageBox;
  protected tilemap: Prison;
  protected tilemapProperties: TilemapsProperties;
  protected menuDLC: MenuDLC;
  protected pie: Pie;
  protected cursor: Cursor;

  constructor() {
    super();
    this.player = new DungeonPlayer(this.getStartPosition());
    this.messageBox = null;
    this.pie = null;
    this.menuDLC = new MenuDLC(true);
  }

  abstract getStartPosition(): Point;

  public create(game: Phaser.Game) {
    this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    this.game.scale.setUserScale(SCALE, SCALE);

    this.game.renderer.renderSession.roundPixels = true;
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

    this.tilemap.create(game);

    this.player.create(game, this.tilemap);

    this.menuDLC.create(game, (dlcItem) => {
      this.getDlcCallback(game, dlcItem);
    });

    this.cursor = new Cursor(game);
    this.game.add.existing(this.cursor);
  }


  public update(game: Phaser.Game) {
    this.cursor.update2(game);
    if (null !== this.messageBox) {
      if (this.messageBox.update(game)) {
        this.messageBox = null;
      }
      return false;
    }
    if (null !== this.pie) {
      if (this.pie.update(game)) {
        this.pie = null;
      }
      return false;
    }
    this.player.update(game);

    return true;
  }

  public addMessageBox(game: Phaser.Game, message: string, callback) {
    this.messageBox = new MessageBox(message, callback);
    this.messageBox.create(game);
  }

  public addPie(game: Phaser.Game, position: Point, duration: number, callback: any) {
    this.pie = new Pie(position, duration, callback);
    this.pie.create(game);
  }

  public displayDLCButton() {
    this.menuDLC.displayButton();
  }

  public hasAchetedDlc(name): boolean {
    return this.menuDLC.dlcIsAcheted(name);
  }

  abstract getDlcCallback(game: Phaser.Game, dlcItem: DLCItem);

  public render()
  {
    this.game.debug.body(this.player.sprite);
  }
}

