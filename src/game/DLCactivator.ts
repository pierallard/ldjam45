import {DLC, DLC_MULTIPLAYER} from "./DLCs";
import {AbstractDungeonLevel} from "./game_state/AbstractDungeonLevel";

export default class DLCactivator {
  onActivation(game: Phaser.Game, dlc: DLC) {

    switch (dlc.name) {
      case 'Lock Picking Capabilities':
        console.log('ACTIVATED = ', dlc);
        break;
      case 'Business Man Skin Pack (Cosmetic)':
        console.log('ACTIVATED = ', dlc);
        break;
      case 'Hacker DLC Pack Premium':
        console.log('ACTIVATED = ', dlc);
        break;
      case DLC_MULTIPLAYER:
        console.log('ACTIVATED = ', dlc);
        break;
      case 'Transhumanism, become an augmented human!':
        console.log('ACTIVATED = ', dlc);
        break;

    }

  }
}

