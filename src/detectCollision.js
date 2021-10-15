export const detectCollision = (ball, gameObject) => {
	//ball
	let bottomOfBall = ball.position.y + ball.size;
	let topOfBall = ball.position.y;
	//object
	let topOfGameObject = gameObject.position.y;
	let bottomOfGameObject = gameObject.position.y + gameObject.height;
	let leftSideOfGameObject = gameObject.position.x;
	let rightSideOfGameObject = gameObject.position.x + gameObject.width;

	if (
		bottomOfBall >= topOfGameObject &&
		topOfBall <= bottomOfGameObject &&
		ball.position.x >= leftSideOfGameObject &&
		ball.position.x + ball.size <= rightSideOfGameObject
	) {
		return true;
	} else {
		return false;
	}
};
