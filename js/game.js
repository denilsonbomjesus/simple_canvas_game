// Criação do canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Imagem de fundo
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Imagem do herói
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Imagem do monstro
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Objetos do jogo
var hero = {
	speed: 256 // movimento em pixels por segundo
};
var monster = {};
var monstersCaught = 0;

// Controle das teclas do teclado
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.key] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.key];
}, false);

// Reiniciar o jogo quando o jogador captura um monstro
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Posicionar o monstro aleatoriamente na tela
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Atualizar os objetos do jogo
var update = function (modifier) {
	if ("ArrowUp" in keysDown) { // Jogador pressionando a tecla para cima
		hero.y -= hero.speed * modifier;
	}
	if ("ArrowDown" in keysDown) { // Jogador pressionando a tecla para baixo
		hero.y += hero.speed * modifier;
	}
	if ("ArrowLeft" in keysDown) { // Jogador pressionando a tecla para a esquerda
		hero.x -= hero.speed * modifier;
	}
	if ("ArrowRight" in keysDown) { // Jogador pressionando a tecla para a direita
		hero.x += hero.speed * modifier;
	}

	// Estão se tocando?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
};

// Desenhar tudo na tela
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// Pontuação
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins capturados: " + monstersCaught, 32, 32);
};

// Loop principal do jogo
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Solicitar que o loop se repita o mais rápido possível
	requestAnimationFrame(main);
};

// Suporte cross-browser para requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame;

// Vamos jogar este jogo!
var then = Date.now();
reset();
main();
