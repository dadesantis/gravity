/* Objects */
// TODO: Make bodies and array list
// Make option to create a custom body
var body_1;
var body_2;
var bodies = [];
var num_bodies = 2;
var selected_body = 0;

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

	/* Button controls */
	plus_button = createButton('Increment');
	plus_button.position(info.width/2, 100);
	plus_button.mousePressed(function() {
		bodies.push(new Body(random(maxPlanetSize, (canvasWidth-maxPlanetSize)), random(maxPlanetSize, (canvasHeight-maxPlanetSize)), floor(random(50, 500)), floor(random(50, 500))));
		selected_body = bodies.length-1;
		return;
	});
	/* -------------------------------------- */
	minus_button = createButton('Decrement');
	minus_button.position(info.width/2, 125);
	minus_button.mousePressed(function() {
		bodies.pop();
		/**
		 * If there's at least one body, set selected to the last element
		 * Otherwise, set it to the first
		 */ 
		if (bodies.length > 1) {
			selected_body = bodies.length-1;
		} else  {
			selected_body = 0;
			getLiveStats(bodies[selected_body]);
		}
		return;
	});
	/* -------------------------------------- */
	next_selected_button = createButton('Next');
	next_selected_button.position(250, 100);
	next_selected_button.mousePressed(function() {
		if (selected_body < bodies.length-1) {
			selected_body += 1;
		} else {
			selected_body = 0;
		}
	});
	/* -------------------------------------- */
	prev_selected_button = createButton('Prev');
	prev_selected_button.position(250, 125);
	prev_selected_button.mousePressed(function() {
		if (selected_body > 0) {
			selected_body -= 1;
		} else {
			selected_body = bodies.length-1;
		}
	});
	
	world = createCanvas(windowWidth, windowHeight);
	world.background('navy');
	world.style('margin', 'auto');
	world.style('display', 'block');
	
	/**
	 * Scene objects
	 * Draw objects smallest to largest  
	 */
	for (let i = 0; i < num_bodies; i++) {
		bodies.push(new Body(random(maxPlanetSize, (canvasWidth-maxPlanetSize)), random(maxPlanetSize, (canvasHeight-maxPlanetSize)), floor(random(50, 500)), floor(random(50, 500))));
	}
	
	getLiveStats(bodies[selected_body]);
}

function draw() {
	draw_world();
}

function draw_world() {
	world.background('navy');

	if (bodies.length < 1) {
		fill('white');
		textSize(50);
		world.text('No planets to be drawn (⌣́_⌣̀)', width/3, height/2);
	} else if (bodies.length === 1) {
		bodies[0].draw();
		bodies[0].update();
		getLiveStats(bodies[selected_body]);
	} else  {
		let temp = [...bodies];
		temp.sort((a, b) => (a.diameter < b.diameter) ? 1 : -1);
		for (let i = 0; i < temp.length; i++) {
			for (let j = 0; j < temp.length; j++) {
				if (i != j) {
					temp[i].applyForce(calculateAttraction(temp[i], temp[j]));
					temp[i].update();
					temp[i].draw();
				}
			}
		}

		getLiveStats(bodies[selected_body]);
	} 
	
}

/**
 * Show the live stats of a body
 * TODO: Make this more efficient (stop constantly overwriting the text)
 * 		 move the numbers into a seperate graphic and draw independently
 */
function getLiveStats(body) {
	info.background('white');
	info.fill('black');
	info.text('Planet Count: ' + bodies.length, info.width/2 - 8, 25);
	info.textSize(24);
	if ( bodies.length < 1) {
		info.text('No planet to display', 15, 60);
	} else {
		info.fill('black');
		info.text('Info ['+selected_body+']', 80, 25);
		info.text('Diameter: ' + body.diameter, 40, 50);
		info.text('Mass: ' + body.mass, 40, 75);
		info.text('Momentum: ' + body.calcMomentum(), 40, 100);
		show_body(body);
	}
}

function show_body(body) {
	view_scale = .3;
	info.fill(body.color);
	info.ellipse(info.width*.1, info.height/1.5, body.diameter*view_scale);
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