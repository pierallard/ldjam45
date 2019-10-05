import {Level} from "./Level";
import Point from "../game/Point";

export class Level2 extends Level {
  constructor() {
    super([
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 2],
        [2, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 2],
        [2, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 2],
        [2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 2],
        [2, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 2],
        [2, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 2],
        [2, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      ],
      new Point(5, 5), // hero
      [ // coins
        new Point(1, 1),
        new Point(10, 1),
        new Point(5, 2),
        new Point(2, 5),
        new Point(8, 5),
        new Point(10, 5),
        new Point(5, 8),
        new Point(3, 10),
        new Point(10, 10),
      ],
      new Point(7, 7) // playable coin
    );
  }

  getStageNumber() {
    return '2';
  }

  getNormalMessage() {
    return "WTF has just happened?\n\nWhat was that glitch?\n\nDid I just dream?"
  }

  getRemainingTime() {
    return 25;
  }

  shouldGlitch() {
    return true;
  }
}

