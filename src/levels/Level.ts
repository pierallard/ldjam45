import Point from "../game/Point";
import { Tile } from "../game/Tile";
import {Bloc} from "../game/Bloc";
import {Bush} from "../game/Bush";

export class Level {
  private grid: number[][];
  protected tiles: Tile[] = [];
  protected width: number;
  protected height: number;
  private playableCoinPosition: Point;
  private playerPosition: Point;
  private coinPositions: Point[];

  getStageNumber() {
    return 'X';
  }

  getNormalMessage() {
    return "X"
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  constructor(levelDescriptor: number[][], playerPosition: Point, coinPositions: Point[], evilCoinPosition: Point) {
    this.grid = levelDescriptor;
    this.playableCoinPosition = evilCoinPosition;
    this.playerPosition = playerPosition;
    this.coinPositions = coinPositions;

    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        switch (this.grid[y][x]) {
          case 0:
            this.tiles.push(new Tile(new Point(x, y)));
            break;
          case 1:
            this.tiles.push(new Bloc(new Point(x, y)));
            break;
          case 2:
            this.tiles.push(new Bush(new Point(x, y)));
            break;
        }
      }
    }

    this.width = this.grid[0].length;
    this.height = this.grid.length;
  }

  create(
    game: Phaser.Game,
    normalGroup: Phaser.Group,
    evilGroup: Phaser.Group
  ) {
    this.tiles.forEach(tile => {
      tile.create(game, normalGroup, evilGroup);
    });
  }

  isAllowedForPlayer(position: Point) {
    if (position.x < 0) {
      return false;
    }
    if (position.x >= this.getWidth()) {
      return false;
    }
    if (position.y < 0) {
      return false;
    }
    if (position.y >= this.getHeight()) {
      return false;
    }

    for (let i = 0; i < this.tiles.length; i++) {
      if (this.tiles[i].getPosition().equals(position)) {
        return this.tiles[i].isAllowedForPlayer();
      }
    }
  }

  isAllowedForCoin(position: Point) {
    if (position.x < 0) {
      return false;
    }
    if (position.x >= this.getWidth()) {
      return false;
    }
    if (position.y < 0) {
      return false;
    }
    if (position.y >= this.getHeight()) {
      return false;
    }

    for (let i = 0; i < this.tiles.length; i++) {
      if (this.tiles[i].getPosition().equals(position)) {
        return this.tiles[i].isAllowedForCoin();
      }
    }
  }

  getGrid(): number[][] {
    return this.grid;
  }

  getOriginalPlayableCoinPosition() {
    return this.playableCoinPosition;
  }

  getOriginalPlayerPosition() {
    return this.playerPosition;
  }

  getCoinPositions() {
    return this.coinPositions;
  }

  getRemainingTime() {
    return 30;
  }

  shouldGlitch() {
    return false;
  }
}
