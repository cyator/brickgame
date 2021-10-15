import InputHandler from './input';
import Paddle from './paddle';
import Ball from './ball';
import { buildLevel, level1 } from './levels';

const GAMESTATE = {
	PAUSED: 0,
	RUNNING: 1,
	MENU: 2,
	GAMEOVER: 3,
};

export default class Game {
	constructor(gameWidth, gameHeight) {
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
	}
	start() {
		this.gameState = GAMESTATE.RUNNING;
		this.paddle = new Paddle(this);
		this.ball = new Ball(this);
		const bricks = buildLevel(this, level1);
		this.gameObjects = [this.paddle, this.ball, ...bricks];
		new InputHandler(this.paddle, this);
	}
	update(deltaTime) {
		if (this.gameState === GAMESTATE.PAUSED) return;
		this.gameObjects.forEach((object) => object.update(deltaTime));
		this.gameObjects = this.gameObjects.filter(
			(object) => !object.markedForDeletion
		);
	}
	draw(ctx) {
		this.gameObjects.forEach((object) => object.draw(ctx));
		if (this.gameState === GAMESTATE.PAUSED) {
			ctx.rect(0, 0, this.gameWidth, this.gameHeight);
			ctx.fillStyle = 'rgba(0,0,0,0.5)';
			ctx.fill();
			ctx.font = '30px Arial';
			ctx.fillStyle = 'white';
			ctx.textAlign = 'center';
			ctx.fillText('Paused', this.gameWidth / 2, this.gameHeight / 2);
		}
	}
	togglePause() {
		this.gameState === GAMESTATE.PAUSED
			? (this.gameState = GAMESTATE.RUNNING)
			: (this.gameState = GAMESTATE.PAUSED);
	}
}
