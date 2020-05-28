function hexify(rgb) { 
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) {
         hex = "0" + hex;
    }
    return hex;
}

function rgb2hex(r,g,b) {   
    return `#${hexify(r) + hexify(g) + hexify(b)}`
}

function randomrgb() {
    return rgb2hex(Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255));
}
module.exports = {rgb2hex, randomrgb};