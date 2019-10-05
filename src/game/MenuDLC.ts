import DLCList, { DLCItem, DLC } from "./DLCList";
import { dlcPreview, header, slider, sliderArrow } from './DLCConstants' ;

/**
 * MenuDLC AKA Herve45 est la dialog box pour afficher les dlcs et le menu
 */
export default class MenuDLC {
  private menu: Phaser.Sprite;
  private button: Phaser.Button;
  private menuGroup: Phaser.Group;
  private hudGroup: Phaser.Group;
  private onBuy: (dlcItem: DLCItem) => void;
  private shouldShowOpenMenuDLCButton: boolean;
  private dlcs: DLC[];

  constructor(shouldShowOpenMenuDLCButton: boolean) {
    this.shouldShowOpenMenuDLCButton = shouldShowOpenMenuDLCButton;
    this.dlcs = Array.from(Array(10).keys()).map((_, i) => ({
      description: [
        i + 'Lorem ipsum dolor sit',
        i + 'consectetur adipisicing.',
        i + 'Beatae doloribus obcaec',
        i + 'aperiam provident.',
        i + 'quas asperiores quos,',
      ],
      name: 'Wololoh' + i,
      image: 'dlc_1',
      price: i + 0.99,
      isAcheted: false,
    }));
    debugger;
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

    const buttonify = (img: string, x = 0, y = 0, cb: Function) => {
      const button = game.add.button(x, y, img, cb, 2, 1, 0);
      this.menuGroup.add(button);

      return button;
    };

    const textify = (text: string, x = 0, y = 0) => {
      const textEntity = game.add.bitmapText(x, y, 'Carrier Command', text, 5);
      this.menuGroup.add(textEntity);
      return text;
    } 

    this.button = game.add.button(game.width - 29, 5, 'bloc_box', () => {
      this.open();
    }, 2, 1, 0);
  
    this.hudGroup.add(this.button);
    this.hudGroup.visible = this.shouldShowOpenMenuDLCButton;
    this.menu = spritify('menu_dlc_background');
    textify('Menu DLC', 0, 0);

    const dlcList = new DLCList(this.dlcs);

    dlcList.create(game, this.menuGroup, (dlcItem) => {
      this.showDLCPreview(game, dlcItem)
    });

    let scrollPosition = 0;
    buttonify('menu_dlc_header', header.x, header.y, () => {});
    buttonify('menu_dlc_arrow_down', slider.x, slider.height + slider.y - sliderArrow.height, () => {
      scrollPosition++;
      dlcList.scroll(scrollPosition);
    });
    buttonify('menu_dlc_arrow_up', slider.x, slider.y, () => {
      scrollPosition--;
      dlcList.scroll(scrollPosition);
    });
    buttonify('menu_dlc_slider_handle', slider.x, slider.y + sliderArrow.height, () => {});
  }

  showDLCPreview = (game: Phaser.Game, dlcItem: DLCItem) => {
    const preview = game.add.image(dlcPreview.x, dlcPreview.y, 'dlc_item_preview');
    this.menuGroup.add(preview);

    const textEntity = game.add.bitmapText(dlcPreview.x + 50  , dlcPreview.y + 15, 'Carrier Command', dlcItem.dlc.name, 8);
    this.menuGroup.add(textEntity);

    dlcItem.dlc.description.forEach((desc, i) => {
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
    this.shouldShowOpenMenuDLCButton = true;
    this.hudGroup.visible = true;
  };

  update = () => {
    this.button.bringToTop();
  }
  // ...

  // preUpdate(time, delta) {}
}
