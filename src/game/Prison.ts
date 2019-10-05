import Point from "./Point";
import Tilemap = Phaser.Tilemap;
import {Door} from "./Door";
import {Activable} from "./Activable";
import DungeonLevel1 from "./game_state/DungeonLevel1";

export default class Prison extends Phaser.State {
  private map: Tilemap;
  private activableObjects: Activable[];
  private level: DungeonLevel1;

  constructor(level: DungeonLevel1) {
    super();
    this.level = level;
  }

  public create(game: Phaser.Game) {
    this.activableObjects = [];
    this.map = game.add.tilemap('prison', 16, 16);
    this.map.addTilesetImage("dungeon_sheet", "tiles");
    this.map.enableDebug = true;

    const floor = this.map.createLayer("floor");
    const walls = this.map.createLayer("walls");
    const items = this.map.createLayer("items");

    console.log(this.map)
    // TODO boucle
    this.activableObjects.push(new Door(this.level, new Point(7, 1)));

    // layer.resizeWorld();
  }

  public update(game: Phaser.Game) {

  }

  public canGoTo(position: Point) {
    const floorTile = this.map.getTile(position.x, position.y, "floor");
    if (floorTile) {
      console.log(position.x, position.y, floorTile)
    }
    const itemTile = this.map.getTile(position.x, position.y, "items");
    if (itemTile) {
      console.log(position.x, position.y, itemTile)
    }
    return true;
  }

  public isThereSomethingActivableNearTheCurrentPositionOfThePlayerPlease(position: Point): boolean {
    return this.getActivable(position) !== null;
  }

  public doAction(position: Point, game: Phaser.Game) {
    this.getActivable(position).doAction(game);
  }

  public getActivable(position: Point): Activable {
    const corners = [
      position.left(),
      position.right(),
      position.down(),
      position.up()
    ];

    for (let i = 0; i < this.activableObjects.length; i++) {
      const activable = this.activableObjects[i];
      for (let j = 0; j < corners.length; j++) {
        const corner = corners[j];
        if (activable.getPosition().equals(corner)) {
          return activable;
        }
      }
    }

    return null;
  }
}
