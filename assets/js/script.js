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
	x: undefined,
	y: undefined,
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
		
		let result = convertFromScreenCoordinates(this.x, this.y);
		console.log("complex:", result.x, result.y );
		let result2 = convertToScreenCoordinates(result.x, result.y);
		console.log(canvas.width, canvas.height);
		console.log("normal:",result2.x, result2.y);
	}
}

let pointer = new Pointer();


function animate() {
	ctx.clearRect(0,0, canvas.width, canvas.height);

	let result = convertFromScreenCoordinates(mouse.x, mouse.y)
	
	document.getElementById("xpos").innerHTML = mouse.x;
	document.getElementById("ypos").innerHTML = mouse.y;
	document.getElementById("cx").innerHTML = result.x.toFixed(3);
	document.getElementById("cy").innerHTML = result.y.toFixed(3);

	let result2 = convertToScreenCoordinates(result.x, result.y)


	document.getElementById("xpos2").innerHTML = result2.x.toFixed(3);
	document.getElementById("ypos2").innerHTML = result2.y.toFixed(3);
	
	
	pointer.update();
	pointer.draw();
	requestAnimationFrame(animate);
}

animate();