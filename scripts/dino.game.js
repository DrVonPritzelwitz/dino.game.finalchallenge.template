import { Obstacles } from "./obstacles.object.js";
import { Player } from "./player.object.js";
import { TextArea } from "./text-area.object.js";

var scoreText;
var centerText;
var player;
var obstacles;


document.getElementById('start-btn').addEventListener('click', () => {
	gameStage.start();
	scoreText = new TextArea(16,'Consolas','white', 10, 20, gameStage.context);
	centerText = new TextArea(24,'Consolas','white', 280, 125, gameStage.context);
	player = new Player(20, 50, 'green', gameStage.canvas.width / 4, 400, gameStage.context);
	obstacles =  new Obstacles(gameStage, player);
});

var gameStage = {
	canvas: document.createElement("canvas"),
	frames: 0,

	start: function () {
		if (this.interval) { clearInterval(this.interval); }
		this.frames = 0;

		this.canvas.width = 660;
		this.canvas.height = 250;
		this.canvas.style.backgroundColor = 'black';

		gameContainer.innerHTML = '';
		gameContainer.appendChild(this.canvas);

		this.context = this.canvas.getContext("2d");
		this.interval = setInterval(refreshStage, 20);

		window.addEventListener('keydown', function (e) {
            e.preventDefault();
            gameStage.input = (gameStage.input || []);
            gameStage.input[e.code] = (e.type == "keydown");
        });
        window.addEventListener('keyup', function (e) {
            gameStage.input[e.code] = (e.type == "keydown");
        });
	},

	clear: function () {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},

	stop: function () {
		clearInterval(this.interval);
	}
}

function refreshStage() {
	gameStage.clear();
	gameStage.frames += 1;
	scoreText.refresh(gameStage.frames);

	player.processInput(gameStage.input);
	player.refresh();
	obstacles.refresh();
	if(obstacles.gameOver){
		centerText.refresh('Game Over');
		gameStage.stop();
	}
}
