import Point from "./Point";
import Tilemap = Phaser.Tilemap;

export default class Prison extends Phaser.State {
  private map: Tilemap;

  public create(game: Phaser.Game) {
    this.map = game.add.tilemap('prison', 16, 16);
    this.map.addTilesetImage("dungeon_sheet", "tiles");
    this.map.enableDebug = true;

    const floor = this.map.createLayer("floor");
    const walls = this.map.createLayer("walls");
    const items = this.map.createLayer("items");

    console.log(this.map)

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
}
