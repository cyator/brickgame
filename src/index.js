import Paddle from './paddle';

let canvas = document.getElementById('gamescreen');
if (canvas.getContext) {
	/** @type {CanvasRenderingContext2D} */
	let ctx = canvas.getContext('2d');

	const GAME_WIDTH = 800;
	const GAME_HEIGHT = 600;

	const paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
	paddle.draw(ctx);
}
