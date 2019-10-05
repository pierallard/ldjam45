import { dlcList } from './DLCConstants';

const x = (x: number) => dlcList.x + x;
const y = (y: number) => dlcList.y + y;

interface DLC {
  name: string;
  description: string[];
  image: string;
  price: number;
}

export class DLCItem {
  private buttonSelected: Phaser.Button;
  private buttonNotSelected: Phaser.Button;
  private titleNotAchated: Phaser.BitmapText;
  private priceNotAcheted: Phaser.BitmapText;
  private dlcGroup: Phaser.Group;
  private game: Phaser.Game;
  private onClick: (dlcItem: DLCItem) => void;

  constructor(
    private index: number,
    public isAcheted: boolean,
    public price: number,
    public name: string,
    public description: string[],
    public image: string) {

  }

  doCreate = (game: Phaser.Game, dlcGroup: Phaser.Group, onClick: (dlcItem: DLCItem) => void) => {
    const dlcItemHeight = 32;
    const yb = (yc: number) => y(this.index * yc);
    if (!this.isAcheted) {
      this.buttonSelected = game.add.button(x(0), yb(dlcItemHeight), 'dlc_item', () => {
        this.select();
        onClick(this);
      });
      dlcGroup.add(this.buttonSelected);
      this.buttonNotSelected = game.add.button(x(0), yb(dlcItemHeight), 'dlc_item_selected', () => {
        
      });
      dlcGroup.add(this.buttonNotSelected);
      this.buttonNotSelected.visible = false;

      this.titleNotAchated = game.add.bitmapText(x(35), yb(dlcItemHeight) + 5, 'Carrier Command', this.name, 5);
      this.titleNotAchated.tint = 0xFF0000;
      dlcGroup.add(this.titleNotAchated);
  
      this.priceNotAcheted = game.add.bitmapText(x(35), yb(dlcItemHeight) + 20, 'Carrier Command', this.price.toString() + ' dollars', 5);
      this.priceNotAcheted.tint = 0x00FF00;
      dlcGroup.add(this.priceNotAcheted);
    } else {
      const achetedDlcImage = game.add.image(x(0), yb(dlcItemHeight), 'dlc_item_acheted');
      dlcGroup.add(achetedDlcImage);

      const title = game.add.bitmapText(x(35), yb(dlcItemHeight) + 5, 'Carrier Command', this.name, 5);
      title.tint = 0xFF00000;
      dlcGroup.add(title);
  
      const price = game.add.bitmapText(x(35), yb(dlcItemHeight) + 20, 'Carrier Command', 'alreay acheted', 5);
      price.tint = 0xFF00000;
      dlcGroup.add(price);
    }
  }

  create = (game: Phaser.Game, group: Phaser.Group, onClick: (dlcItem: DLCItem) => void) => {
    this.game = game;
    this.onClick = onClick;
    this.dlcGroup = game.add.group(null, this.name);
    this.doCreate(game, this.dlcGroup, onClick);
    
    group.add(this.dlcGroup);
  };

  select = () => {
    this.buttonNotSelected.visible = true;
  }

  unselect = () => {
    this.buttonNotSelected.visible = false;
  }

  achete = () => {
    this.unselect();
    this.buttonSelected.destroy();
    this.buttonNotSelected.destroy();
    this.titleNotAchated.destroy();
    this.priceNotAcheted.destroy();

    this.isAcheted = true;

    this.doCreate(this.game, this.dlcGroup, this.onClick);
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
          false,
          dlc.price,
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

    const item = dlcsItems.find(a => !a.isAcheted);
    if (item) {
      item.select();
      onDLCSelected(item);
    }
  };

  update = () => {

  }
  // ...

  // preUpdate(time, delta) {}
}
