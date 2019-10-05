const referenceX = 150;
const referenceY = 26;

const x = (x: number) => referenceX + x;
const y = (y: number) => referenceY + y;

interface DLC {
  name: string;
  description: string[];
  image: string;
}

class DLCItem {
  constructor(
    private index: number,
    private name: string,
    private description: string[],
    private image: string) {

  }

  create = (game: Phaser.Game, group: Phaser.Group) => {
    const yi = (yv: number) => y(yv);
    const dlcGroup = game.add.group(null, this.name);
    const button = game.add.button(x(0), y((this.index * 32)), 'dlc_item', () => {

    });
    dlcGroup.add(button);

    const title = game.add.bitmapText(x(35), y(5), 'Carrier Command', this.name, 5);
    title.tint = 0xFF0000;
    dlcGroup.add(title);
    
    group.add(dlcGroup);
  }
} 

export default class DLCList {
  constructor(private dlcs: DLC[]) {
  }

  create = (game: Phaser.Game, group: Phaser.Group) => {
    const dlcs = this.dlcs.map(
      (dlc, i) => {
        const dlcItem = new DLCItem(
          i,
          dlc.name,
          dlc.description,
          dlc.image,
        );

        dlcItem.create(game, group);
      }
    )
  }

  update = () => {

  }
  // ...

  // preUpdate(time, delta) {}
}
