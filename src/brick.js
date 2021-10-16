import { detectCollision } from './detectCollision';

export default class Brick {
	constructor(game, position) {
		this.game = game;
		this.image = document.getElementById('img-brick');
		this.position = position;
		this.width = 78;
		this.height = 24;
		this.markedForDeletion = false;
	}
	update() {
		if (detectCollision(this.game.ball, this)) {
			this.game.ball.speed.y = -this.game.ball.speed.y;
			// this.game.ball.position.y = this.position.y - this.game.ball.size;
			this.markedForDeletion = true;
		}
	}
	draw(ctx) {
		ctx.drawImage(
			this.image,
			this.position.x,
			this.position.y,
			this.width,
			this.height
		);
	}
}
