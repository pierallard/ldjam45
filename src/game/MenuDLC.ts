import { DLC } from "./DLCs";
import { dlcPreview, header, slider, sliderArrow, maxDlcItemsInList } from './DLCConstants' ;
import DLCs from './DLCs';

export const DLC_CROCHETAGE = 'Lock Picking Capabilities';

/**
 * MenuDLC AKA Herve45 est la dialog box pour afficher les dlcs et le menu
 */
export default class MenuDLC {
  private onBuy: (dlc: DLC) => void;
  public displayButton: () => void;

  create = (game: Phaser.Game, showButton: boolean, onBuy: (dlc: DLC) => void) => {
    this.onBuy = onBuy;

    const displayButton = () => {
      const hudGroup = game.add.group(null, 'HUD');
      game.add.existing(hudGroup);
      game.add.button(game.width - 49, game.height - 16, 'dlcbuy', () => {
        (window as any).openDLCMenu(DLCs, (dlc) => this.onBuy(dlc));
      }, 2, 1, 0);
    }

    if (showButton) {
      displayButton();
    }

    this.displayButton = () => displayButton();
  }

  open = () => {
    (window as any).openDLCMenu(DLCs, (dlc) => this.onBuy(dlc));
  };

  close = () => {
    (window as any).closeDLCMenu();
  };
}
