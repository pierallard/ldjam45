import DLCList from "./DLCList";

/**
 * MenuDLC AKA Herve45 est la dialog box pour afficher les dlcs et le menu
 */
export default class MenuDLC {
  private menu: Phaser.Sprite;
  private button: Phaser.Button;
  private menuGroup: Phaser.Group;
  private hudGroup: Phaser.Group;

  constructor(private shouldShowOpenMenuDLCButton: boolean) {
  }

  create = (game: Phaser.Game) => {
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
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          'Beatae doloribus obcaecati aperiam provident. Reiciendis quas asperiores quos perferendis,',
          'culpa nostrum temporibus iusto harum architecto dolor, aut nulla quisquam a illo.',
        ],
        name: 'Wololoh',
        image: 'dlc_1',
      },
      {
        description: [
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          'Beatae doloribus obcaecati aperiam provident. Reiciendis quas asperiores quos perferendis,',
          'culpa nostrum temporibus iusto harum architecto dolor, aut nulla quisquam a illo.',
        ],
        name: 'Wololoh2',
        image: 'dlc_1',
      },
      {
        description: [
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          'Beatae doloribus obcaecati aperiam provident. Reiciendis quas asperiores quos perferendis,',
          'culpa nostrum temporibus iusto harum architecto dolor, aut nulla quisquam a illo.',
        ],
        name: 'Wololoh3',
        image: 'dlc_1',
      },
      {
        description: [
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          'Beatae doloribus obcaecati aperiam provident. Reiciendis quas asperiores quos perferendis,',
          'culpa nostrum temporibus iusto harum architecto dolor, aut nulla quisquam a illo.',
        ],
        name: 'Wololoh4',
        image: 'dlc_1',
      }
    ]);

    dlcList.create(game, this.menuGroup);
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
