/* Objects */
var body_1;
var body_2;
var bodies = [];

/* Canvas Variables */
var canvas;
var canvasWidth = 1900;
var canvasHeight = 850;
var maxPlanetSize = 200;

function setup() {

	/* Canvas Styling */
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.background('black');
	canvas.style('margin', 'auto');
	canvas.style('display', 'block');
	canvas.style('padding-top', '10px');

	/* Scene Objects */
	body_1 = new Body(random(maxPlanetSize, (canvasWidth-maxPlanetSize)), random(maxPlanetSize, (canvasHeight-maxPlanetSize)), floor(random(150, 400)), floor(random(200, 400)));
	body_2 = new Body(random(maxPlanetSize, (canvasWidth-maxPlanetSize)), random(maxPlanetSize, (canvasHeight-maxPlanetSize)), floor(random(25, 100)), floor(random(50, 100)));

	bodies.push(body_1);
	bodies.push(body_2);

	console.log(bodies);

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

function clicked(body) {
	d = floor(dist(body.xPos, body.yPos, mouseX, mouseY));
	if (d < body.diameter / 2) {
		console.log(body + " was clicked!");
		return true;
	} else {
		console.log("Nothing was clicked!");
		return false;
	}
}

/* Move to */
function mouseClicked() {
	for (let i=0; i < bodies.length; i++) {
		if (clicked(bodies[i])) {
			moveTo(bodies[i]);
		}
	}
}

function moveTo(body) {
	body.xPos, body.yPos = mouseX, mouseY;
}

function onShape() {
	var d;
	for (let i=0; i < bodies.length; i++) {
		d = floor(dist(mouseX, mouseY, bodies[i].pos.x, bodies[i].pos.x));
		if (d < bodies[i].diameter / 2) {
			console.log('GOTCHA');
			show_stats(bodies[i]);
			break;
		} 
	}
}

// function mouseClicked() {
// 	onShape();
// }

function show_stats(body) {
	let copy = body;
	fill('white');
	rect(0, 0, copy.diameter, copy.diameter);

	fill(copy.color);
	copy.canUpdate = false;
	copy.draw();
	copy.update();
}
