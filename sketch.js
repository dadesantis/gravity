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
	canvas.background('black');
	canvas.style('margin', 'auto');
	canvas.style('display', 'block');
	canvas.style('padding-top', '10px');

	/* Scene Objects */
	body_1 = new Body(random(maxPlanetSize, (canvasWidth-maxPlanetSize)), random(maxPlanetSize, (canvasHeight-maxPlanetSize)), floor(random(150, 400)), floor(random(200, 400)));
	body_2 = new Body(random(maxPlanetSize, (canvasWidth-maxPlanetSize)), random(maxPlanetSize, (canvasHeight-maxPlanetSize)), floor(random(25, 100)), floor(random(50, 100)));

}

function draw() {

	canvas.background('black');

	body_1.applyForce(calculateAttraction(body_1, body_2));
	body_2.applyForce(calculateAttraction(body_2, body_1));

	body_1.draw();
	body_1.update();
	body_2.draw();
	body_2.update();

}
