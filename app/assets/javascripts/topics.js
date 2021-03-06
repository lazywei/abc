var aTime = 0;
var bTime = 0;
var storeList = new Array();

function showDetail(event) {
    var detail = $(event.target).parent().next();
    $('div.topic-detail').slideUp(500);
    if (detail.is(':hidden')) {
        detail.slideDown(500, function () {
            $('body').animate({
                scrollTop: ($(event.target).parents('li:eq(0)').position()['top']-50)
            }, 500);
        });
    }
}

function setAudioSrc(url) {
    $("#audioPlayer").attr('src', url);
}

function clearRepeat() {
    aTime = 0;
    bTime = 0;
    $("span.a-time").html("Set A");
    $("span.b-time").html("Set B");
}

function preA() {
    if (aTime < 1) {return};
    aTime -= 0.5; 
    $("span.a-time").html(parseInt(aTime).toFixed(1));
}

function preB() {
    if (bTime < 1 || bTime - 0.5 <= aTime) {return};
    bTime -= 0.5; 
    $("span.b-time").html(parseInt(bTime).toFixed(1));
}

function nextA() {
    aTime += 0.5; 
    $("span.a-time").html(parseInt(aTime).toFixed(1));
}

function nextB() {
    if (bTime <= aTime) {bTime = aTime};
    bTime += 0.5; 
    $("span.b-time").html(parseInt(bTime).toFixed(1));
}


function store() {
    var arr = new Array();
    storeList.push([parseInt(aTime).toFixed(1), parseInt(bTime).toFixed(1)]);
    renderStoreList();
}

function playStoreList(i) {
    aTime = storeList[i][0];
    bTime = storeList[i][1];
    $("span.a-time").html(parseInt(aTime).toFixed(1));
    $("span.b-time").html(parseInt(bTime).toFixed(1));
    repeatAb();
}

function renderStoreList() {
    var arr = [];
    for (var i = 0; i < storeList.length; i++) {
        var aTime = storeList[i][0];
        var bTime = storeList[i][1];
        arr.push("<li><a href='#' class='store-item' data-index='" + i + "'>" + aTime + " - " + bTime + "</a></li>");
    }
    $("#store-list").html(arr.join(""));
}

function setA() {
    aTime = parseInt(myAudio.currentTime);
    $("span.a-time").html(parseInt(aTime).toFixed(1));
    if(myAudio.paused) {myAudio.play()};
}

function setB() {
    bTime = parseInt(myAudio.currentTime);
    $("span.b-time").html(parseInt(bTime).toFixed(1));
    repeatAb();
}

function repeatAb() {
    myAudio.pause();
    myAudio.currentTime = aTime;
    myAudio.play();
}

function checkRepeat() {
    if (bTime > 1 && myAudio.currentTime > bTime) {
        repeatAb();
    }
}

var myAudio = $("#audioPlayer").get(0);

myAudio.addEventListener('canplay', function() {
    $("#repeatControl *").prop("disabled", false);
    $("#repeatControl *").removeClass("disabled");
});

myAudio.addEventListener('timeupdate', function() {
    checkRepeat();
}, false);


$('a.topic-title').bind('click', function (event){
    showDetail(event);
    setAudioSrc($(event.target).parent().next('div').data('audio'));
    $("#store-list").html("");
    clearRepeat()
    storeList = [];
    event.preventDefault();
});

$('#repeatControl .a-time').bind('click', function (event) {
    if ($(event.target).is(':disabled')) {return};
    setA();
});

$('#repeatControl .b-time').bind('click', function (event) {
    if ($(event.target).is(':disabled')) {return};
    setB();
});

$('#repeatControl .store').bind('click', function (event) {
    if ($(event.target).is(':disabled') || bTime < 1) {return};
    store();
    aTime = bTime;
    $("span.a-time").html(parseInt(bTime).toFixed(1));
    $("span.b-time").html("Set B");
    bTime = 0;
});

$('#repeatControl .clear').bind('click', function (event) {
    if ($(event.target).is(':disabled')) {return};
    clearRepeat();
});

$('#store-list').on('click', '.store-item', function (event) {
    playStoreList($(event.target).data('index'));
    event.preventDefault();
});

$('.a-pre').bind('click', function (event) {
    if ($(event.target).is(':disabled')) {return};
    preA();
});

$('.b-pre').bind('click', function (event) {
    if ($(event.target).is(':disabled')) {return};
    preB();
});

$('.a-next').bind('click', function (event) {
    if ($(event.target).is(':disabled')) {return};
    nextA();
});

$('.b-next').bind('click', function (event) {
    if ($(event.target).is(':disabled')) {return};
    nextB();
});

$("#repeatControl *").prop("disabled", true);
$("#repeatControl *").addClass("disabled");
