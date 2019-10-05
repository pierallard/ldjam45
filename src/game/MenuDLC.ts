import DLCList, { DLCItem } from "./DLCList";
import { dlcPreview } from './DLCConstants' ;

/**
 * MenuDLC AKA Herve45 est la dialog box pour afficher les dlcs et le menu
 */
export default class MenuDLC {
  private menu: Phaser.Sprite;
  private button: Phaser.Button;
  private menuGroup: Phaser.Group;
  private hudGroup: Phaser.Group;
  private onBuy: (dlcItem: DLCItem) => void;

  constructor(private shouldShowOpenMenuDLCButton: boolean) {
  }

  create = (game: Phaser.Game, onBuy: (dlcItem: DLCItem) => void) => {
    this.onBuy = onBuy;
    this.hudGroup = game.add.group(null, 'HUD');
    game.add.existing(this.hudGroup);
    this.menuGroup = game.add.group(null, 'MenuDLC');
    game.add.existing(this.menuGroup);
    this.menuGroup.visible = false;

    const spritify = (img: string, x = 0, y = 0) => {
      const sprite = game.add.sprite(x, y, img);
      this.menuGroup.add(sprite);

      return sprite;
    }

    const textify = (text: string, x = 0, y = 0) => {
      const textEntity = game.add.bitmapText(x, y, 'Carrier Command', text, 5);
      this.menuGroup.add(textEntity);
      return text;
    } 

    const button = game.add.button(game.width - 29, 5, 'bloc_box', () => {
      this.open();
    }, 2, 1, 0);
  
    this.hudGroup.add(button);
    this.hudGroup.visible = this.shouldShowOpenMenuDLCButton;
    this.menu = spritify('menu_dlc_background');
    textify('Menu DLC', 0, 0);

    const dlcList = new DLCList([
      {
        description: [
          '1Lorem ipsum dolor sit',
          '1consectetur adipisicing.',
          '1Beatae doloribus obcaec',
          '1aperiam provident.',
          '1quas asperiores quos,',
        ],
        name: 'Wololoh',
        image: 'dlc_1',
      },
      {
        description: [
          '2Lorem ipsum dolor sit',
          '2consectetur adipisicing.',
          '2Beatae doloribus obcaec',
          '2aperiam provident.',
          '2quas asperiores quos,',
        ],
        name: 'Wololoh2',
        image: 'dlc_1',
      },
      {
        description: [
          '3Lorem ipsum dolor sit',
          '3consectetur adipisicing.',
          '3Beatae doloribus obcaec',
          '3aperiam provident.',
          '3quas asperiores quos,',
        ],
        name: 'Wololoh3',
        image: 'dlc_1',
      },
      {
        description: [
          '4Lorem ipsum dolor sit',
          '4consectetur adipisicing.',
          '4Beatae doloribus obcaec',
          '4aperiam provident.',
          '4quas asperiores quos,',
        ],
        name: 'Wololoh4',
        image: 'dlc_1',
      }
    ]);

    dlcList.create(game, this.menuGroup, (dlcItem) => {
      this.showDLCPreview(game, dlcItem)
    });
  }

  showDLCPreview = (game: Phaser.Game, dlcItem: DLCItem) => {
    const preview = game.add.image(dlcPreview.x, dlcPreview.y, 'dlc_item_preview');
    this.menuGroup.add(preview);

    const textEntity = game.add.bitmapText(dlcPreview.x + 50  , dlcPreview.y + 15, 'Carrier Command', dlcItem.name, 8);
    this.menuGroup.add(textEntity);

    dlcItem.description.forEach((desc, i) => {
      const textEntity = game.add.bitmapText(dlcPreview.x + 8, dlcPreview.y + 50 + (i*10), 'Carrier Command', desc, 4);
      this.menuGroup.add(textEntity);
    });


    const button = game.add.button(dlcPreview.x + 20, 160, 'buy_dlc_button', () => {
      this.onBuy(dlcItem);
    }, 2, 1, 0);
  
    this.menuGroup.add(button);
  }

  open = () => {
    this.menuGroup.visible = true;
  }

  close = () => {
    this.menuGroup.visible = false;
  }

  displayButton = () => {
    this.button.visible = false;
  };

  update = () => {
    this.button.bringToTop();
  }
  // ...

  // preUpdate(time, delta) {}
}
