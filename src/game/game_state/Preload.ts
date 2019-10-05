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
    /*this.game.load.audio('music', 'src/assets/musics/main_theme_chill.mp3');
    this.game.load.audio('evil_music', 'src/assets/musics/main_theme_rock.mp3');
    this.game.load.audio('evil_coin_death_1', 'src/assets/sfx/evil_coin_death_1.mp3');
    this.game.load.audio('evil_coin_death_2', 'src/assets/sfx/evil_coin_death_2.mp3');
    this.game.load.audio('evil_coin_death_3', 'src/assets/sfx/evil_coin_death_3.mp3');
    this.game.load.audio('evil_coin_death_4', 'src/assets/sfx/evil_coin_death_4.mp3');
    this.game.load.audio('evil_coin_fear_1', 'src/assets/sfx/evil_coin_fear_1.mp3');
    this.game.load.audio('evil_coin_fear_2', 'src/assets/sfx/evil_coin_fear_2.mp3');
    this.game.load.audio('evil_coin_fear_3', 'src/assets/sfx/evil_coin_fear_3.mp3');
    this.game.load.audio('evil_coin_fear_4', 'src/assets/sfx/evil_coin_fear_4.mp3');
    this.game.load.audio('evil_coin_fear_5', 'src/assets/sfx/evil_coin_fear_5.mp3');
    this.game.load.audio('evil_coin_fear_6', 'src/assets/sfx/evil_coin_fear_6.mp3');
    this.game.load.audio('evil_coin_fear_7', 'src/assets/sfx/evil_coin_fear_7.mp3');
    this.game.load.audio('evil_coin_push_1', 'src/assets/sfx/evil_coin_push_1.mp3');
    this.game.load.audio('evil_coin_push_2', 'src/assets/sfx/evil_coin_push_2.mp3');
    this.game.load.audio('evil_coin_push_3', 'src/assets/sfx/evil_coin_push_3.mp3');
    this.game.load.audio('other_coin_death_1', 'src/assets/sfx/other_coin_death_1.mp3');
    this.game.load.audio('other_coin_death_2', 'src/assets/sfx/other_coin_death_2.mp3');
    this.game.load.audio('other_coin_death_3', 'src/assets/sfx/other_coin_death_3.mp3');
    this.game.load.audio('other_coin_fear_1', 'src/assets/sfx/other_coin_fear_1.mp3');
    this.game.load.audio('other_coin_fear_2', 'src/assets/sfx/other_coin_fear_2.mp3');
    this.game.load.audio('other_coin_fear_3', 'src/assets/sfx/other_coin_fear_3.mp3');
    this.game.load.audio('other_coin_fear_4', 'src/assets/sfx/other_coin_fear_4.mp3');
    this.game.load.audio('other_coin_fear_5', 'src/assets/sfx/other_coin_fear_5.mp3');
    this.game.load.audio('other_coin_fear_6', 'src/assets/sfx/other_coin_fear_6.mp3');
    this.game.load.audio('other_coin_fear_7', 'src/assets/sfx/other_coin_fear_7.mp3');
    this.game.load.audio('other_coin_hurt_1', 'src/assets/sfx/other_coin_hurt_1.mp3');
    this.game.load.audio('other_coin_hurt_2', 'src/assets/sfx/other_coin_hurt_2.mp3');
    this.game.load.audio('pick_coin_1', 'src/assets/sfx/pick_coin_1.mp3');
    this.game.load.audio('pick_coin_2', 'src/assets/sfx/pick_coin_2.mp3');
    this.game.load.audio('pick_coin_3', 'src/assets/sfx/pick_coin_3.mp3');
    this.game.load.audio('sword_1', 'src/assets/sfx/sword_1.mp3');
    this.game.load.audio('sword_2', 'src/assets/sfx/sword_2.mp3');
    this.game.load.audio('sword_3', 'src/assets/sfx/sword_3.mp3');
    this.game.load.audio('sword_4', 'src/assets/sfx/sword_4.mp3');
    this.game.load.audio('sword_5', 'src/assets/sfx/sword_5.mp3');
    this.game.load.audio('sword_6', 'src/assets/sfx/sword_6.mp3');*/
  }

  private loadImages() {
    this.game.load.image('menu_dlc_background', 'src/assets/images/menu_dlc_background.png');
    this.game.load.image('dlc_item', 'src/assets/images/dlc_item.png');
    this.game.load.image('dlc_item_selected', 'src/assets/images/dlc_item_selected.png');
    this.game.load.image('dlc_item_preview', 'src/assets/images/dlc_item_preview.png');
    this.game.load.image('buy_dlc_button', 'src/assets/images/buy_dlc_button.png');

    this.game.load.image('dlc_thumb_1', 'src/assets/images/dlc_thumb_1.png');

    this.game.load.image('playerroombackground', 'src/assets/images/playerroombackground.png');
    this.game.load.spritesheet('normal_hero', 'src/assets/images/knight.png', 16, 16);
    this.game.load.image('dungeonlevel1', 'src/assets/images/dungeonlevel1.png');

    this.game.load.image('tiles', 'src/assets/tilesets/dungeon_sheet.png');
    this.game.load.tilemap('prison', 'src/assets/tilemaps/map1.json', null, Phaser.Tilemap.TILED_JSON);

    this.game.load.spritesheet('chips', 'src/assets/images/chips.png', 12, 12);
    this.game.load.spritesheet('basic_ground', 'src/assets/images/ground/basic.png', 24, 24);
    this.game.load.spritesheet('evil_ground', 'src/assets/images/ground/evil_basic.png', 24, 24);
    this.game.load.image('bloc_box', 'src/assets/images/ground/bloc.png');
    this.game.load.image('bloc_box2', 'src/assets/images/ground/bloc3.png');
    this.game.load.image('evil_bloc_box', 'src/assets/images/ground/evil_bloc.png');
    this.game.load.image('evil_bloc_box2', 'src/assets/images/ground/evil_bloc3.png');
    this.game.load.image('bloc_stone', 'src/assets/images/ground/bloc2.png');
    this.game.load.image('evil_bloc_stone', 'src/assets/images/ground/evil_bloc2.png');
    this.game.load.image('bush', 'src/assets/images/ground/bush.png');
    this.game.load.image('bush2', 'src/assets/images/ground/bush2.png');
    this.game.load.image('evil_bush', 'src/assets/images/ground/evil_bush.png');
    this.game.load.image('evil_bush2', 'src/assets/images/ground/evil_bush2.png');
    this.game.load.spritesheet('evil_hero', 'src/assets/images/evil_hero_all.png', 60, 60);
    this.game.load.spritesheet('normal_coin', 'src/assets/images/gentil_coin.png', 24, 24);
    this.game.load.spritesheet('coin', 'src/assets/images/coin.png', 24, 24);
    this.game.load.spritesheet('evil_coin', 'src/assets/images/evil_coin.png', 60, 60);
    this.game.load.image('shadow', 'src/assets/images/shadow.png');
    this.game.load.spritesheet('watch', 'src/assets/images/watch.png', 24, 29);
    this.game.load.image('logo', 'src/assets/images/logo1.png');
    this.game.load.spritesheet('tshirt', 'src/assets/images/tshirt.jpg', 679, 724);
    this.game.load.spritesheet('lamp-lava', 'src/assets/images/lamp-lava.jpg', 600, 600);
    this.game.load.spritesheet('lamp-lava', 'src/assets/images/lamp-lava.jpg', 600, 600);
    this.game.load.spritesheet('office', 'src/assets/images/office.jpg', 680, 680);
    this.game.load.spritesheet('chair', 'src/assets/images/chair.png', 500, 500);
    this.game.load.spritesheet('basket', 'src/assets/images/basket.jpeg', 283, 178);
    this.game.load.spritesheet('playboy_magazine', 'src/assets/images/playboy_magazine.jpg', 670, 978);
    this.game.load.spritesheet('britney_poster', 'src/assets/images/britney_poster.jpg', 210, 230);
    this.game.load.spritesheet('bed', 'dist/assets/images/bed.jpg', 680, 680);
  }

  private loadFonts() {
    this.game.load.bitmapFont('Carrier Command', 'src/assets/fonts/carrier_command.png', 'src/assets/fonts/carrier_command.xml');
    this.game.load.bitmapFont('Carrier Command Red', 'src/assets/fonts/carrier_command_red.png', 'src/assets/fonts/carrier_command_red.xml');
  }
}
