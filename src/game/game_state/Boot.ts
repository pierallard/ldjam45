import {SCALE} from "../../app";

export default class Boot extends Phaser.State {
    public create () {
        this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        this.game.scale.setUserScale(SCALE, SCALE);

        this.game.renderer.renderSession.roundPixels = true;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

        this.game.state.start('Preload');
    }
}
