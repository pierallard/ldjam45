import Wallet from "../Kapitalism/Wallet";
import PlayerRoom from "../PlayerRoom";

export abstract class ItemToSell {

    protected sprite: Phaser.Sprite;
    protected name: string;
    protected price: number;
    private wallet: Wallet;
    private playerRoom: PlayerRoom;
    protected sold: boolean;
    protected x: number;
    protected y: number;

    constructor(wallet: Wallet, playerRoom: PlayerRoom, x: number, y: number) {
        this.wallet = wallet;
        this.playerRoom = playerRoom;
        this.sold = false;
        this.x = x;
        this.y = y;
    }

    public sell()
    {
        this.wallet.add(this.price);
        this.sold = true;
        this.sprite.destroy();
        if (this.wallet.total() >= this.playerRoom.dlcItem.dlc.price){
            this.playerRoom.backToTheGame();
        }
    }

    public create(game: Phaser.Game) {
        // defined in the children, game jam style
    }
}
