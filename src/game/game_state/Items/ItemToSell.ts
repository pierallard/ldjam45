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
    private priceImage: Phaser.Image;
    private priceText: Phaser.Text;

    constructor(wallet: Wallet, playerRoom: PlayerRoom, x: number, y: number) {
        this.wallet = wallet;
        this.playerRoom = playerRoom;
        this.sold = false;
        this.x = x;
        this.y = y;
    }

    public sell(e)
    {
        if (this.playerRoom.blackScren.visible) {
            return;
        }

        let itemsAccepted = [];

        // Pas vendus
        itemsAccepted = this.playerRoom.itemsToSell.items.filter((item) => !item.sold);

        // Pas le lit si y a d'autres trucs
        if (itemsAccepted.length > 1) {
            itemsAccepted = itemsAccepted.filter((item) => item.name != "Scandinavian bed");
        }

        const priceDlc = this.playerRoom.dlc.price;
        let itemsAboveDlcPrice: ItemToSell[] = [];
        itemsAccepted.forEach((item) => {
            if (item.price > priceDlc) itemsAboveDlcPrice.push(item);
        });
        itemsAboveDlcPrice = itemsAboveDlcPrice.sort((a, b) => a.price - b.price);
        itemsAboveDlcPrice.shift();

        itemsAccepted = itemsAccepted.filter((item) => {
            return !itemsAboveDlcPrice.includes(item);
        });

        console.log("ACCEPTED = ", itemsAccepted);

        if (!itemsAccepted.includes(this)) {
            this.playerRoom.playerMessageBox.addMessageBox(e.game, "Ahah, I'm not crazy, I don't need\nto sell this expansive thing\njust for a DLC!");
            return;
        }

        this.wallet.add(this.price);
        this.sold = true;
        this.sprite.destroy();
        if (this.playerRoom.dlc && this.wallet.total() >= this.playerRoom.dlc.price) {
            this.playerRoom.backToTheGame();
        }
    }

    public create(game: Phaser.Game) {
        const x = this.x + this.sprite.width / 2;
        const y = this.y + this.sprite.height / 2;
        this.priceImage = game.add.image(x, y, 'price');
        this.priceImage.scale.set(0.25, 0.25);
        this.priceImage.alpha = 0;
        this.priceImage.anchor.set(0.5, 0.5);
        this.priceImage.rotation = Math.PI / 4;

        this.priceText = game.add.text(x - 25, y - 10, this.price + '$', { font: "15px Gloria Hallelujah", fill: "#ffffff" });
        this.priceText.alpha = 0;
    }

    public update(game: Phaser.Game) {
        if (this.playerRoom.blackScren.visible) {
            this.priceImage.alpha = 0;
            this.priceText.alpha = 0;
            return;
        }
        if (this.sold) {
            this.priceImage.alpha = 0;
            this.priceText.alpha = 0;
            return;
        }
        if (game.input.mousePointer.x >= this.x &&
            game.input.mousePointer.y >= this.y &&
            game.input.mousePointer.x <= this.x + this.sprite.width &&
            game.input.mousePointer.y <= this.y + this.sprite.height
        ) {
            this.priceImage.alpha = 1;
            this.priceText.alpha = 1;
        } else {
            this.priceImage.alpha = 0;
            this.priceText.alpha = 0;
        }
    }
}
