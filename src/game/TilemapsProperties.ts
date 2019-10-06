import * as level1 from "../assets/tilemaps/map1.json";
import * as level2 from "../assets/tilemaps/map2.json";

export default class TilemapsProperties {
  private properties = {};
  private maps = [
    level1,
    level2,
  ];

  constructor() {
    this.load();
  }

  public load() {
    this.maps.forEach((jsonMap) => {
      for (let i = 0; i < jsonMap.tilesets[0].tiles.length; i++) {
        const tile = jsonMap.tilesets[0].tiles[i];
        const properties = {};

        for (let j = 0; j < tile.properties.length; j++) {
          properties[tile.properties[j].name] = tile.properties[j].value;
        }

        this.properties[tile.id] = properties;
      }
    });
  }

  public getTileProperties(tile: Phaser.Tile) {
    return this.properties[tile.index - 1];
  }
}
