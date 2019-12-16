class Body {
    
    constructor(diameter, mass) {
        /* Physics-related parameters */
        this.diameter = diameter;
        this.mass = mass;
        this.pos = createVector(random(maxPlanetSize, (canvasWidth-maxPlanetSize)), random(maxPlanetSize, (canvasHeight-maxPlanetSize)));
        this.velocity = createVector();
        this.acceleration = createVector();
        
        /* Style-related */
        this.color = random(CONSTANTS['bodyColors']);
        this.textOffset = JSON.stringify(this.mass).length;
        this.ts = floor(diameter/6);
    }

    /* Apply a given force to a body given its mass
     * A = F / M
    */
    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
    }

    /* Calculate the current momentum of a body
     * P = M * V
     */
    calcMomentum() {
        let p = p5.Vector.mult(this.velocity, this.mass);
        return floor(p.mag());
    }

    /* Draw the initial Body */
    draw() {
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.diameter);
        fill('black');
        textSize(this.ts);
        text('m = ' + this.mass, this.pos.x - this.ts, this.pos.y + this.textOffset);
        text('P =' + this.calcMomentum(), this.pos.x - (this.ts - this.textOffset), this.pos.y + this.ts);
    }

    /* Move the Body in the direction of the forces on it */
    update() {
        this.pos.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(CONSTANTS['MAX_SPEED']);
        this.acceleration.mult(0);
        this.wrap();
    }

    /* Thought you can escape this hell? No */
    wrap() {
        if (this.pos.x > width + this.diameter) {
            this.pos.x = -this.diameter/2;
        } else if (this.pos.x + this.diameter < 0) {
            this.pos.x = width + this.diameter/2;
        } else if (this.pos.y > height + this.diameter) {
            this.pos.y = -this.diameter/2;
        } else if (this.pos.y + this.diameter < 0) {
            this.pos.y = height + this.diameter/2;
        }
    }

}
