// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require intro
//= require_tree .


$('#intro-btn').bind('click', function() {
  $('#playerBox').css('position', 'absolute');
  intro = introJs()
  intro.oncomplete(function() {
    $('#playerBox').css('position', 'fixed');
  });

  intro.onexit(function() {
    $('#playerBox').css('position', 'fixed');
  });
  intro.start();
});


$('.topics h4:eq(0)').attr('data-step','0');
$('.topics h4:eq(0)').attr('data-intro','Click a topic.');

$('.a-time').attr('data-step','1');
$('.a-time').attr('data-intro','Play the audio <br />and setting <br />A-time.');

$('.b-time').attr('data-step','2');
$('.b-time').attr('data-intro','Set B-time.');

$('.store').attr('data-step','3');
$('.store').attr('data-intro','Store the interval.');

$('.clear').attr('data-step','4');
$('.clear').attr('data-intro','Click Clear to Exit repeat mode.');
