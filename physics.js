var CONSTANTS = {
    'MAX_SPEED': 20,
    'MAX_GRAVITY': 200,
    'bodyColors': ['brown', 'green', 'magenta',
                    'black', 'red', 'orange']
}

var G = 0;

function calculateAttraction(body_a, body_b) {
    let force = p5.Vector.sub(body_a.pos, body_b.pos);
    let dis = force.mag();
    dis = constrain(dis, body_a.diameter, CONSTANTS['MAX_GRAVITY']);
    force.normalize();

    let F = G * ((body_a.mass * body_b.mass) / Math.pow(dis, 2));
    force.mult(-F);

    return force;
}
