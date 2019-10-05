import Point from "./Point";
import Tilemap = Phaser.Tilemap;

export default class Prison extends Phaser.State {
  private map: Tilemap;

  public create(game: Phaser.Game) {
    this.map = game.add.tilemap('prison', 16, 16);
    this.map.addTilesetImage("dungeon_sheet", "tiles");

    const floor = this.map.createLayer("floor");
    const walls = this.map.createLayer("walls");
    const items = this.map.createLayer("items");

    // layer.resizeWorld();
  }

  public update(game: Phaser.Game) {

  }

  public canGoTo(position: Point) {
    return true;
  }
}
