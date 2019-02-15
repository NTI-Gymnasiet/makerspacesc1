let defaults = {};
let current = {}

let t = 0;
$(document).ready(function () {
    let layers = [
        "layer_1",
        "layer_2",
        "layer_3"
    ];
/*
    for(let layer in layers) {
        defaults["landscape-" + layer] = [$("#landscape-" + layer).x(), $("#landscape-" + layer).y()];
        defaults["portrait-" + layer] = [$("#portrait-" + layer).x(), $("#portrait-" + layer).y()];
    }*/
    for(let i = 0; i < layers.length; i++) {
        let layer = layers[i];

        current["landscape-" + layer] = [(getRandomInt(200, 500) * Math.sign(Math.random()-0.5)), (getRandomInt(200, 500) * Math.sign(Math.random()-0.5)), -99, getRandomInt(0, 360)];
        current["portrait-" + layer] = [(getRandomInt(200, 500) * Math.sign(Math.random()-0.5)), (getRandomInt(200, 500) * Math.sign(Math.random()-0.5)), -99, getRandomInt(0, 360)];
    }
    window.setInterval(function () {
        for(let i = 0; i < layers.length; i++) {
            let layer = layers[i];

            current["landscape-" + layer] = [(getRandomInt(200, 500) * Math.sign(Math.random()-0.5)), (getRandomInt(200, 500) * Math.sign(Math.random()-0.5)), -99, getRandomInt(0, 360)];
            current["portrait-" + layer] = [(getRandomInt(200, 500) * Math.sign(Math.random()-0.5)), (getRandomInt(200, 500) * Math.sign(Math.random()-0.5)), -99, getRandomInt(0, 360)];
        }
    }, 10000);

    window.setInterval(function () {
        t += 0.5;
        for(let i = 0; i < layers.length; i++) {
            let layer = layers[i];
            if(current["landscape-" + layer][2] === -99) {
                current["landscape-" + layer][2] = 1;
                current["portrait-" + layer][2] = 1;
            }
            else {
                current["landscape-" + layer][2] += Math.sin(t + current["landscape-" + layer][3])/7;
                current["portrait-" + layer][2] += Math.sin(t + current["portrait-" + layer][3])/7;
            }
            $("#landscape-" + layer).css("transform", "translate(" + current["landscape-" + layer][0] + "px, " + current["landscape-" + layer][1] + "px) scale(" + current["landscape-" + layer][2] + ", " + current["landscape-" + layer][2] + ")");
            $("#portrait-" + layer).css("transform", "translate(" + current["portrait-" + layer][0] + "px, " + current["portrait-" + layer][1] + "px) scale(" + current["portrait-" + layer][2] + ", " + current["portrait-" + layer][2] + ")");
        }
    }, 200);
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}