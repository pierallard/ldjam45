import {DungeonPlayer} from "../DungeonPlayer";
import {MessageBox} from "../MessageBox";
import TilemapsProperties from "../TilemapsProperties";
import Point from "../Point";
import TilemapLevel from "../TilemapLevel";
import MenuDLC from "../MenuDLC";
import {Pie} from "../Pie";
import {DEBUG, SCALE, TILE_SIZE} from "../../app";
import {isAcheted, achete, DLC_MULTIPLAYER} from "../DLCs";
import PlayerRoom from "./PlayerRoom";
import { DLC, DLC_TRANSHUMANISM } from "../DLCs";
import DLCactivator from "../DLCactivator";

export const SECONDSBLIND = 1.5;

export abstract class AbstractDungeonLevel extends Phaser.State {
  public player: DungeonPlayer;
  protected messageBox: MessageBox;
  protected tilemap: TilemapLevel;
  protected tilemapProperties: TilemapsProperties;
  protected menuDLC: MenuDLC;
  protected pie: Pie;
  protected showDLCButton: boolean;
  private blackScreen: Phaser.Graphics;
  private dlcActivator: DLCactivator;
  private exclamationPoint: Phaser.Image;
  private dlc: DLC;

  public LEVEL_NUMBER = null;

  constructor() {
    super();
    this.player = new DungeonPlayer(this.getStartPosition());
    this.tilemapProperties = new TilemapsProperties();
    this.messageBox = null;
    this.pie = null;
    this.menuDLC = new MenuDLC();
    this.dlcActivator = new DLCactivator();
    this.dlc = null;
  }

  setDlcBuy(dlcItem: DLC) {
    this.dlc = dlcItem;
  }

  abstract getStartPosition(): Point;

  abstract getLevelName(): string;

  public create(game: Phaser.Game) {
    this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    this.game.scale.setUserScale(SCALE, SCALE);

    this.game.renderer.renderSession.roundPixels = true;
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

    this.tilemap.create(game, this.getLevelName());
    this.exclamationPoint = this.game.add.image(-100, -100, 'pointdesclamasion');

    this.player.create(game, this.tilemap);

    this.menuDLC.create(game, this.showDLCButton, (dlc) => {
      this.getDlcCallback(game, dlc);
      this.dlcActivator.onActivation(game, dlc);
    }, (<PlayerRoom> game.state.states['PlayerRoom']).getWallet());


    this.blackScreen = this.game.add.graphics(0, 0);
    this.blackScreen.beginFill(0x000000);
    this.blackScreen.drawRect(0, 0, 2000,2000);
    this.blackScreen.alpha = 0;
    this.blackScreen.visible = false;
    game.add.sprite(0, game.height - 18, 'hud-background');

    if (this.hasAchetedDlc(DLC_MULTIPLAYER)) {
      game.add.sprite(60, game.height - 16, 'multiplayer-btn');
    }
    if (this.hasAchetedDlc('Business Man Skin Pack (Cosmetic)')) {
      this.player.switchToBusinessSuits();
    }

    if (DEBUG) { this.displayDLCButton(); }
  }

  public update(game: Phaser.Game) {
    if (this.dlc) {
      this.addMessageBox(game, "Thanks for your purchase!\n\n" + this.dlc.splitName, () => {});
      this.dlc = null;
    }
    const activable = this.tilemap.getActivable(this.player.getPosition());
    if (null !== activable) {
      this.exclamationPoint.position.x = activable.getPosition().x * TILE_SIZE;
      this.exclamationPoint.position.y = activable.getPosition().y * TILE_SIZE;
    } else {
      this.exclamationPoint.position.x = -100;
      this.exclamationPoint.position.y = -100;
    }

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

    if (this.hasAchetedDlc(DLC_TRANSHUMANISM)) {
      game.add.sprite(20, game.height - 16, 'bladder-indicator', this.player.vessie); // change the level of liquid
    }

    return true;
  }

  public addMessageBox(game: Phaser.Game, message: string, callback) {
    this.player.forbidMove(true);
    const newCollback = () => {
      callback();
      this.player.forbidMove(false);
    }
    this.messageBox = new MessageBox(message, newCollback);
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

  public goToNextLevel(game: Phaser.Game) {
    const timingBlind = SECONDSBLIND * Phaser.Timer.SECOND;
    this.blackScreen.visible = true;
    game.add.tween(this.blackScreen).to({alpha: 1}, timingBlind, Phaser.Easing.Default, true);
    game.time.events.add(timingBlind, () => {
      if (this.LEVEL_NUMBER === 4) {
        this.endGame(game);
      } else {
        game.state.start(`DungeonLevel${this.LEVEL_NUMBER + 1}`);
        this.blackScreen.visible = false;
        this.blackScreen.alpha = 0;
      }
    });
  }

  public defaultDlcCallback(game: Phaser.Game, dlc: DLC) {
    const wallet = (<PlayerRoom> game.state.states['PlayerRoom']).getWallet();
    if (wallet.total() >= dlc.price) {
      dlc.isAcheted = true;
      wallet.remove(dlc.price);
      this.menuDLC.close();
      this.dlc = dlc;
    } else {
      game.state.start('PlayerRoom');
      const playerRoom = game.state.states['PlayerRoom'];
      (<PlayerRoom>playerRoom).setdlcItem(dlc);
      (<PlayerRoom>playerRoom).setCurrentLevelName(this.getLevelName());
      achete(dlc.name);
    }
  }

  private endGame(game: Phaser.Game) {
    game.time.events.add(2 * Phaser.Timer.SECOND, () => {
      this.addMessageBox(game, 'An error occured.', () => {
        game.time.events.add(Phaser.Timer.SECOND, () => {
          this.addMessageBox(game, 'Impossible to join DLC server', () => {
            game.time.events.add(Phaser.Timer.SECOND, () => {
              this.addMessageBox(game, 'This game can not be run.', () => {
                game.time.events.add(Phaser.Timer.SECOND, () => {
                  this.addMessageBox(game, "Closing in 3...                   \n\n2...                   \n\n1...             ", () => {
                    game.state.start('PlayerRoom');
                    const playerRoom = <PlayerRoom>game.state.states['PlayerRoom'];
                    playerRoom.endGame();
                  });
                });
              });
            });
          })
        });
      });
    });
  }
}
