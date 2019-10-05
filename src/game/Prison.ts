import Point from "./Point";
import Tilemap = Phaser.Tilemap;
import {Door} from "./Door";
import {Activable} from "./Activable";
import DungeonLevel1 from "./game_state/DungeonLevel1";
import TilemapsProperties from "./TilemapsProperties"

export default class Prison extends Phaser.State {
  private map: Tilemap;
  private activableObjects: Activable[];
  private level: DungeonLevel1;
  private tilemapProperties: TilemapsProperties;

  constructor(level: DungeonLevel1, tilemapProperties: TilemapsProperties) {
    super();
    this.level = level;
    this.tilemapProperties = tilemapProperties;
  }

  public create(game: Phaser.Game) {
    this.activableObjects = [];
    this.map = game.add.tilemap('prison', 16, 16);
    this.map.addTilesetImage("dungeon_sheet", "tiles");
    this.map.enableDebug = true;

    const floor = this.map.createLayer("floor");
    const walls = this.map.createLayer("walls");
    const items = this.map.createLayer("items");

    this.populateActivables();

    // layer.resizeWorld();
  }

  public update(game: Phaser.Game) {

  }

  public canGoTo(position: Point) {
    // const floorTile = this.map.getTile(position.x, position.y, "floor");
    // if (floorTile) {
    //   console.log(this.getTileProperties(floorTile))
    // }
    // const itemTile = this.map.getTile(position.x, position.y, "items");
    // if (itemTile) {
    //   console.log(this.getTileProperties(itemTile))
    // }
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

  private populateActivables() {
    for (let x = 0; x < this.map.width; x++) {
      for (let y = 0; y < this.map.height; y++) {
        const tile = this.map.getTile(x, y, "items");
        if (!tile) { continue; }

        const properties = this.tilemapProperties.getTileProperties(tile);

        if (properties === undefined || properties.name === undefined) {
          continue;
        }

        switch (properties.name) {
          case "door": {
            this.activableObjects.push(new Door(this.level, new Point(tile.x, tile.y)));
          }
        }
      }
    }
  }
}
