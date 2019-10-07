import Wallet from "./Wallet";
import {DLC} from "../../DLCs";

export default class WalletGUI {

    private wallet: Wallet;
    private text: Phaser.Text;
    private dlc: DLC;
    private dlcText: Phaser.Text;

    constructor(wallet: Wallet) {
        this.wallet = wallet;
    }

    public create(game: Phaser.Game) {
        this.text = game.add.text(850, 10, 'Wallet: ' + this.wallet.total() + " USD", { font: "35px Gloria Hallelujah", fill: "#333333" });
        this.dlcText = game.add.text(850, 50, 'DLC price: ' + 0 + " USD", { font: "35px Gloria Hallelujah", fill: "#333333" });
    }

    public update(game: Phaser.Game) {
        this.text.text = 'Wallet: ' + this.wallet.total() + " USD";
        if (this.dlc) {
            this.dlcText.text = 'DLC price: ' + this.dlc.price + " USD";
        }
    }

    public setDLC(dlc: DLC) {
        this.dlc = dlc;
    }
}
