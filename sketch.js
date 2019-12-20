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
	info = createGraphics(windowWidth, windowHeight*.3);
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
}

function draw() {
	draw_world();
}

function draw_world() {
	world.background('navy');

	body_1.applyForce(calculateAttraction(body_1, body_2));
	body_2.applyForce(calculateAttraction(body_2, body_1));

	body_1.draw();
	body_1.update();
	body_2.draw();
	body_2.update();

	getLiveStats(bodies[0]);
}

/**
 * Show the live stats of a body
 * TODO: Make this more efficient (stop constantly overwriting the text)
 * 		 move the numbers into a seperate graphic and draw independently
 */
function getLiveStats(body) {
	info.background('white');
	info.fill('black');
	info.text('Info', 80, 20);
	info.text('Diameter: ' + body.diameter, 40, 40);
	info.text('Mass: ' + body.mass, 40, 60);
	info.text('Momentum: ' + body.calcMomentum(), 40, 80);
	show_body(body);
}

function show_body(body) {
	view_scale = .50;
	info.textSize(20);
	info.fill(body.color);
	info.ellipse(info.width*.065, info.height/1.75, body.diameter*view_scale);
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