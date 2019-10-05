import {Level} from "./Level";
import Point from "../game/Point";

export class Level3 extends Level {
  constructor() {
    super([
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2],
        [2, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 2],
        [2, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2],
        [2, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 2],
        [2, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 2],
        [2, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 2],
        [2, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 2],
        [2, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 2],
        [2, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      ],
      new Point(4, 11), // hero
      [ // coins
        new Point(1, 1),
        new Point(11, 1),
        new Point(12, 1),
        new Point(11, 2),
        new Point(12, 2),
        new Point(7, 3),
        new Point(1, 7),
        new Point(5, 8),
        new Point(12, 9),
        new Point(7, 10),
        new Point(1, 11),
      ],
      new Point(9, 6) // playable coin
    );
  }

  getStageNumber() {
    return '3';
  }

  getNormalMessage() {
    return "I don't feel so great...\n\nHow could I stop this?"
  }

  getRemainingTime() {
    return 32;
  }

  shouldGlitch() {
    return true;
  }
}

