import Wallet from "../Kapitalism/Wallet";

export abstract class ItemToSell {

    protected sprite: Phaser.Sprite;
    protected name: string;
    protected price: number;

    private wallet: Wallet;

    constructor(wallet: Wallet) {
        this.wallet = wallet;
    }

    public sell()
    {
        this.wallet.add(this.price);
        this.sprite.destroy();
    }
}
