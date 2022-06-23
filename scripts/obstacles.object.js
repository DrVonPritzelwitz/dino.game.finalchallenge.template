export class Obstacles {
	stage;
	ctx;
	ySpeed = 5;
	obstacles = [];
	player;
	gameOver = false;
	intervalFrameCounter = 0;

	constructor(gameStage, player) {
		this.stage = gameStage;
		this.ctx = gameStage.context;
		this.player = player;
		this.obstacles.push({ x: this.ctx.canvas.width, y: this.ctx.canvas.height - 20, w: 20, h: 20 });
	}

	refresh() {

		if (this.everyinterval(5)) {
			let chance = this.randomInt(1, 10);
			let minIntervalsAppart = this.stage.frames > this.intervalFrameCounter + 15;

			if(chance === 1 && minIntervalsAppart) {
				this.intervalFrameCounter = this.stage.frames;
				this.obstacles.push({ x: this.ctx.canvas.width, y: this.ctx.canvas.height - 20, w: 20, h: 20 });
			}
		}

		this.obstacles.forEach((o, i, l) => {
			if(o.x < -20){
				l.splice(i, 1);
				o.x = 450;
			} else {
				o.x -= this.ySpeed;
				this.ctx.fillStyle = 'red';
				this.ctx.fillRect(o.x, o.y, o.w, o.h);
			}
			this.checkCollision(o);
		});

	}

	checkCollision(obstacle) {
		let pt = this.player.y
		let pb = this.player.y + this.player.height;
		let pl = this.player.x;
		let pr = this.player.x + this.player.width;

		let ot = obstacle.y;
		let ob = obstacle.y + obstacle.h;
		let ol = obstacle.x;
		let or = obstacle.x + obstacle.w;

		if(
			// Fix de collission check!
			// VERVANG == MET >= OF <=  ("is groter dan of gelijk aan" OF "is kleiner dan of gelijk aan")
			((pb == ot && pb == ob)	|| (pt == ot && pt == ob))
			&&
			// VERVANG == MET >= OF <=  ("is groter dan of gelijk aan" OF "is kleiner dan of gelijk aan")
			((pl == ol && pl == or)	|| (pr == ol && pr == or))
		) {
			this.gameOver = true;
		}
	}

	everyinterval(n) {
		return (this.stage.frames / n) % 1 == 0 ? true : false;
	}

	randomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min)
	}
}