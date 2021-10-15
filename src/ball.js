import { detectCollision } from './detectCollision';

export default class Ball {
	constructor(game) {
		this.game = game;
		this.gameWidth = game.gameWidth;
		this.gameHeight = game.gameHeight;
		this.image = document.getElementById('img-ball');
		this.position = {
			x: 10,
			y: 10,
		};
		this.speed = {
			x: 4,
			y: 2,
		};
		this.size = 16;
	}
	draw(ctx) {
		ctx.drawImage(
			this.image,
			this.position.x,
			this.position.y,
			this.size,
			this.size
		);
	}
	update(deltaTime) {
		this.position.x += this.speed.x;
		this.position.y += this.speed.y;
		//collision x axis
		if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
			this.speed.x = -this.speed.x;
		}
		//collision y axis
		if (this.position.y + this.size > this.gameHeight || this.position.y < 0) {
			this.speed.y = -this.speed.y;
		}
		//paddle collision
		if (detectCollision(this, this.game.paddle)) {
			this.speed.y = -this.speed.y;
			this.position.y = this.game.paddle.position.y - this.size;
		}
	}
}
