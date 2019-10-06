import { DLC } from "../game/DLCList";

interface Window {
  openDLCMenu: (dlcs: DLC[], onBuy: (dlc: any) => void) => void;
  closeDLCMenu: () => void;
}
