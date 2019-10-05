import { dlcList } from './DLCConstants';

const x = (x: number) => dlcList.x + x;
const y = (y: number) => dlcList.y + y;

interface DLC {
  name: string;
  description: string[];
  image: string;
}

export class DLCItem {
  private buttonNotSelected: Phaser.Button;

  constructor(
    private index: number,
    public name: string,
    public description: string[],
    public image: string) {

  }

  create = (game: Phaser.Game, group: Phaser.Group, onClick: (dlcItem: DLCItem) => void) => {
    const yi = (yv: number) => y(yv);
    const dlcGroup = game.add.group(null, this.name);
    const buttonSelected = game.add.button(x(0), y((this.index * 32)), 'dlc_item', () => {
      this.select();
      onClick(this);
    });
    dlcGroup.add(buttonSelected);
    this.buttonNotSelected = game.add.button(x(0), y((this.index * 32)), 'dlc_item_selected', () => {
      
    });
    dlcGroup.add(this.buttonNotSelected);
    this.buttonNotSelected.visible = false;

    const title = game.add.bitmapText(x(35), y(5), 'Carrier Command', this.name, 5);
    title.tint = 0xFF0000;
    dlcGroup.add(title);
    
    group.add(dlcGroup);
  };

  select = () => {
    this.buttonNotSelected.visible = true;
  }

  unselect = () => {
    this.buttonNotSelected.visible = false;
  }
} 

export default class DLCList {
  constructor(private dlcs: DLC[]) {
  }

  create = (game: Phaser.Game, group: Phaser.Group, onDLCSelected: (dlcItem: DLCItem) => void) => {
    const dlcsItems = this.dlcs.map(
      (dlc, i) => {
        const dlcItem = new DLCItem(
          i,
          dlc.name,
          dlc.description,
          dlc.image,
        );

        dlcItem.create(game, group, (dlcItem) => {
          const othersDlcs = dlcsItems.filter(currentDlcItem => currentDlcItem.name !== dlcItem.name);
          othersDlcs.forEach(dlc => dlc.unselect());
          onDLCSelected(dlcItem);
        });

        return dlcItem;
      }
    );

    dlcsItems[0].select();
    onDLCSelected(dlcsItems[0]);
  }

  update = () => {

  }
  // ...

  // preUpdate(time, delta) {}
}
