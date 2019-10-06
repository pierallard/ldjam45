import {Activable} from "./Activable";
import {AbstractDungeonLevel} from "./game_state/AbstractDungeonLevel";
import TilemapsProperties from "./TilemapsProperties";
import Point from "./Point";
import {Door} from "./Door";

export default class TilemapLevel {
  constructor(level: AbstractDungeonLevel, tilemapProperties: TilemapsProperties) {
    this.level = level;
    this.tilemapProperties = tilemapProperties;
  }

  public map: Phaser.Tilemap;
  private activableObjects: Activable[];
  private level: AbstractDungeonLevel;
  private walls;
  private items;
  private tilemapProperties: TilemapsProperties;

  public create(game: Phaser.Game, name: string) {
    this.activableObjects = [];
    this.map = game.add.tilemap(name, 16, 16);
    this.map.addTilesetImage("dungeon_sheet", "tiles");
    this.map.setCollision(
      [
        1, 2, 3, 4, 5, 6, 7, 8
      ]
    );
    this.map.enableDebug = true;
    const floor = this.map.createLayer("floor");
    this.walls = this.map.createLayer("walls");
    this.items = this.map.createLayer("items");

    //this.items.debug = true;
    //this.walls.debug = true;
    this.walls.resizeWorld();
    this.items.resizeWorld();


    this.populateActivables();

    // layer.resizeWorld();
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
