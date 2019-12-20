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

	/* Create world and info canvases*/
	info = createGraphics(windowWidth*.3, windowHeight*.3);
	info.background('white');
	info.style('margin', 'auto');
	info.style('display', 'block');
	
	world = createCanvas(windowWidth, windowHeight);
	world.background('navy');
	world.style('margin', 'auto');
	world.style('display', 'block');
	

	/* Scene Objects */
	body_1 = new Body(random(maxPlanetSize, (canvasWidth-maxPlanetSize)), random(maxPlanetSize, (canvasHeight-maxPlanetSize)), floor(random(150, 400)), floor(random(200, 400)));
	body_2 = new Body(random(maxPlanetSize, (canvasWidth-maxPlanetSize)), random(maxPlanetSize, (canvasHeight-maxPlanetSize)), floor(random(25, 100)), floor(random(50, 100)));

	bodies.push(body_1);
	bodies.push(body_2);

	show_stats(bodies[0]);

}

function draw() {
	info.background('white');
	world.background('navy');

	body_1.applyForce(calculateAttraction(body_1, body_2));
	body_2.applyForce(calculateAttraction(body_2, body_1));

	body_1.draw();
	body_1.update();
	body_2.draw();
	body_2.update();
}

draw_info() {
	info.background('white');
	show_stats(bodies[0]);
}

function clicked(body) {
	d = floor(dist(body.pos.x, body.pos.y, mouseX, mouseY));
	if (d < body.diameter / 2) {
		console.log(body + " was clicked!");
		return true;
	} else {
		return false;
	}
}

function show_stats(body) {
	let copy = body;
	fill('white');
	rect(0, 0, copy.diameter, copy.diameter);

	fill(copy.color);
	copy.canUpdate = false;
	copy.draw();
}
