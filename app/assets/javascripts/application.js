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


$('ul.topics').attr('data-step','0');
$('ul.topics').attr('data-intro','This is a Site for listen 60 sec science with AB-Repeator.<br />這是一個可以使用 AB-Repeat （反覆聽同一句）聽取 60 秒科學的網站！');

$('.topics h4:eq(0)').attr('data-step','1');
$('.topics h4:eq(0)').attr('data-intro','Click a topic.<br />點選一個主題');

$('.a-time').attr('data-step','2');
$('.a-time').attr('data-intro','Play the audio <br />and setting <br />A-time.<br /><br />點 Set A 開始播放並且設定 A 點時間');

$('.b-time').attr('data-step','3');
$('.b-time').attr('data-intro','Wait and set B-time.<br /><br />接著設定 B 點時間');

$('.store').attr('data-step','4');
$('.store').attr('data-intro','Store the interval.<br /><br />儲存當下設定好的反覆區間');

$('.clear').attr('data-step','5');
$('.clear').attr('data-intro','Click Clear to Exit repeat mode.<br /><br />離開重播模式');

$('#date-filter').attr('data-step','6');
$('#date-filter').attr('data-intro','Click year or month to specify date filter.<br /><br />選擇檢視某年或某月的主題');
