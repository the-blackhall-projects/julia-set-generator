/**
 * A reference to the canvas object
 */
const canvas = document.getElementById("canvas");

/**
 * Canvas context
 */
const ctx = canvas.getContext("2d");

/**
 * Runs upon resizing canvas.
 */
function onWindowResize() {
	// let minDimension = (window.innerWidth < window.innerHeight) ? window.innerWidth : window.innerHeight;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
window.addEventListener("resize", onWindowResize);

// Perform one window resize
onWindowResize();

/**
 * A basic structure to hold mouse position
 */
const mouse = {
	x: canvas.width / 2,
	y: canvas.height / 2,
}


/**
 * Simple class for complex numbers.  The full range
 * of operations for complex numbers is not implemented
 * here.  Apart from the constructur, one method is implemented
 * to create the next element in the reverse iteration.
 */
class Complex {
	constructor(real, imag) {
		this.real = real;
		this.imag = imag;
	}

	/**
	 * Finds the next number in the reverse iteration sequence.
	 * @param {object} c The complex constant in the formula
	 * @returns next number in sequence.
	 */
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
}

/**
 * Converts screen coordinates to a complex number
 * @param {number} xPos x screen coordinate
 * @param {number} yPos y screen coordinate
 * @returns complex number
 */
function convertFromScreenCoordinates(xPos, yPos) {
	let height = window.innerHeight;
	let width = window.innerWidth;

	let minDimension = (width < height) ? width : height;
	result = {}

	result = new Complex()
	let x = (xPos - width / 2) * 4 / minDimension ;	
	let y = - (yPos - height / 2) * 4 / minDimension;

	retVal = new Complex(x, y);
	
	return retVal;
}

/**
 * return  screen coordinates from complex number
 * @param {Complex} point a complex number
 * @returns screen coordinates object
 */
function convertToScreenCoordinates(point) {

	let height = window.innerHeight;
	let width = window.innerWidth;

	let minDimension = (width < height) ? width : height;

	let result = {};
	result.x = width / 2 + (point.real) * minDimension / 4 ;	
	result.y = height / 2 + (- point.imag) * minDimension / 4 ;

	return result;
}



/**
 * Fixed length circular buffer.  Once full, tail returns the oldest
 * object to be inserted into the buffer.  Before buffer is full
 * tail returns a null quantity.
 */
class Buffer {

	constructor(length) {
		this.head = 0;
		this.length = length;
		this.data = Array.apply(null, Array(length)).map(function () {});
	}
	/**
	 * Inserts object in buffer
	 * @param {object} The object to insert.
	 */
	insert(obj) {
		this.data[this.head] = obj;
		++this.head;
		this.head = this.head % this.length;
	}

	/**
	 * Returns the end object in the buffer.
	 * @returns oldest object in buffer.
	 */

	get tail() {
		let pointer = (this.head+this.length) % this.length;

		let retVal = this.data[pointer];

		if (typeof retVal === "undefined") {
			return null;
		} else {
			return retVal;
		}
	}
}

/**
 * Holds a set of points in the Julia set based on reverse iteration.
 */
class JuliaSetPoints {
	/**
	 * Creates an array of complex numbers that form the sequence.
	 * @param {*} c The complex constant C in the formula
	 */
	constructor(c) {
		this.z = new Complex(1,1);
		this.c = c;
		this.points = [];
		let z = this.z;
		for (let i = 0; i < 30000; ++i) {
			z = z.next(c);	
			this.points.push( z );
		}
	}

	/**
	 * Draw the sequence of points on the screen
	 */
	draw() {
		//ctx.fillStyle = "white";
		ctx.fillStyle = "rgba(255, 255, 255, 0.1)";

		for (let point of this.points) {
			let screenCoords = convertToScreenCoordinates(point);
			ctx.beginPath();
			ctx.arc(screenCoords.x, screenCoords.y, 1, 0, Math.PI * 2);
	    	// ctx.fill();
		}
	}
}

/**	
 * Update mouse pointer when mouse moves.
 */
canvas.addEventListener("mousemove", function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
}) 

/**
 * A class representing the pointer on screen
 */
class Pointer {
	constructor() {
		this.x = mouse.x;
		this.y = mouse.y;
		this.size = 10;
	}

	/**
	 * Update position of pointer based on mouse position
	 */
	update() {
		this.x = mouse.x;
		this.y = mouse.y;
	}
	
	/**
	 * Draw the pointer
	 */
	draw() {
		ctx.fillStyle = "blue";
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
	    ctx.fill();
	}
}

/**
 * Update the numberic disply in top right corner.
 */
function numericDisplayDraw() {
	let result = convertFromScreenCoordinates(mouse.x, mouse.y);
	document.getElementById("cx").innerHTML = result.real.toFixed(1);
	document.getElementById("cy").innerHTML = result.imag.toFixed(1);
}

// Create the pointer

const BUFFLEN = 1000;
let pointer = new Pointer();
let buffer = new Buffer(BUFFLEN);

/**
 * The main "game loop". On each cycle update the necessary elements
 */



let mouseComplex = new Complex(0, 0);
let curr = new Complex(0, 0);

let oldMouse = convertToScreenCoordinates(mouseComplex);

// let currNum = new Complex(curr.x, curr.y);


function animate() {
	// ctx.clearRect(0,0, canvas.width, canvas.height);

	// Update screen elements
	numericDisplayDraw();
	pointer.update();
	// pointer.draw();

	let point = {};

	if (mouse.x != oldMouse.x || mouse.y != oldMouse.y) { 
		
		
		oldMouse.x = mouse.x;
		oldMouse.y = mouse.y;

		
		buffer.insert(oldMouse.x, oldMouse.x);
		// Turn transparency on
		
		ctx.globalAlpha = 1;
		ctx.fillStyle = "rgba(255, 255, 255, .3)";
		ctx.beginPath();
		ctx.arc(oldMouse.x, oldMouse.y, 10, 1, Math.PI * 2);
		ctx.fill();
		
		// curr = convertFromScreenCoordinates(0, 0);

		curr = new Complex(0,0);


	} else {

		mouseComplex = convertFromScreenCoordinates(oldMouse.x, oldMouse.y);



		ctx.globalAlpha = 1;
		ctx.fillStyle = "rgba(255, 255, 255, .3)";
		for (let i = 1; i <= 100; ++i) {
			curr = curr.next(mouseComplex);
			let point = convertToScreenCoordinates(curr);
			buffer.insert(point.x, point.y);
			ctx.beginPath();
			ctx.arc(point.x, point.y, 10, .01, Math.PI * 2);
			ctx.fill();

		}
		
	
	}

	// Get the complex constant based on mouse position.
	//let c = convertFromScreenCoordinates(mouse.x, mouse.y);
	
	// Create a set of points using inverse iteration
	//let juliaSet = new JuliaSetPoints(c);
	
	// Draw the points
	//juliaSet.draw();
	
	// Request new frame.
	requestAnimationFrame(animate);
}

// Start the animation
animate();