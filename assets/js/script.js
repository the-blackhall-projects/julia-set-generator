/**
 * Obtain reference to the canvas object
 */
const canvasFractal = document.getElementById("canvas1");
const canvasMouse = document.getElementById("canvas2");
canvasFractal.willReadFrequently = false;


/**
 * Obtain canvas context
 */
const ctxFractal = canvasFractal.getContext("2d");


const ctxMouse = canvasMouse.getContext("2d");


/**
 * Runs upon resizing canvas.
 */
function onWindowResize() {
	canvasFractal.width = window.innerWidth;
	canvasFractal.height = window.innerHeight;
	canvasMouse.width = window.innerWidth;
	canvasMouse.height = window.innerHeight;
}
window.addEventListener("resize", onWindowResize);

// Perform one initial window resize
onWindowResize();

/**
 * A basic structure to hold mouse position
 */
let mouse = {
	x: canvasFractal.width / 2,
	y: canvasFractal.height / 2,
}

/**
 * Simple class for complex numbers.  The full range
 * of operations for complex numbers is not implemented
 * here.  Apart from the constructur, one method is implemented
 * to create the next element in the reverse iteration.
 * 
 * Methods are also included to calculate the magnitude
 * and square of the magnitude of a complex number.
 */
class Complex {
	constructor(real, imag) {
		this.real = real;
		this.imag = imag;
	}

	/**
	 * Compute square of magnitude of complex num
	 * @param {object} complexNum A complex number 
	 * @returns square of magnitude
	 */
	magSquared(complexNum) {
		return complexNum.real * complexNum.real +
			complexNum.imag * complexNum.imag;
	}

	/**
	 * Compute magnitude of complex number
	 * @param {object} complexNum A complex number 
	 * @returns the magnitude
	 */
	mag(complexNum) {
		return Math.sqrt(this.magSquared(complexNum));
	}

	/**
	 * Finds the next number in the reverse iteration sequence.
	 * @param {object} c The complex constant in the formula
	 * @returns next number in sequence.
	 */
	next(c) {
		const diff = {};

		const result1 = {};

		diff.real = this.real - c.real;
		diff.imag = this.imag - c.imag;

		const magnitude = this.mag(diff);
		
		result1.real = Math.sqrt((magnitude + diff.real)/2);
		result1.imag = diff.imag / Math.abs(diff.imag) * Math.sqrt((magnitude - diff.real)/2);
	
		let plusMinus = Math.random() > 0.5 ? 1 : -1;
	
		return new Complex(plusMinus * result1.real, plusMinus * result1.imag);
	}
}


/**
 * Converts screen coordinates to a complex number
 * @param {number} xPos x screen coordinate
 * @param {number} yPos y screen coordinate
 * @returns complex number
 */
function convertFromScreenCoordinates(xPos, yPos) {

	// For the purposes of scalign the image,
	// calculate the minimum of window height vs width.

	const height = window.innerHeight;
	const width = window.innerWidth;

	const minDimension = (width < height) ? width : height;
	
	const x = (xPos - width / 2) * 4 / minDimension ;	
	const y = - (yPos - height / 2) * 4 / minDimension;

	return new Complex(x, y);;
}

/**
 * return  screen coordinates from complex number
 * @param {Complex} point a complex number
 * @returns screen coordinates object
 */
function convertToScreenCoordinates(complexNum) {

	const height = window.innerHeight;
	const width = window.innerWidth;

	const minDimension = (width < height) ? width : height;

	const result = {};
	result.x = Math.trunc(width / 2 + (complexNum.real) * minDimension / 4);
	result.y = Math.trunc(height / 2 + (- complexNum.imag) * minDimension / 4);

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
	tail() {

		const retVal = this.data[(this.head+this.length) % this.length];

		if (typeof retVal === "undefined") {
			return null;
		} else {
			return retVal;
		}
	}
}


/**	
 * Update mouse pointer when mouse moves.
 */
canvasMouse.addEventListener("mousemove", function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
})


/**
 * A class representing the pointer circle on screen
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
		ctxMouse.clearRect(0, 0, canvasMouse.width, canvasMouse.height); 
		ctxMouse.fillStyle = "red";
		ctxMouse.beginPath();
		ctxMouse.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctxMouse.font = "1.4rem Arial";
		
		const complexNum = convertFromScreenCoordinates(this.x, this.y);
		ctxMouse.fillText("  c = "  +complexNum.real.toFixed(1)+" "+ (complexNum.imag>=0?"+ ":"- ") +Math.abs(complexNum.imag).toFixed(1)+"i" ,this.x,this.y);
	    ctxMouse.fill();
	}
}

/**
 * Update the numberic disply in top right corner.
 */
function numericDisplayDraw() {
	const result = convertFromScreenCoordinates(mouse.x, mouse.y);
	document.getElementById("cvalue").innerHTML = result.real.toFixed(1)+" "+ (result.imag>=0?"+ ":"- ") +Math.abs(result.imag).toFixed(1);
}

const initMouse = convertToScreenCoordinates(new Complex(-0.6, 0.4));

mouse = initMouse;

// document.getElementById("err").innerHTML = pointx.x;



// Having set up functions and classes, now proceed to the main animation code.

// Create pointer representing mouse position on screen
const pointer = new Pointer();

// Set up a buffer representing the number of points on screen
const BUFFLEN = 105750;
const buffer = new Buffer(BUFFLEN);


// curr represents the current complex number in the inverse iteration.
// This is updated each time a point is plotted.
let curr = new Complex(0, 0);

/**
 * The main "game loop". On each cycle update the necessary elements
 */
let cnt = 0;

function animate() {

	// Update screen elements
	numericDisplayDraw();
	
	// Update pointer position
	pointer.update();
	pointer.draw();

	// Get complex number representation of mouse position
	const mouseComplex = convertFromScreenCoordinates(mouse.x, mouse.y);

	curr = new Complex(0.0,0.0000001);

	for (let i = 1; i <= 1000; ++i) {
		curr = curr.next(mouseComplex);
		const point = convertToScreenCoordinates(curr);

		buffer.insert(point);
		ctxFractal.fillStyle = "white";

		// Draw the new dot
		ctxFractal.fillRect(point.x, point.y, 1, 1);
		
		// Obtain oldest point in buffer
		const remove = buffer.tail();
			
		// Remove old point if it exists
		if (!(remove === null)) {
			
			// Paint pixel black 
			ctxFractal.fillStyle = "black";
			ctxFractal.fillRect((remove.x), (remove.y), 1, 1);
		}
	}

	// Display next frame
	requestAnimationFrame(animate);
}

// Start the animation!
animate();