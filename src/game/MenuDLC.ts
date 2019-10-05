/// <reference path="../../dist/lib/phaser.d.ts"/>

const createDLCButton = (game: Phaser.Game, group: Phaser.Group) => {
  return game.add.button(game.width - 50 - 150, 50, 'button', null, null, null, null, null, null, group);
}

/**
 * MenuDLC AKA Herve45 est la dialog box pour afficher les dlcs et le menu
 */
export default class MenuDLC {
  private menu: Phaser.Sprite;
  private button: Phaser.Button;
  private group: Phaser.Group;

  constructor(private shouldShowOpenMenuDLCButton: boolean) {
  }

  create = (game: Phaser.Game) => {
    this.group = game.add.group(null, 'MenuDLC');
    game.add.existing(this.group);
    this.menu = game.add.sprite(0, 0, 'menu_dlc_background');
    this.group.add(this.menu);

    this.group.visible = false;

    //this.button = createDLCButton(game, group);
    //this.button.visible = this.shouldShowOpenMenuDLCButton;
  }

  open = () => {
    this.group.visible = true;
  }

  close = () => {
    this.group.visible = false;
  }

  displayButton = () => {
    this.button.visible = false;
  };

  update = () => {

  }
  // ...

  // preUpdate(time, delta) {}
}
