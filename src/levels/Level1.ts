import {Level} from "./Level";
import Point from "../game/Point";

export class Level1 extends Level {
  constructor() {
    super([
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 2],
        [2, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 2],
        [2, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 2],
        [2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2],
        [2, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2],
        [2, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      ],
      new Point(1, 1), // hero
      [ // coins
        new Point(7, 1),
        new Point(3, 3),
        new Point(7, 4),
        new Point(9, 5),
        new Point(1, 8),
        new Point(10, 8),
        new Point(6, 10),
      ],
      new Point(10, 1) // playable coin
    );
  }

  getStageNumber() {
    return '1';
  }

  getRemainingTime() {
    return 27;
  }

  getNormalMessage() {
    return "Life is cool for a naked amazon.\n\nTypical daily currency hunt!"
  }
}
