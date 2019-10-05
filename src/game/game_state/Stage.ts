import { js as EasyStar } from "easystarjs";
import { TILE_SIZE } from "../../app";
import {Level} from "../../levels/Level";
import { Coin } from "../Coin";
import { CoinCounter } from "../CoinCounter";
import { EvilPlayer } from "../EvilPlayer";
import { PlayableCoin } from "../PlayableCoin";
import { Player } from "../Player";
import { Game } from "phaser-ce";
import {Timer} from "../Timer";
import {MessageDisplayer} from "../MessageDisplayer";
import {SOUND, SoundManager} from "../../SoundManager";
import {Level3} from "../../levels/Level3";

export abstract class Stage extends Phaser.State {
  static GLITCH_PROBA = 0.02;
  static GLITCH_SECONDS = 0.05;
  static LONG_GLITCH_SECONDS = 0.8;

  static scenarioDurationMessage = 4 * Phaser.Timer.SECOND;
  static stageMessageDuration = Phaser.Timer.SECOND * 2;
  static betweenDuration = Phaser.Timer.SECOND * 0.5;

  protected player: Player;
  protected coins: Coin[] = [];
  protected playableCoin: PlayableCoin;
  protected evilPlayer: EvilPlayer;
  protected isEvilMode: boolean = false;
  protected normalGroup: Phaser.Group;
  protected evilGroup: Phaser.Group;
  protected interfaceGroup: Phaser.Group;
  protected coinCounter: CoinCounter;
  private isGlitching: boolean = false;
  private level: Level;
  private timer: Timer;
  private messageDisplayer: MessageDisplayer;
  private canInteract: boolean;
  private firstStart: boolean;
  private stepCounter: number;
  private shouldSwitchFollow: boolean = false;

  constructor(level: Level) {
    super();
    this.level = level;
    this.firstStart = true;

    const pathfinder = new EasyStar();
    pathfinder.setAcceptableTiles([0]);
    pathfinder.setGrid(this.level.getGrid());
    this.firstStart = true;

    this.playableCoin = new PlayableCoin(this.level.getOriginalPlayableCoinPosition());
    this.evilPlayer = new EvilPlayer(pathfinder, this.playableCoin, this.level.getOriginalPlayerPosition());
    this.playableCoin.setPlayer(this.evilPlayer);
    this.player = new Player(this.level.getOriginalPlayerPosition());
    this.player.setEvilPlayer(this.evilPlayer);
    this.evilPlayer.setNormalPlayer(this.player);
    this.coins = [];
    this.level.getCoinPositions().forEach((pos, i) => {
      this.coins.push(new Coin(i, pos, this.evilPlayer, this.coins));
    });
    this.player.setCoins(this.coins);
    this.evilPlayer.setCoins(this.coins);
    this.coinCounter = new CoinCounter(this.coins, this.playableCoin);
    this.timer = new Timer();
    this.messageDisplayer = new MessageDisplayer();
    this.player.setPlayableCoin(this.playableCoin);
  }

  abstract onGameWin();
  abstract onGameOver();

  public create(game: Phaser.Game) {
    this.canInteract = true;
    SoundManager.create(game);

    /** Create groups */
    this.evilGroup = game.add.group(null, "EVIL");
    this.normalGroup = game.add.group(null, "NORMAL");
    this.interfaceGroup = game.add.group(null, 'INTERFACE');
    game.add.existing(this.normalGroup);
    game.add.existing(this.evilGroup);
    game.add.existing(this.interfaceGroup);

    /** Create items */
    this.level.create(game, this.normalGroup, this.evilGroup);
    this.playableCoin.create(game, this.evilGroup, this.normalGroup);
    this.coins.forEach(coin => {
      coin.create(game, this.normalGroup, this.evilGroup);
    });
    this.coinCounter.create(game, this.interfaceGroup);
    this.evilPlayer.create(game, this.evilGroup);
    this.player.create(game, this.normalGroup);
    this.timer.create(game, this.interfaceGroup);

    game.world.setBounds(0, 0, this.level.getWidth() * TILE_SIZE, this.level.getHeight() * TILE_SIZE);
    this.refreshGroups(game);

    /** Reset positions of all the items */
    this.player.setPosition(this.level.getOriginalPlayerPosition());
    this.evilPlayer.setPosition(this.level.getOriginalPlayerPosition());
    this.playableCoin.setPosition(this.level.getOriginalPlayableCoinPosition());
    this.coins.forEach((coin, i) => {
      coin.reinitialize(this.level.getCoinPositions()[i]);
    });

    let duration = this.level.getRemainingTime();
    this.messageDisplayer.create(game, this.interfaceGroup);
    if (this.firstStart) {
      duration += this.showStageBegin(game) / Phaser.Timer.SECOND;
    }

    this.timer.setRemainingTime(duration); // yeah, game jam

    this.firstStart = false;
  }

