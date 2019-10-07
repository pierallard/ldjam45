export enum SOUND {
  COCAMACHINE = 'cocamachine',
  KEYBOARD = 'keyboard',
  PEE = 'pee',
  WALK = 'walk',
  WATER = 'water',
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
  private static sounds: Sound[];
  private static music: Phaser.Sound;

  static create(game: Phaser.Game) {
      this.sounds = [];

      this.sounds.push(new Sound(game, SOUND.COCAMACHINE, 1));
      this.sounds.push(new Sound(game, SOUND.KEYBOARD, 2));
      this.sounds.push(new Sound(game, SOUND.PEE, 3));
      this.sounds.push(new Sound(game, SOUND.WALK, 4));
      this.sounds.push(new Sound(game, SOUND.WATER, 5));
  }

  static play(type: SOUND, volume = 1) {
    const ss = this.sounds.filter((sound) => {
      return sound.type === type;
    });
    const sound = ss[Math.floor(Math.random() * ss.length)];
    sound.play(volume);
  }

  static playMusic(game: Phaser.Game) {
    this.music = game.add.audio('backgroundsound');
    this.music.allowMultiple = true;
    this.music.play();
    this.music.loop = true;
    this.music.volume = 0;
  }

  static pumpUpTheBass() {
    this.music.volume = 0.5;
  }
}
