import {ItemToSell} from "./ItemToSell";

export default class ItemsToSell {

    public items: ItemToSell[];

    constructor() {
        this.items = [];
    }

    public add(item: ItemToSell) {
        this.items.push(item);
    }
}
