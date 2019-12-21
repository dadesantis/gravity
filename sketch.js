/* Objects */
var body_1;
var body_2;
var bodies = [];
var num_bodies = 4;

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

	for (let i = 0; i < num_bodies; i++) {
		bodies.push(new Body(random(maxPlanetSize, (canvasWidth-maxPlanetSize)), random(maxPlanetSize, (canvasHeight-maxPlanetSize)), floor(random(50, 500)), floor(random(50, 500))));
	}

}

function draw() {
	draw_world();
}

function draw_world() {
	world.background('navy');

	for (let i = 0; i < bodies.length; i++) {
		for (let j = 0; j < bodies.length; j++) {
			if (i != j) {
				bodies[i].applyForce(calculateAttraction(bodies[i], bodies[j]));
				bodies[i].update();
				bodies[i].draw();
			}
		}
	}

	getLiveStats(bodies[0]);
}

// Get the button, and when the user clicks on it, execute myFunction
document.getElementById("myBtn").onclick = function() {myFunction()};

/* myFunction toggles between adding and removing the show class, which is used to hide and show the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
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
	view_scale = .3;
	info.textSize(20);
	info.fill(body.color);
	info.ellipse(info.width*.1, info.height/1.75, body.diameter*view_scale);
}

function clicked(body) {
	d = floor(dist(body.pos.x, body.pos.y, mouseX, mouseY));
	if (d < body.diameter / 2) {
		console.debug(body + " was clicked!");
		return true;
	} else {
		return false;
	}
}