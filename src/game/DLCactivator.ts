import {DLC} from "./DLCs";
import {AbstractDungeonLevel} from "./game_state/AbstractDungeonLevel";

export default class DLCactivator {
  onActivation(game: Phaser.Game, dlc: DLC) {

    switch (dlc.name) {
      case 'Lock Picking Capabilities':
        console.log('ACTIVATED = ', dlc);
        break;
      case 'Business Man Skin Pack (Cosmetic)':
        (game.state.getCurrentState() as AbstractDungeonLevel).player.activateBusiness(game);
        console.log('ACTIVATED = ', dlc);
        break;
      case 'Hacker DLC Pack Premium':
        console.log('ACTIVATED = ', dlc);
        break;
      case 'Multi-player Mode':
        (game.state.getCurrentState() as AbstractDungeonLevel).activateMultiplayer();
        console.log('ACTIVATED = ', dlc);
        break;
    }

  }
}

