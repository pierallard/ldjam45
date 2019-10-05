import Wallet from "./Wallet";

export default class WalletGUI {

    private wallet: Wallet;
    private text: Phaser.BitmapText;

    constructor(wallet: Wallet) {
        this.wallet = wallet;
    }

    public create(game: Phaser.Game) {
        this.text = game.add.bitmapText(260, 10, 'Carrier Command', this.wallet.total()+" CDTS", 5);
        //this.text.tint = 0x111;
    }

    public update(game: Phaser.Game) {
        this.text.text = this.wallet.total() + " cdts";
    }
}
