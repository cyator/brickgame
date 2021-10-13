export default class InputHandler {
	constructor(paddle) {
		document.addEventListener('keydown', (event) => {
			switch (event.key) {
				case 'ArrowRight':
					paddle.moveRight();
					break;
				case 'ArrowLeft':
					paddle.moveLeft();
					break;
				default:
					break;
			}
		});
		document.addEventListener('keyup', (event) => {
			switch (event.key) {
				case 'ArrowRight':
					if (paddle.speed > 0) paddle.stop();
					break;
				case 'ArrowLeft':
					if (paddle.speed < 0) paddle.stop();
					break;
				default:
					break;
			}
		});
	}
}
