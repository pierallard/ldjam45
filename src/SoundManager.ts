export enum SOUND {
  EVIL_COIN_DEATH = 'evil_coin_death',
  EVIL_COIN_FEAR = 'evil_coin_fear',
  EVIL_COIN_PUSH = 'evil_coin_push',
  OTHER_COIN_DEATH = 'other_coin_death',
  OTHER_COIN_FEAR = 'other_coin_fear',
  OTHER_COIN_HURT = 'other_coin_hurt',
  PICK_COIN = 'pick_coin',
  SWORD = 'sword'
}

class Sound {
  constructor(game: Phaser.Game, type: SOUND, id: number) {
    this.type = type;
    this.id = id;
    this.audio = game.add.audio(type + '_' + id);
    this.audio.allowMultiple = true;
  }

  public id: number;
  public type: SOUND;
  private audio: Phaser.Sound;
  public originalVolume = 1;

  play(volume = 1) {
    this.originalVolume = volume;

    console.log('play ' + this.type + ' - ' + this.id + ' (' + this.audio.volume + ')');
    if (this.audio.isPlaying) {
      this.audio.restart(this.audio.currentMarker, 0);
    } else {
      this.audio.play();
    }
  }

  setMuted(muted: boolean) {
    this.audio.volume = muted ? 0 : this.originalVolume;
  }
}

export class SoundManager {
  private static music: Phaser.Sound;
  private static evilMusic: Phaser.Sound;
  private static sounds: Sound[];

  static create(game: Phaser.Game) {
    if (!this.music) {
      this.music = game.add.audio('music');
      this.music.loop = true;
      this.evilMusic = game.add.audio('evil_music');
      this.evilMusic.volume = 0;
      this.evilMusic.loop = true;
      this.music.play();
      this.evilMusic.play();

      this.sounds = [];

      this.sounds.push(new Sound(game, SOUND.EVIL_COIN_DEATH, 1));
      this.sounds.push(new Sound(game, SOUND.EVIL_COIN_DEATH, 2));
      this.sounds.push(new Sound(game, SOUND.EVIL_COIN_DEATH, 3));
      this.sounds.push(new Sound(game, SOUND.EVIL_COIN_DEATH, 4));

      this.sounds.push(new Sound(game, SOUND.EVIL_COIN_FEAR, 1));
      this.sounds.push(new Sound(game, SOUND.EVIL_COIN_FEAR, 2));
      this.sounds.push(new Sound(game, SOUND.EVIL_COIN_FEAR, 3));
      this.sounds.push(new Sound(game, SOUND.EVIL_COIN_FEAR, 4));
      this.sounds.push(new Sound(game, SOUND.EVIL_COIN_FEAR, 5));
      this.sounds.push(new Sound(game, SOUND.EVIL_COIN_FEAR, 6));
      // this.sounds.push(new Sound(game, SOUND.EVIL_COIN_FEAR, 7)); // Used for run

      this.sounds.push(new Sound(game, SOUND.EVIL_COIN_PUSH, 1));
      this.sounds.push(new Sound(game, SOUND.EVIL_COIN_PUSH, 2));
      this.sounds.push(new Sound(game, SOUND.EVIL_COIN_PUSH, 3));

      this.sounds.push(new Sound(game, SOUND.OTHER_COIN_DEATH, 1));
      this.sounds.push(new Sound(game, SOUND.OTHER_COIN_DEATH, 2));
      this.sounds.push(new Sound(game, SOUND.OTHER_COIN_DEATH, 3));

      this.sounds.push(new Sound(game, SOUND.OTHER_COIN_FEAR, 1));
      this.sounds.push(new Sound(game, SOUND.OTHER_COIN_FEAR, 2));
      this.sounds.push(new Sound(game, SOUND.OTHER_COIN_FEAR, 3));
      this.sounds.push(new Sound(game, SOUND.OTHER_COIN_FEAR, 4));
      this.sounds.push(new Sound(game, SOUND.OTHER_COIN_FEAR, 5));
      this.sounds.push(new Sound(game, SOUND.OTHER_COIN_FEAR, 6));
      this.sounds.push(new Sound(game, SOUND.OTHER_COIN_FEAR, 7));

      this.sounds.push(new Sound(game, SOUND.OTHER_COIN_HURT, 1));
      this.sounds.push(new Sound(game, SOUND.OTHER_COIN_HURT, 2));

      this.sounds.push(new Sound(game, SOUND.PICK_COIN, 1));
      this.sounds.push(new Sound(game, SOUND.PICK_COIN, 2));
      // this.sounds.push(new Sound(game, SOUND.PICK_COIN, 3)); // Son fail

      this.sounds.push(new Sound(game, SOUND.SWORD, 1));
      this.sounds.push(new Sound(game, SOUND.SWORD, 2));
      this.sounds.push(new Sound(game, SOUND.SWORD, 3));
      this.sounds.push(new Sound(game, SOUND.SWORD, 4));
      this.sounds.push(new Sound(game, SOUND.SWORD, 5));
      this.sounds.push(new Sound(game, SOUND.SWORD, 6));
    }
  }

  static play(type: SOUND, volume = 1) {
    const ss = this.sounds.filter((sound) => {
      return sound.type === type;
    });
    const sound = ss[Math.floor(Math.random() * ss.length)];
    sound.play(volume);
  }

  static setEvil(b: boolean) {
    const evilSoundTypes = [SOUND.EVIL_COIN_DEATH, SOUND.EVIL_COIN_FEAR, SOUND.EVIL_COIN_PUSH, SOUND.OTHER_COIN_DEATH,
      SOUND.OTHER_COIN_FEAR, SOUND.OTHER_COIN_HURT, SOUND.SWORD].map((x) => { return x + ''; });

    if (b) {
      this.evilMusic.volume = 1;
      this.music.volume = 0;

      this.sounds.forEach((sound) => {
        sound.setMuted(evilSoundTypes.indexOf(sound.type + '') < 0);
      })
    } else {
      this.evilMusic.volume = 0;
      this.music.volume = 1;

      this.sounds.forEach((sound) => {
        sound.setMuted(evilSoundTypes.indexOf(sound.type + '') >= 0);
      })
    }
  }
}