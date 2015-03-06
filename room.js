function $(elm)
{
	return document.getElementById(elm);
}

var Room = function(width, height, color) {
	this.canvas = document.createElement("canvas");
	this.ctx = this.canvas.getContext("2d");
	this.canvas.width = width;
	this.canvas.height = height;
	this.color = color;

	this.roomColor = function() {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	this.roomColor();	
}

var Room1 = new Room(300, 300, "#94DBFF");
var Room2 = new Room(300, 300, "#FFAACC");
var currentRoom = Room1;


function goInRoom(firstRoom, secondRoom) {
	$('map').removeChild($('map').lastChild);
	$('map').appendChild(secondRoom.canvas);
}

function initiate(){
	$('map').appendChild(Room1.canvas);
}


// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "img/background.png";


// create sprite
var spriteReady= false; // indicates when it's good to load the image
var spriteImage = new Image();
spriteImage.onload = function() {
	spriteReady = true;
}
spriteImage.src = "img/hero.png";

// creating a sprite object
var sprite = {
	speed: 400, // pixels/sec
	x: 0,
	y: 0
};

// event listeners -- if a user is pressing down a key, is stored, if not, is deleted
var keysDown = {};

addEventListener("keydown", function (key) { keysDown[key.keyCode] = true; }, false);
addEventListener("keyup", function (key) { delete keysDown[key.keyCode]; }, false);

// update objects
var update = function (modifier) { // modifier is time-based number based on 1 -- so sprite will always move the same speed no matter how fast/slow the script is running
	if (87 in keysDown) { // up (38 in keysDown || ) or w
		if (sprite.y - (sprite.speed*modifier) > 0) {
			sprite.y -= sprite.speed * modifier;
		}
	}

	if (83 in keysDown) { // down (40 in keysDown ||) or s
		if (sprite.y + (sprite.speed*modifier) < currentRoom.canvas.height-32) {
			sprite.y += sprite.speed * modifier;
		}
	}

	if (68 in keysDown) { // right (37 in keysDown ||) or d
		if (sprite.x + (sprite.speed*modifier) < currentRoom.canvas.width-32) {
			sprite.x += sprite.speed * modifier;
		} else {
			goInRoom(Room1, Room2);
			currentRoom = Room2;
		}
	}

	if (65 in keysDown) { // left (39 in keysDown ||) or a
		if (sprite.x - (sprite.speed*modifier) > 0) { 
			sprite.x -= sprite.speed * modifier;
		}
	}
}

// render and draw things to canvas
var render = function() {
	if (bgReady) {
		//ctx.drawImage(bgImage, 0, 0);
		//ctx.fillStyle="#94DBFF";
		//ctx.fillRect(0, 0, canvas.width, canvas.height);
		currentRoom.roomColor();
	}

	if (spriteReady) {
		currentRoom.ctx.drawImage(spriteImage, sprite.x, sprite.y); 
	}
}

// main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then; // how many miliseconds have passed since last interval
	update(delta/1000);
	render();

	// this is important...
	then = now;

	// request to run again
	requestAnimationFrame(main);
}

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// start game
var then = Date.now();
main();
