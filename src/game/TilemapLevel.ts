import {Activable} from "./Activable";
import {AbstractDungeonLevel} from "./game_state/AbstractDungeonLevel";
import TilemapsProperties from "./TilemapsProperties";
import Point from "./Point";
import {Door} from "./Door";
import {Secretary} from "./Secretary";

export default class TilemapLevel {
  constructor(level: AbstractDungeonLevel, tilemapProperties: TilemapsProperties) {
    this.level = level;
    this.tilemapProperties = tilemapProperties;
  }

  public map: Phaser.Tilemap;
  private activableObjects: Activable[];
  private level: AbstractDungeonLevel;
  public walls;
  public items;
  public floor;
  private tilemapProperties: TilemapsProperties;

  public create(game: Phaser.Game, name: string) {
    this.activableObjects = [];
    this.map = game.add.tilemap(name, 16, 16);
    this.map.addTilesetImage('main', 'main');

    // this.map.enableDebug = true;
    this.floor = this.map.createLayer("floor");
    this.walls = this.map.createLayer("walls");
    this.items = this.map.createLayer("items");

    this.map.setCollisionBetween(1, 1000, true, this.walls);
    this.map.setCollision(
        [
          181, 182, 183 // la caisse
        ], true, this.items
    );
    console.log(this.map);
    
    // this.items.debug = true;
    // this.walls.debug = true;

    this.walls.resizeWorld();
    this.items.resizeWorld();
    this.floor.resizeWorld();

    this.populateActivables();
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
        console.log(this.map);

        if (properties === undefined || properties.name === undefined) {
          continue;
        }
        console.log(properties);

        switch (properties.name) {
          case "door": {
            this.activableObjects.push(new Door(this.level, new Point(tile.x, tile.y)));
            break;
          }
          case "secretary": {
              this.activableObjects.push(new Secretary(this.level, new Point(tile.x, tile.y)));
              break;
          }
        }
      }
    }
  }
}
