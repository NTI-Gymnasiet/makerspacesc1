const apiKey = "";  // IMPORTANT: Replace this with your own google developer key, generated at https://developers.google.com/youtube/v3/getting-started
                    // You will have to activate the youtube API with your key.

let subscribers = {};

let c = 0;
$(document).ready(function() {
    console.log("ready!")
    var intervalID = window.setInterval(function () {
        updateSubscribers("UC-lHJZR3Gqxm24_Vd_AJ5Yw");
        updateSubscribers("UCq-Fj5jknLsUf-MWSy4_brA");

        
        $("#pewdiepie-subscribers").html(generateNumbers("UC-lHJZR3Gqxm24_Vd_AJ5Yw", subscribers["UC-lHJZR3Gqxm24_Vd_AJ5Yw"]));
        $("#tseries-subscribers").html(generateNumbers("UCq-Fj5jknLsUf-MWSy4_brA", subscribers["UCq-Fj5jknLsUf-MWSy4_brA"]));

        $(".sub-counters").css("right", "10px");
        if(c === 2) {
            $(".sub-icon").css("filter", "opacity(1)");
        }

        c++;
    }, 500);
});

function updateSubscribers(channelId) {
    $.get("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + channelId + "&key=" + apiKey, function ( data ) {
        let json = data;
        subscribers[channelId] = json["items"][0]["statistics"]["subscriberCount"];
    });
}

lastSubscribers = {"": ""};
function generateNumbers(id, subscribers) {
    
    if(lastSubscribers[id] == null) {
        lastSubscribers[id] = subscribers;
    }
    let numberHtml = "";
    let firstChanged = subscribers.length;
    for(let i = 0; i < subscribers.length; i++) {
        let char = subscribers.charAt(i);

        if(char !== lastSubscribers[id].toString().charAt(i)) {
            if(i < firstChanged) {
                firstChanged = i;
            }
        }
    }

    for(let i = 0; i < subscribers.length; i++) {
        let char = subscribers.charAt(i);

        if(i >= firstChanged) {
            if(subscribers > lastSubscribers[id]) {
                numberHtml += '<div class="sub-number sub-increase"><span>' + lastSubscribers[id].toString().charAt(i) + '</span><div class="sub-increase-new"><span>' + char + '</span></div></div>'
            }
            else {
                numberHtml += '<div class="sub-number sub-decrease"><span>' + lastSubscribers[id].toString().charAt(i) + '</span><div class="sub-decrease-new"><span>' + char + '</span></div></div>'
            }
        }
        else {
            numberHtml += '<div class="sub-number"><span>' + char + '</span></div>'
        }
    }

    lastSubscribers[id] = subscribers;
    return numberHtml;
}