  public update(game: Phaser.Game) {
    this.timer.update(game);
    this.evilPlayer.setHunderMode(this.timer.shouldGotoHunderMode());

    this.messageDisplayer.update(game);
    if (this.messageDisplayer.isVisible()) {
      return;
    }
    if (!this.canInteract) {
      return;
    }

    if (this.level.shouldGlitch() && Math.random() < Stage.GLITCH_PROBA && !this.isGlitching) {
      let time = Math.random() * Stage.GLITCH_SECONDS * Phaser.Timer.SECOND;
      if (Math.random() < 0.15) {
        // Long glitch
        time = (Stage.LONG_GLITCH_SECONDS / 2 + Math.random() * Stage.LONG_GLITCH_SECONDS / 2) * Phaser.Timer.SECOND;
      }
      this.glitch(game, true, time);
    }

    if (this.isEvilMode) {
      this.updateEvilMode(game);
    } else {
      this.updateGoodMode(game);
    }
    this.refreshGroups(game);

    this.coinCounter.update();

  }

  updateGoodMode = (game: Game) => {
    if (this.areAllCoinsDead(this.coins)) {
      // WIN CONDITION FOR NORMAL MODE
      this.evilPlayer.setHunderMode(false);
      this.coins.forEach((coin) => {
        coin.ressussitate();
      });

      this.canInteract = false;
      this.playableCoin.stopSound();

      const winMessageDuration = 3 * Phaser.Timer.SECOND;
      const superGlitchDuration = 2 * Phaser.Timer.SECOND;
      this.playableCoin.playIdle();
      this.messageDisplayer.displayBig(game, "You win!", winMessageDuration);

      // Little glitches
      for (let i = 0; i < 20; i++) {
        game.time.events.add(Math.random() * winMessageDuration, () => {
          if (this.isGlitching) { return; }
          const time = Math.random() * 0.3 * Phaser.Timer.SECOND;
          this.glitch(game, true, time);
          this.messageDisplayer.setBigText('You lost!');
          this.game.time.events.add(time, () => {
            this.messageDisplayer.setBigText('You win!');
          })
        }, this);
      }

      // Big glitches
      game.time.events.add(winMessageDuration, () => {
        this.runSuperGlitch(game, superGlitchDuration);
      });

      game.time.events.add(
        winMessageDuration + superGlitchDuration,
        () => {
          this.canInteract = true;
          this.isEvilMode = true;
          this.coins.forEach((coin, i) => {
            coin.reinitialize(this.level.getCoinPositions()[i]);
          });
          this.playableCoin.ressussite();
          this.timer.setRemainingTime(null);
          this.evilPlayer.setPosition(this.level.getOriginalPlayerPosition());
          this.evilPlayer.setVisible(false);
          this.stepCounter = 0;
          this.evilPlayer.playIdle();
        });

      return;
    }
    if (this.timer.isOver()) {
      // LOST CONDITION FOR NORMAL MODE
      this.evilPlayer.setHunderMode(false);
      this.playableCoin.stopSound();
      this.timer.setRemainingTime(this.level.getRemainingTime());
      this.player.playLost();

      const messageLostDuration = 5 * Phaser.Timer.SECOND;
      this.messageDisplayer.display(game, "Argh, I have to improve my\n\nskills to catch these coins\n\nfaster!", messageLostDuration);
      game.time.events.add(messageLostDuration, () => {
        this.game.state.restart(true);
        this.coins.forEach((coin) => {
          coin.ressussitate();
        });
        this.playableCoin.ressussite();

      });

      return;
    }

    const isKilling = this.player.update(game, this.level);
    if (isKilling === 666 && this.level instanceof Level3) {
      this.glitch(game, true, 0.7 * Phaser.Timer.SECOND);
      SoundManager.play(SOUND.SWORD);
      SoundManager.play(SOUND.OTHER_COIN_DEATH);
      game.time.events.add(0.7 * Phaser.Timer.SECOND, () => {
        SoundManager.play(SOUND.SWORD);
        SoundManager.play(SOUND.OTHER_COIN_DEATH);
      }, this);
    }
    this.coins.forEach(coin => coin.update(game, this.level));
  };

