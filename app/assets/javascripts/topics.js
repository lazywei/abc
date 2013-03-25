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

/*
function preA() {
if (aTime < 1) {return};
aTime -= 1; 
$("#btnAtime").html("A[" + aTime + "]");
}

function preB() {
if (bTime < 1) {return};
bTime -= 1; 
$("#btnBtime").html("B[" + bTime + "]");
}

function nextA() {
aTime += 1; 
$("#btnAtime").html("B[" + aTime + "]");
}

function nextB() {
if (bTime < 1) {return};
bTime += 1; 
$("#btnBtime").html("B[" + bTime + "]");
}
*/


function store() {
  var arr = new Array();
  storeList.push([aTime, bTime]);
  renderStoreList();
}

function playStoreList(i) {
  var aTime = storeList[i][0];
  var bTime = storeList[i][1];
  $("span.a-time").html(aTime);
  $("sapn.b-time").html(bTime);
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
  $("span.a-time").html(aTime);
  if(myAudio.paused) {myAudio.play()};
}

function setB() {
  bTime = parseInt(myAudio.currentTime);
  $("span.b-time").html(bTime);
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
  $("span.a-time").html(bTime);
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

$("#repeatControl *").prop("disabled", true);
$("#repeatControl *").addClass("disabled");
