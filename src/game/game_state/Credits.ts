import State = Phaser.State;
import Game = Phaser.Game;
import {GAME_HEIGHT, GAME_WIDTH} from "../../app";

export class Credits extends State {
  private texts: string[];
  private phaserTexts: Phaser.BitmapText[];

  constructor() {
    super();
    this.texts = [];
    this.texts.push('TODO Nom de jeu');
    this.texts.push('');
    this.texts.push('This game was created in honor of');
    this.texts.push('TODO');
    this.texts.push('TODO');
    this.texts.push('');
    this.texts.push('');
    this.texts.push('');
    this.texts.push('');
    this.texts.push('A game designed for the Ludum Dare 45, by');
    this.texts.push('docteurklein + grena + nidup + pierallard + ');
    this.texts.push('pagury + titi + toxinu');
  }

  create(game: Game) {
    this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    this.game.renderer.renderSession.roundPixels = false;
    this.game.width = GAME_WIDTH;
    this.game.height = GAME_HEIGHT;
    this.game.renderer.resize(GAME_WIDTH, GAME_HEIGHT);

    this.camera.unfollow();
    this.camera.setPosition(0, 0);
    const image = game.add.image(0, 0, 'backgroundplayerroom');
    image.scale.set(1.3);
    image.alpha = 0.2;

    this.phaserTexts = [];
    this.texts.forEach((text, i) => {
      const t = game.add.bitmapText(0, i * 40 + 10, "Carrier Command", text, i === 0 ? 40 : 20);
      t.x = this.game.width / 2 - (t.width / 2);
      this.phaserTexts.push(t);
    });
  }
}

