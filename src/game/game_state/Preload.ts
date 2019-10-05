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
    this.game.load.audio('music', 'dist/assets/musics/main_theme_chill.mp3');
    this.game.load.audio('evil_music', 'dist/assets/musics/main_theme_rock.mp3');
    this.game.load.audio('evil_coin_death_1', 'dist/assets/sfx/evil_coin_death_1.mp3');
    this.game.load.audio('evil_coin_death_2', 'dist/assets/sfx/evil_coin_death_2.mp3');
    this.game.load.audio('evil_coin_death_3', 'dist/assets/sfx/evil_coin_death_3.mp3');
    this.game.load.audio('evil_coin_death_4', 'dist/assets/sfx/evil_coin_death_4.mp3');
    this.game.load.audio('evil_coin_fear_1', 'dist/assets/sfx/evil_coin_fear_1.mp3');
    this.game.load.audio('evil_coin_fear_2', 'dist/assets/sfx/evil_coin_fear_2.mp3');
    this.game.load.audio('evil_coin_fear_3', 'dist/assets/sfx/evil_coin_fear_3.mp3');
    this.game.load.audio('evil_coin_fear_4', 'dist/assets/sfx/evil_coin_fear_4.mp3');
    this.game.load.audio('evil_coin_fear_5', 'dist/assets/sfx/evil_coin_fear_5.mp3');
    this.game.load.audio('evil_coin_fear_6', 'dist/assets/sfx/evil_coin_fear_6.mp3');
    this.game.load.audio('evil_coin_fear_7', 'dist/assets/sfx/evil_coin_fear_7.mp3');
    this.game.load.audio('evil_coin_push_1', 'dist/assets/sfx/evil_coin_push_1.mp3');
    this.game.load.audio('evil_coin_push_2', 'dist/assets/sfx/evil_coin_push_2.mp3');
    this.game.load.audio('evil_coin_push_3', 'dist/assets/sfx/evil_coin_push_3.mp3');
    this.game.load.audio('other_coin_death_1', 'dist/assets/sfx/other_coin_death_1.mp3');
    this.game.load.audio('other_coin_death_2', 'dist/assets/sfx/other_coin_death_2.mp3');
    this.game.load.audio('other_coin_death_3', 'dist/assets/sfx/other_coin_death_3.mp3');
    this.game.load.audio('other_coin_fear_1', 'dist/assets/sfx/other_coin_fear_1.mp3');
    this.game.load.audio('other_coin_fear_2', 'dist/assets/sfx/other_coin_fear_2.mp3');
    this.game.load.audio('other_coin_fear_3', 'dist/assets/sfx/other_coin_fear_3.mp3');
    this.game.load.audio('other_coin_fear_4', 'dist/assets/sfx/other_coin_fear_4.mp3');
    this.game.load.audio('other_coin_fear_5', 'dist/assets/sfx/other_coin_fear_5.mp3');
    this.game.load.audio('other_coin_fear_6', 'dist/assets/sfx/other_coin_fear_6.mp3');
    this.game.load.audio('other_coin_fear_7', 'dist/assets/sfx/other_coin_fear_7.mp3');
    this.game.load.audio('other_coin_hurt_1', 'dist/assets/sfx/other_coin_hurt_1.mp3');
    this.game.load.audio('other_coin_hurt_2', 'dist/assets/sfx/other_coin_hurt_2.mp3');
    this.game.load.audio('pick_coin_1', 'dist/assets/sfx/pick_coin_1.mp3');
    this.game.load.audio('pick_coin_2', 'dist/assets/sfx/pick_coin_2.mp3');
    this.game.load.audio('pick_coin_3', 'dist/assets/sfx/pick_coin_3.mp3');
    this.game.load.audio('sword_1', 'dist/assets/sfx/sword_1.mp3');
    this.game.load.audio('sword_2', 'dist/assets/sfx/sword_2.mp3');
    this.game.load.audio('sword_3', 'dist/assets/sfx/sword_3.mp3');
    this.game.load.audio('sword_4', 'dist/assets/sfx/sword_4.mp3');
    this.game.load.audio('sword_5', 'dist/assets/sfx/sword_5.mp3');
    this.game.load.audio('sword_6', 'dist/assets/sfx/sword_6.mp3');
  }

  private loadImages() {
    this.game.load.spritesheet('chips', 'dist/assets/images/chips.png', 12, 12);
    this.game.load.spritesheet('basic_ground', 'dist/assets/images/ground/basic.png', 24, 24);
    this.game.load.spritesheet('evil_ground', 'dist/assets/images/ground/evil_basic.png', 24, 24);
    this.game.load.image('bloc_box', 'dist/assets/images/ground/bloc.png');
    this.game.load.image('bloc_box2', 'dist/assets/images/ground/bloc3.png');
    this.game.load.image('evil_bloc_box', 'dist/assets/images/ground/evil_bloc.png');
    this.game.load.image('evil_bloc_box2', 'dist/assets/images/ground/evil_bloc3.png');
    this.game.load.image('bloc_stone', 'dist/assets/images/ground/bloc2.png');
    this.game.load.image('evil_bloc_stone', 'dist/assets/images/ground/evil_bloc2.png');
    this.game.load.image('bush', 'dist/assets/images/ground/bush.png');
    this.game.load.image('bush2', 'dist/assets/images/ground/bush2.png');
    this.game.load.image('evil_bush', 'dist/assets/images/ground/evil_bush.png');
    this.game.load.image('evil_bush2', 'dist/assets/images/ground/evil_bush2.png');
    this.game.load.spritesheet('normal_hero', 'dist/assets/images/gentil_hero_all.png', 60, 30);
    this.game.load.spritesheet('evil_hero', 'dist/assets/images/evil_hero_all.png', 60, 60);
    this.game.load.spritesheet('normal_coin', 'dist/assets/images/gentil_coin.png', 24, 24);
    this.game.load.spritesheet('coin', 'dist/assets/images/coin.png', 24, 24);
    this.game.load.spritesheet('evil_coin', 'dist/assets/images/evil_coin.png', 60, 60);
    this.game.load.image('shadow', 'dist/assets/images/shadow.png');
    this.game.load.image('logo', 'dist/assets/images/logo1.png');
    this.game.load.spritesheet('watch', 'dist/assets/images/watch.png', 24, 29);
  }

  private loadFonts() {
    this.game.load.bitmapFont('Carrier Command', 'dist/assets/fonts/carrier_command.png', 'dist/assets/fonts/carrier_command.xml');
    this.game.load.bitmapFont('Carrier Command Red', 'dist/assets/fonts/carrier_command_red.png', 'dist/assets/fonts/carrier_command_red.xml');
  }
}
