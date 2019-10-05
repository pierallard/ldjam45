
export default class Wallet {

    private amount: number;

    constructor() {
        this.amount = 0;
    }

    public add(thune: number) {
        this.amount += thune;
    }

    public remove(thune: number) {
        this.amount -= thune;
    }

    public total() {
        return this.amount;
    }
}
