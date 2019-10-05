export default class Prison extends Phaser.State {

  public create(game: Phaser.Game) {
    const map = game.add.tilemap('prison', 16, 16);
    map.addTilesetImage("dungeon_sheet", "tiles");

    const floor = map.createLayer("floor");
    const walls = map.createLayer("walls");
    const items = map.createLayer("items");

    // layer.resizeWorld();
  }

  public update(game: Phaser.Game) {

  }
}
