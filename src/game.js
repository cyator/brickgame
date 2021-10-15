import InputHandler from './input';
import Paddle from './paddle';
import Ball from './ball';
import { buildLevel, level1, level2 } from './levels';

const GAMESTATE = {
	PAUSED: 0,
	RUNNING: 1,
	MENU: 2,
	GAMEOVER: 3,
	NEWLEVEL: 4,
};

export default class Game {
	constructor(gameWidth, gameHeight) {
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
		this.gameState = GAMESTATE.MENU;
		this.paddle = new Paddle(this);
		this.ball = new Ball(this);
		this.gameObjects = [];
		this.bricks = [];
		this.lives = 3;
		this.levels = [level1, level2];
		this.currentLevel = 0;
		new InputHandler(this.paddle, this);
	}
	start() {
		if (
			this.gameState !== GAMESTATE.MENU &&
			this.gameState !== GAMESTATE.NEWLEVEL
		)
			return;
		this.bricks = buildLevel(this, this.levels[this.currentLevel]);
		this.ball.reset();
		this.gameObjects = [this.paddle, this.ball];
		this.gameState = GAMESTATE.RUNNING;
	}
	update(deltaTime) {
		if (this.lives === 0) this.gameState = GAMESTATE.GAMEOVER;
		if (
			this.gameState === GAMESTATE.PAUSED ||
			this.gameState === GAMESTATE.MENU ||
			this.gameState === GAMESTATE.GAMEOVER
		)
			return;
		if (this.bricks.length === 0) {
			this.currentLevel++;
			this.gameState = GAMESTATE.NEWLEVEL;
			this.start();
		}
		[...this.gameObjects, ...this.bricks].forEach((object) =>
			object.update(deltaTime)
		);
		this.bricks = this.bricks.filter((brick) => !brick.markedForDeletion);
	}
	draw(ctx) {
		[...this.gameObjects, ...this.bricks].forEach((object) => object.draw(ctx));
		if (this.gameState === GAMESTATE.PAUSED) {
			ctx.rect(0, 0, this.gameWidth, this.gameHeight);
			ctx.fillStyle = 'rgba(0,0,0,0.5)';
			ctx.fill();
			ctx.font = '30px Arial';
			ctx.fillStyle = 'white';
			ctx.textAlign = 'center';
			ctx.fillText('Paused', this.gameWidth / 2, this.gameHeight / 2);
		}
		if (this.gameState === GAMESTATE.MENU) {
			ctx.rect(0, 0, this.gameWidth, this.gameHeight);
			ctx.fillStyle = 'rgba(0,0,0,1)';
			ctx.fill();
			ctx.font = '30px Arial';
			ctx.fillStyle = 'white';
			ctx.textAlign = 'center';
			ctx.fillText(
				'Press SPACEBAR To Start',
				this.gameWidth / 2,
				this.gameHeight / 2
			);
		}
		if (this.gameState === GAMESTATE.GAMEOVER) {
			ctx.rect(0, 0, this.gameWidth, this.gameHeight);
			ctx.fillStyle = 'rgba(0,0,0,1)';
			ctx.fill();
			ctx.font = '30px Arial';
			ctx.fillStyle = 'white';
			ctx.textAlign = 'center';
			ctx.fillText('Game Over', this.gameWidth / 2, this.gameHeight / 2);
		}
	}
	togglePause() {
		this.gameState === GAMESTATE.PAUSED
			? (this.gameState = GAMESTATE.RUNNING)
			: (this.gameState = GAMESTATE.PAUSED);
	}
}
