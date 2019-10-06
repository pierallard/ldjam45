import Wallet from "./Wallet";

export default class WalletGUI {

    private wallet: Wallet;
    private text: Phaser.Text;

    constructor(wallet: Wallet) {
        this.wallet = wallet;
    }

    public create(game: Phaser.Game) {
        this.text = game.add.text(1000, 10, this.wallet.total() + " USD", { font: "35px Gloria Hallelujah", fill: "#333333" });
    }

    public update(game: Phaser.Game) {
        this.text.text = this.wallet.total() + " USD";
    }
}
