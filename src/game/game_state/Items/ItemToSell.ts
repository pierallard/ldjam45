import Wallet from "../Kapitalism/Wallet";
import PlayerRoom from "../PlayerRoom";

export abstract class ItemToSell {

    protected sprite: Phaser.Sprite;
    protected name: string;
    protected price: number;
    private wallet: Wallet;
    private playerRoom: PlayerRoom;

    constructor(wallet: Wallet, playerRoom: PlayerRoom) {
        this.wallet = wallet;
        this.playerRoom = playerRoom;
    }

    public sell()
    {
        this.wallet.add(this.price);
        this.sprite.destroy();
        debugger;
        if (this.wallet.total() >= this.playerRoom.dlcItem.dlc.price){
            this.playerRoom.backToTheGame();
        }
    }
}
