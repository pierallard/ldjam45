import {DungeonPlayer} from "../DungeonPlayer";
import {MessageBox} from "../MessageBox";
import TilemapsProperties from "../TilemapsProperties";
import Point from "../Point";
import TilemapLevel from "../TilemapLevel";
import MenuDLC from "../MenuDLC";
import {Pie} from "../Pie";
import {Cursor} from "./Cursor";
import {SCALE} from "../../app";
import DLCs, { isAcheted, achete } from "../DLCs";
import PlayerRoom from "./PlayerRoom";
import {Door} from "../Door";
import { DLC } from "../DLCs";
import DLCactivator from "../DLCactivator";

export abstract class AbstractDungeonLevel extends Phaser.State {
  public player: DungeonPlayer;
  protected messageBox: MessageBox;
  protected tilemap: TilemapLevel;
  protected tilemapProperties: TilemapsProperties;
  protected menuDLC: MenuDLC;
  protected pie: Pie;
  protected cursor: Cursor;
  protected showDLCButton: boolean;
  private blackScreen: Phaser.Graphics;
  private dlcActivator: DLCactivator;

  constructor() {
    super();
    this.player = new DungeonPlayer(this.getStartPosition());
    this.tilemapProperties = new TilemapsProperties();
    this.messageBox = null;
    this.pie = null;
    this.menuDLC = new MenuDLC();
    this.dlcActivator = new DLCactivator();
  }

  abstract getStartPosition(): Point;

  abstract getLevelName(): string;

  public create(game: Phaser.Game) {
    this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    this.game.scale.setUserScale(SCALE, SCALE);

    this.game.renderer.renderSession.roundPixels = true;
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

    this.tilemap.create(game, this.getLevelName());

    this.player.create(game, this.tilemap);

    this.menuDLC.create(game, this.showDLCButton, (dlc) => {
      this.getDlcCallback(game, dlc);
      this.dlcActivator.onActivation(game, dlc);
    });

    this.cursor = new Cursor(game);
    this.game.add.existing(this.cursor);
    this.blackScreen = this.game.add.graphics(0, 0);
    this.blackScreen.beginFill(0x000000);
    this.blackScreen.drawRect(0, 0, 2000,2000);
    this.blackScreen.alpha = 0;
    this.blackScreen.visible = false;
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


    this.game.physics.arcade.collide(this.player.sprite, this.tilemap.walls);
    this.game.physics.arcade.collide(this.player.sprite, this.tilemap.items);

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
    this.showDLCButton = true;
  }

  public hasAchetedDlc(name): boolean {
    return isAcheted(name);
  }

  abstract getDlcCallback(game: Phaser.Game, dlc: DLC);

  public render()
  {
    // this.game.debug.body(this.player.sprite);
  }

  public goToLevel2(game: Phaser.Game) {
    const timingBlind = 1.5 * Phaser.Timer.SECOND;
    this.blackScreen.visible = true;
    game.add.tween(this.blackScreen).to({alpha: 1}, timingBlind, Phaser.Easing.Default, true);
    game.time.events.add(timingBlind, () => {
      game.state.start('DungeonLevel2');
      this.blackScreen.visible = false;
      this.blackScreen.alpha = 0;
    });
  }

  public defaultDlcCallback(game: Phaser.Game, dlc: DLC) {
    game.state.start('PlayerRoom');
    this.cursor.setEnabled(true);

    const playerRoom = game.state.states['PlayerRoom'];
    (<PlayerRoom>playerRoom).setdlcItem(dlc);
    (<PlayerRoom>playerRoom).setCurrentLevelName(this.getLevelName());
    achete(dlc.name);
  }
}
