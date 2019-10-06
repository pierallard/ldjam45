import * as level1 from "../assets/tilemaps/map1.json";
import * as level2 from "../assets/tilemaps/map2.json";
import * as level3 from "../assets/tilemaps/map3.json";
import * as level4 from "../assets/tilemaps/map4.json";

export default class TilemapsProperties {
  private properties = {};
  private maps = [
    level1,
    level2,
    level3,
    level4,
  ];

  constructor() {
    this.load();
  }

  public load() {
    this.maps.forEach((jsonMap) => {
      const tileset = jsonMap.tilesets[0] as any;
      if ('tiles' in tileset) {
        for (let i = 0; i < tileset.tiles.length; i++) {
          const tile = tileset.tiles[i];
          const properties = {};
  
          for (let j = 0; j < tile.properties.length; j++) {
            properties[tile.properties[j].name] = tile.properties[j].value;
          }
  
          this.properties[tile.id] = properties;
        }
      }
    });
  }

  public getTileProperties(tile: Phaser.Tile) {
    return this.properties[tile.index - 1];
  }
}