  updateEvilMode = (game: Game) => {
    if (this.evilPlayer.getPosition().equals(this.playableCoin.position)) {
      // LOST CONDITION FOR EVIL MODE
      this.playableCoin.stopSound();
      this.canInteract = false;
      this.evilPlayer.playKill();
      this.playableCoin.disappear();

      SoundManager.play(SOUND.SWORD);
      SoundManager.play(SOUND.EVIL_COIN_DEATH);
      game.time.events.add(0.7 * Phaser.Timer.SECOND, () => {
        SoundManager.play(SOUND.SWORD);
        SoundManager.play(SOUND.EVIL_COIN_DEATH);
      }, this);

      const glitchDuration = Phaser.Timer.SECOND;
      const killAnimationTime = 1.3 * Phaser.Timer.SECOND;
      game.time.events.add(killAnimationTime, () => {
        this.evilPlayer.playWin();
        this.runSuperGlitch(game, glitchDuration);
      });
      game.time.events.add(glitchDuration + killAnimationTime, () => {
        this.onGameOver();
        this.timer.setRemainingTime(this.level.getRemainingTime());
        this.evilPlayer.setHunderMode(false);
        this.canInteract = true;
        this.playableCoin.appear();
        this.evilPlayer.setPosition(this.level.getOriginalPlayerPosition());
      });

      return;
    }
    if (this.timer.isOver()) {
      // WIN CONDITION FOR EVIL MODE
      this.evilPlayer.setHunderMode(false);
      this.playableCoin.stopSound();
      this.canInteract = false;
      this.evilPlayer.playIdle();
      this.playableCoin.playIdle();

      if (this.level instanceof Level3)
      {
        this.shouldSwitchFollow = true;
        this.playableCoin.unfollowCamera(game);
        this.evilPlayer.followCamera(game);

        const waitTime = Phaser.Timer.SECOND;
        const glitchDuration = 3 * Phaser.Timer.SECOND;
        const blackTime = Phaser.Timer.SECOND * 2;
        const fallTime = Phaser.Timer.SECOND * 5;

        this.evilPlayer.playFall();

        game.time.events.add(4 * Phaser.Timer.SECOND, () => {
          this.evilPlayer.playFallen();
          this.runSuperGlitch(game, glitchDuration);
        });

        game.time.events.add(waitTime + fallTime + glitchDuration, () => {
          [this.interfaceGroup, this.evilGroup, this.normalGroup].forEach((group) => {
            game.add.tween(group).to({
              alpha: 0
            }, blackTime, Phaser.Easing.Default, true);
          });
        });

        game.time.events.add(waitTime + glitchDuration + fallTime + blackTime * 1.5, () => {
          this.onGameWin();
          this.canInteract = true;
        });
      }

      if (!(this.level instanceof Level3))
      {
        const waitTime = Phaser.Timer.SECOND;
        const glitchDuration = Phaser.Timer.SECOND;
        const blackTime = Phaser.Timer.SECOND * 2;

        game.time.events.add(waitTime, () => {
          this.runSuperGlitch(game, glitchDuration + 4);
        });

        game.time.events.add(waitTime + glitchDuration, () => {
          [this.interfaceGroup, this.evilGroup, this.normalGroup].forEach((group) => {
            game.add.tween(group).to({
              alpha: 0
            }, blackTime, Phaser.Easing.Default, true);
          });
        });

        game.time.events.add(waitTime + glitchDuration + blackTime * 1.5, () => {
          this.onGameWin();
          this.canInteract = true;
        });
      }

      return;
    }

    this.evilPlayer.update(game, this.level);
    const hasMoved = this.playableCoin.update(game, this.level);
    if (hasMoved) {
      this.stepCounter++;
      if (this.stepCounter === 3) {
        this.evilPlayer.setVisible(true);
        this.canInteract = false;
        this.playableCoin.playIdle();
        this.evilPlayer.canMove = false;
        const durationMEssage = this.showStageBegin(game);
        game.time.events.add(durationMEssage, () => {
          this.canInteract = true;
          this.evilPlayer.canMove = true;
          this.timer.setRemainingTime(this.level.getRemainingTime());
        });
      }
    }
    this.coins.forEach(coin => coin.update(game, this.level));
  };

