export class Player {
	context;
	color;
	width;
	height;
	x;
	y;
	speedX = 0;
	speedY = 0;
	gravity = 0;

	constructor(width, height, color, x, y, context) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.width = width;
		this.height = height;
		this.context = context;
	}

	refresh() {
		this.x += this.speedX;
		this.y += this.speedY;
		this.context.fillStyle = this.color;
		this.context.fillRect(this.x, this.y, this.width, this.height);
		this.calculateGravity();
	}

	calculateGravity() {
		let bottom = this.context.canvas.height - this.height;

		if(this.y < bottom) {
			this.speedY += 2;
		} else {
			this.speedY = 0;
			this.y = bottom;
		}
	}

	processInput(input) {
		let bottom = this.context.canvas.height - this.height;

		if(input && input['Space'] && this.y == bottom) {
			this.speedY = -20;
		}
	}
}
