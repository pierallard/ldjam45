export default class Preload extends Phaser.State {
  private progress: Phaser.Text;
  private graphics: Phaser.Graphics;

  preload() {
    this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY-10, '0%', {fill: 'white', fontSize: 11, font: '11px Courier New'});
    this.progress.anchor.setTo(.5,.5);
    this.graphics = this.game.add.graphics();
    this.graphics.lineStyle(1, 0x99e550);
    this.graphics.drawRect(this.game.world.centerX - 75.5, this.game.world.centerY + 0.5, 150, 10);
    this.game.load.onFileComplete.add(this.fileComplete, this);

    this.loadAudio();
    this.loadImages();
    this.loadFonts();
  }

  fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text = progress+"%";
    this.graphics.beginFill(0x6abe30);
    this.graphics.drawRect(this.game.world.centerX - 74.5, this.game.world.centerY + 1.5, 148 * (progress / 100), 8);

    if (progress >= 100) {
      this.game.state.start('Logo');
    }
  };

  private loadAudio() {
    this.game.load.audio('walk', 'src/assets/musics/walk.mp3');
    this.game.load.audio('pee', 'src/assets/musics/pee.mp3');
    this.game.load.audio('cocamachine', 'src/assets/musics/cocamachine.mp3');
    this.game.load.audio('keyboard', 'src/assets/musics/keyboard.mp3');
    this.game.load.audio('water', 'src/assets/musics/water.mp3');
    this.game.load.audio('backgroundsound', 'src/assets/musics/backgroundsound.mp3');
  }

  private loadImages() {
    this.game.load.image('menu_dlc_background', 'src/assets/images/menu_dlc_background.png');
    this.game.load.image('dlc_item', 'src/assets/images/dlc_item.png');
    this.game.load.image('dlc_item_selected', 'src/assets/images/dlc_item_selected.png');
    this.game.load.image('dlc_item_preview', 'src/assets/images/dlc_item_preview.png');
    this.game.load.image('dlc_item_acheted', 'src/assets/images/dlc_item_acheted.png');
    this.game.load.image('buy_dlc_button', 'src/assets/images/buy_dlc_button.png');
    this.game.load.image('paypal', 'src/assets/images/paypal.png');
    this.game.load.image('menu_dlc_arrow_down', 'src/assets/images/menu_dlc_arrow_down.png');
    this.game.load.image('menu_dlc_arrow_up', 'src/assets/images/menu_dlc_arrow_up.png');
    this.game.load.image('menu_dlc_slider_handle', 'src/assets/images/menu_dlc_slider_handle.png');
    this.game.load.image('menu_dlc_background', 'src/assets/images/menu_dlc_background.png');
    this.game.load.image('menu_dlc_header', 'src/assets/images/menu_dlc_header.png');
    this.game.load.image('dlcbuy', 'src/assets/images/dlcbuy.png');
    this.game.load.image('messagebox', 'src/assets/messagebox.png');
    this.game.load.image('backgroundplayerroom', 'src/assets/images/backgroundplayerroom.png');
    this.game.load.image('pointdesclamasion', 'src/assets/images/pointdesclamasion.png');
    this.game.load.image('backgroundlamp', 'src/assets/images/backgroundlamp.png');
    this.game.load.image('playerdialogmessage', 'src/assets/images/dialogplayer.png');
    this.game.load.image('price', 'src/assets/images/price.png');
    this.game.load.spritesheet('server', 'src/assets/images/computer.png', 48, 32);



    this.game.load.image('dlc_thumb_1', 'src/assets/images/dlc_thumb_1.png');

    this.game.load.image('playerroombackground', 'src/assets/images/playerroombackground.png');
    this.game.load.image('player_front', 'src/assets/images/player_front.png');
    this.game.load.image('player_back', 'src/assets/images/player_back.png');
    this.game.load.image('player_business_front', 'src/assets/images/player_business_front.png');
    this.game.load.image('player_business_back', 'src/assets/images/player_business_back.png');

    this.game.load.image('iench', 'src/assets/images/iench.png');
    this.game.load.image('vigil', 'src/assets/images/vigil_front.png');

    this.game.load.image('main', 'src/assets/tilesets/interior.png');
    this.game.load.spritesheet('main_spritesheet', 'src/assets/tilesets/interior.png', 16, 16);
    this.game.load.tilemap('level1', 'src/assets/tilemaps/map1.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.tilemap('level2', 'src/assets/tilemaps/map2.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.tilemap('level3', 'src/assets/tilemaps/map3.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.tilemap('level4', 'src/assets/tilemaps/map4.json', null, Phaser.Tilemap.TILED_JSON);

    this.game.load.spritesheet('chips', 'src/assets/images/chips.png', 12, 12);
    this.game.load.image('shadow', 'src/assets/images/shadow.png');
    this.game.load.image('logo', 'src/assets/images/logo2.png');
    this.game.load.spritesheet('tshirt', 'src/assets/images/tshirt.png', 181, 181);
    this.game.load.spritesheet('lamp-lava', 'src/assets/images/lamp.png', 48, 121);
    this.game.load.spritesheet('chair', 'src/assets/images/chair.png', 202, 343);
    this.game.load.spritesheet('basket', 'src/assets/images/basket.png', 145, 103);
    this.game.load.spritesheet('playboy_magazine', 'src/assets/images/playboy.png', 179, 180);
    this.game.load.spritesheet('britney_poster', 'src/assets/images/poster.png', 108, 155);
    this.game.load.spritesheet('bed', 'src/assets/images/bed.png', 325, 490);
    this.game.load.spritesheet('game_boy', 'src/assets/images/gameboy.png', 69, 74);
    this.game.load.spritesheet('pokemon_card', 'src/assets/images/cards.png', 69, 70);
    this.game.load.spritesheet('sock', 'src/assets/images/sock.png', 86, 62);
    this.game.load.spritesheet('underpants', 'src/assets/images/underpants.png', 112, 108);

    this.game.load.spritesheet('laptop', 'src/assets/images/laptop.png', 106, 117);
    this.game.load.spritesheet('multiplayer-btn', 'src/assets/images/multiplayer-btn.png', 74, 13);
    this.game.load.spritesheet('lifebar-btn', 'src/assets/images/lifebar-btn.png', 74, 13);
    this.game.load.spritesheet('hud-background', 'src/assets/images/hud-background.png', 300, 18);
    this.game.load.spritesheet('bladder-indicator', 'src/assets/images/bladder.png', 34, 13);

  }

  private loadFonts() {
    this.game.load.bitmapFont('Carrier Command', 'src/assets/fonts/carrier_command.png', 'src/assets/fonts/carrier_command.xml');
    this.game.load.bitmapFont('Carrier Command Red', 'src/assets/fonts/carrier_command_red.png', 'src/assets/fonts/carrier_command_red.xml');
  }
}
