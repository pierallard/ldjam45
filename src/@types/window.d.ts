import { DLC } from "../game/DLCList";

interface Window {
  openDLCMenu: (dlcs: DLC[], onBuy: (dlc: any) => void, currentWallet: number) => void;
  closeDLCMenu: () => void;
}
