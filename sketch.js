/* Objects */
var body_1;
var body_2;

/* Canvas Variables */
var canvas;
var canvasWidth = 1900;
var canvasHeight = 850;
var maxPlanetSize = 200;

function setup() {

	/* Canvas Styling */
	canvas = createCanvas(1900, 850);
	canvas.background('navy');
	canvas.style('margin', 'auto');
	canvas.style('display', 'block');
	canvas.style('padding-top', '10px');

	/* Scene Objects */
	body_1 = new Body(floor(random(150, 250)), floor(random(150, 250)));
	body_2 = new Body(floor(random(50, 100)), floor(random(50, 100)));

	// console.log(body_1);
	// console.log(body_2);
	// console.log(calculateAttraction(body_1, body_2));

}

function draw() {

	canvas.background('navy');

	body_1.applyForce(calculateAttraction(body_1, body_2));
	body_2.applyForce(calculateAttraction(body_2, body_1));

	body_1.draw();
	body_1.update();
	body_2.draw();
	body_2.update();

}
