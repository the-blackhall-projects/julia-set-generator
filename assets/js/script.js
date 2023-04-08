const canvas = document.getElementById("canvas");

// Have canvas fill screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Get context
const ctx = canvas.getContext("2d");

// Define a basic mouse structure
const mouse = {
	x: undefined,
	y: undefined,
}

canvas.addEventListener("mousemove", function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
}) 

class Pointer {
	constructor() {
		this.x = mouse.x;
		this.y = mouse.y;

	
		this.size = 10;
	}

	update() {
		this.x = mouse.x;
		this.y = mouse.y;
		
	}
	
	draw() {
		ctx.fillStyle = "blue";
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
	}
}

let pointer = new Pointer();


function animate() {
	ctx.clearRect(0,0, canvas.width, canvas.height);

	pointer.update();
	pointer.draw();



	requestAnimationFrame(animate);
}

animate();