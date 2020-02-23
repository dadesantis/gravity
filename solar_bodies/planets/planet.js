class Planet {

    constructor(xPos, yPos, diameter, mass) {
        /* Physics-related parameters */
        this.xPos = xPos;
        this.yPos = yPos;
        this.diameter = diameter;
        this.mass = mass;
        this.pos = createVector(xPos, yPos);
        this.velocity = createVector();
        this.acceleration = createVector();
        
        /* Style-related */
        this.color = random(PLANET_CONSTANTS['bodyColors']);

        /* Control */
        this.canUpdate = true;
    }

    /* Draw the initial Body */
    draw(viewScale) {
        if (viewScale === undefined || viewScale === 0) {
            console.error('View scale not set!');
        } else {
            fill(this.color);
            ellipse(this.pos.x, this.pos.y, this.diameter*viewScale);
        }
    }

}
