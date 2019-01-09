const apiKey = "";  // IMPORTANT: Replace this with your own google developer key, generated at https://developers.google.com/youtube/v3/getting-started
                    // You will have to activate the youtube API with your key.

let subscribers = {};
let lastIncrease = {};
let lastSubscribers = {};

PEWDIEPIE_ID = "UC-lHJZR3Gqxm24_Vd_AJ5Yw";
TSERIES_ID = "UCq-Fj5jknLsUf-MWSy4_brA";

let c = 0;
let p = 1;
let repeats = 10;
$(document).ready(function() {
    var intervalID = window.setInterval(function () {
        if(c == 0 || c % repeats === 0) {
            updateSubscribers(PEWDIEPIE_ID);
            updateSubscribers(TSERIES_ID);

            lastIncrease[PEWDIEPIE_ID] = parseInt(subscribers[PEWDIEPIE_ID], 10) - parseInt(lastSubscribers[PEWDIEPIE_ID], 10);
            console.log(lastIncrease[PEWDIEPIE_ID]);
            console.log(lastSubscribers[PEWDIEPIE_ID]);
            lastIncrease[TSERIES_ID] = parseInt(subscribers[TSERIES_ID], 10) - parseInt(lastSubscribers[TSERIES_ID], 10);

            $("#pewdiepie-subscribers").html(generateNumbers(PEWDIEPIE_ID, subscribers[PEWDIEPIE_ID]));
            $("#tseries-subscribers").html(generateNumbers(TSERIES_ID, subscribers[TSERIES_ID]));

            lastSubscribers[PEWDIEPIE_ID] = subscribers[PEWDIEPIE_ID];
            lastSubscribers[TSERIES_ID] = subscribers[TSERIES_ID];

            p = 1;
        }
        else {
            $("#pewdiepie-subscribers").html(generateNumbers(PEWDIEPIE_ID, Math.ceil(parseInt(subscribers[PEWDIEPIE_ID], 10) + (lastIncrease[PEWDIEPIE_ID]/repeats) * p).toString()));
            $("#tseries-subscribers").html(generateNumbers(TSERIES_ID, Math.ceil(parseInt(subscribers[TSERIES_ID], 10) + (lastIncrease[TSERIES_ID]/repeats) * p).toString()));
        }
        if(c === repeats + 1) {
            $(".sub-counters").css("right", "10px");
        }
        if(c === repeats + 3) {
            $(".sub-icon").css("filter", "opacity(1)");
        }

        c++;
        p++;
    }, 500);
});

function updateSubscribers(channelId) {
    $.get("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + channelId + "&key=" + apiKey, function ( data ) {
        subscribers[channelId] = data["items"][0]["statistics"]["subscriberCount"];
    });
}

let lastSubs = {};
function generateNumbers(id, subs) {
    
    if(lastSubs[id] == null) {
        lastSubs[id] = subs;
    }
    let numberHtml = "";
    let firstChanged = subs.length;
    for(let i = 0; i < subs.length; i++) {
        let char = subs.charAt(i);

        if(char !== lastSubs[id].toString().charAt(i)) {
            if(i < firstChanged) {
                firstChanged = i;
            }
        }
    }

    for(let i = 0; i < subs.length; i++) {
        let char = subs.charAt(i);

        if(i >= firstChanged) {
            if(subs > lastSubs[id]) {
                numberHtml += '<div class="sub-number sub-increase"><span>' + lastSubs[id].toString().charAt(i) + '</span><div class="sub-increase-new"><span>' + char + '</span></div></div>'
            }
            else {
                numberHtml += '<div class="sub-number sub-decrease"><span>' + lastSubs[id].toString().charAt(i) + '</span><div class="sub-decrease-new"><span>' + char + '</span></div></div>'
            }
        }
        else {
            numberHtml += '<div class="sub-number"><span>' + char + '</span></div>'
        }
    }
    lastSubs[id] = subs;
    return numberHtml;
}