  private refreshGroups(game: Phaser.Game) {
    if (this.isGlitching) {
      return;
    }
    this.switchToAmbiance(this.isEvilMode);

    if (this.shouldSwitchFollow) return;

    if (this.isEvilMode) {
      this.playableCoin.followCamera(game);
    } else {
      this.player.followCamera(game);
    }
  }

  private areAllCoinsDead = (coins: Coin[]) => {
    for (const coin of coins) {
      if (coin.isAlive()) {
        return false;
      }
    }
    if (this.playableCoin.isAlive()) {
      return false;
    }
    return true;
  };

  private glitch(game: Phaser.Game, unglichRandom: boolean = true, time = Math.random() * Stage.GLITCH_SECONDS * Phaser.Timer.SECOND) {
    this.isGlitching = !this.isGlitching;
    this.switchToAmbiance(this.normalGroup.alpha !== 0);

    if (unglichRandom) {
      game.time.events.add(time, () => {
        this.isGlitching = !this.isGlitching;
        this.switchToAmbiance(this.isEvilMode);
      }, this)
    }
  }

  private switchToAmbiance(evilMode: boolean) {
    if (evilMode) {
      this.normalGroup.alpha = 0;
      this.evilGroup.alpha = 1;

      SoundManager.setEvil(true);
      this.coinCounter.setEvil();
    } else {
      this.normalGroup.alpha = 1;
      this.evilGroup.alpha = 0;

      SoundManager.setEvil(false);
      this.coinCounter.setGood();
    }
  }

  private showStageBegin(game: Phaser.Game) {
    this.canInteract = false;
    this.messageDisplayer.display(game, this.level.getNormalMessage(), Stage.scenarioDurationMessage);
    this.game.time.events.add(Stage.scenarioDurationMessage + Stage.betweenDuration, () => {
      this.timer.clignote();
      this.messageDisplayer.displayBig(game, "Stage " + this.level.getStageNumber() + "/3", Stage.stageMessageDuration);
    });
    this.game.time.events.add(Stage.stageMessageDuration + Stage.scenarioDurationMessage + Stage.betweenDuration, () => {
      this.timer.StopClignote();
      this.canInteract = true;
    });
    return (Stage.scenarioDurationMessage + Stage.stageMessageDuration + Stage.betweenDuration);
  }

  private runSuperGlitch(game: Phaser.Game, superGlitchDuration) {
    for (let i = 0; i < 40; i++) {
      game.time.events.add(Math.random() * (superGlitchDuration - 0.1 * Phaser.Timer.SECOND), () => {
        if (this.isGlitching) { return; }
        const time = Math.random() * 0.05 * Phaser.Timer.SECOND;
        this.glitch(game, true, time);
      }, this);
    }
  }
}
