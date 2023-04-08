const canvas = document.getElementById("canvas");

// Get context
const ctx = canvas.getContext("2d");

// Have canvas resize
function onWindowResize() {
	let minDimension = (window.innerWidth < window.innerHeight) ? window.innerWidth : window.innerHeight;
	canvas.width = minDimension;
	canvas.height = minDimension;
}
window.addEventListener("resize", onWindowResize);
onWindowResize();

// Define a basic mouse structure
const mouse = {
	x: canvas.height / 2,
	y: canvas.height / 2,
}

// return complex number -2 < z < +2  from screen coordinates. 
function convertFromScreenCoordinates(xPos, yPos) {
	let minDimension = canvas.width;
	let result = {};
	result.x = xPos / minDimension * 4 - 2;	
	result.y = 2 - yPos / minDimension * 4;
	return result;
}

// return  screen coordinates from complex number -2 < z < +2  from
function convertToScreenCoordinates(xC, yC) {
	let minDimension = canvas.width;
	let result = {};
	result.x = (xC + 2) * minDimension / 4;	
	result.y = (2 - yC) * minDimension / 4;
	return result;
}

class Complex {
	constructor(real, imag) {
		this.real = real;
		this.imag = imag;
	}

	next(c) {
		let tmp = {};

		let result = {};

		tmp.real = this.real - c.real;
		tmp.imag = this.imag - c.imag;

		let magnitude = Math.sqrt(tmp.real*tmp.real + tmp.imag*tmp.imag);
		let randPlusMinus = Math.random() > 0.5 ? 1 : -1;
		
		result.real = Math.sqrt((magnitude + tmp.real)/2);
		result.imag = (tmp.imag / Math.abs(tmp.imag)) * Math.sqrt((magnitude - tmp.real)/2);
		return new Complex(randPlusMinus * result.real, randPlusMinus * result.imag);
	}
};

class JuliaSetPoints {
	constructor(c) {
		this.z = new Complex(1,1);
		this.c = c;
		this.points = [];
		let z = this.z;
		for (let i = 0; i < 10000; ++i) {
			z = z.next(c);	
			this.points.push( z );
		}
	}

	draw() {
		//ctx.fillStyle = "white";
		ctx.fillStyle = "rgba(255, 255, 255, 0.1)";

		for (let point of this.points) {
			let re = point.real;
			let imag = point.imag;
			let screenCoords = convertToScreenCoordinates(re, imag);
			ctx.beginPath();
			ctx.arc(screenCoords.x, screenCoords.y, 1, 0, Math.PI * 2);
	    	ctx.fill();
		}
	}
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

function numericDisplayDraw() {
	let result = convertFromScreenCoordinates(mouse.x, mouse.y)
	document.getElementById("cx").innerHTML = result.x.toFixed(1);
	document.getElementById("cy").innerHTML = result.y.toFixed(1);
}

let pointer = new Pointer();


function animate() {
	ctx.clearRect(0,0, canvas.width, canvas.height);
	numericDisplayDraw();
	pointer.update();
	pointer.draw();

	let c = convertFromScreenCoordinates(mouse.x, mouse.y);
	let juliaSet = new JuliaSetPoints(new Complex(c.x, c.y ));
	juliaSet.draw();



	requestAnimationFrame(animate);
}

animate();