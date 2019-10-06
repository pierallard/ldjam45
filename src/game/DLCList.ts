import { dlcList } from './DLCConstants';

const x = (x: number) => dlcList.x + x;
const y = (y: number) => dlcList.y + y;

export interface DLC {
  name: string;
  description: string[];
  image: string;
  price: number;
  isAcheted: boolean;
  isSelected: boolean;
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
    public dlc: DLC) {

  }

  doCreate = (game: Phaser.Game, dlcGroup: Phaser.Group, onClick: (dlcItem: DLCItem) => void) => {
    const dlcItemHeight = 32;
    const yb = (yc: number) => y(this.index * yc);
    if (!this.dlc.isAcheted) {
      this.buttonSelected = game.add.button(x(0), yb(dlcItemHeight), 'dlc_item', () => {
        this.select();
        onClick(this);
      });
      dlcGroup.add(this.buttonSelected);
      this.buttonNotSelected = game.add.button(x(0), yb(dlcItemHeight), 'dlc_item_selected', () => {
        
      });
      dlcGroup.add(this.buttonNotSelected);
      this.buttonNotSelected.visible = this.dlc.isSelected;

      this.titleNotAchated = game.add.bitmapText(x(35), yb(dlcItemHeight) + 5, 'Carrier Command', this.dlc.name, 5);
      this.titleNotAchated.tint = 0xFF0000;
      dlcGroup.add(this.titleNotAchated);
  
      this.priceNotAcheted = game.add.bitmapText(x(35), yb(dlcItemHeight) + 20, 'Carrier Command', this.dlc.price.toString() + ' dollars', 5);
      this.priceNotAcheted.tint = 0x00FF00;
      dlcGroup.add(this.priceNotAcheted);
    } else {
      const achetedDlcImage = game.add.image(x(0), yb(dlcItemHeight), 'dlc_item_acheted');
      dlcGroup.add(achetedDlcImage);

      const title = game.add.bitmapText(x(35), yb(dlcItemHeight) + 5, 'Carrier Command', this.dlc.name, 5);
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
    this.dlcGroup = game.add.group(null, this.dlc.name);
    this.doCreate(game, this.dlcGroup, onClick);
    
    group.add(this.dlcGroup);
  };

  select = () => {
    if (this.dlc.isAcheted) {
      return;
    }

    this.buttonNotSelected.visible = true;
    this.dlc.isSelected = true;
  }

  unselect = () => {
    if (this.dlc.isAcheted) {
      return;
    }

    this.buttonNotSelected.visible = false;
    this.dlc.isSelected = false;
  }

  achete = () => {
    this.unselect();
    this.buttonSelected.destroy();
    this.buttonNotSelected.destroy();
    this.titleNotAchated.destroy();
    this.priceNotAcheted.destroy();

    this.dlc.isAcheted = true;

    this.doCreate(this.game, this.dlcGroup, this.onClick);
  }
}

export default class DLCList {
  private scrollPosition = 0;
  private group: Phaser.Group;
  private internalUpdate: () => void;

  constructor(private dlcs: DLC[]) {
  }

  doCreate = (game: Phaser.Game, group: Phaser.Group, onDLCSelected: (dlcItem: DLCItem) => void) => {
    this.group = group;
    const dlcsItems = this.dlcs.filter((a, i) => {
      return i >= this.scrollPosition;
    }).map(
      (dlc, i) => {
        const dlcItem = new DLCItem(
          i,
          dlc,
        );

        dlcItem.create(game, group, (dlcItem) => {
          const othersDlcs = dlcsItems.filter(currentDlcItem => currentDlcItem.dlc.name !== dlcItem.dlc.name);
          othersDlcs.forEach(dlc => dlc.unselect());
          onDLCSelected(dlcItem);
        });

        return dlcItem;
      }
    );

    return dlcsItems;
  };

  create = (game: Phaser.Game, group: Phaser.Group, onDLCSelected: (dlcItem: DLCItem) => void) => {
    const theGroup = game.add.group(null, 'the_group_oui');
    group.add(theGroup);
    this.group = theGroup;
    this.internalUpdate = () => this.doCreate(game, theGroup, onDLCSelected);
    this.internalUpdate();
  };

  scroll = (scrollPosition: number) => {
    this.group.removeChildren();//.forEach(a => (a as Phaser.Group).destroy());
    this.group.children.forEach((a: any) => a.destroy());
    this.scrollPosition = scrollPosition;
    this.internalUpdate();
  }
  // ...

  // preUpdate(time, delta) {}
}
