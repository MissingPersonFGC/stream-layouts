"use strict";

// Create functions object for generator.

var slideIndex = 0;

var streamGenerator = {};

var $iframe = $("iframe");

var $window = $(window);

var $dropDownStream = $("select.stream-type");

// Create Stream Layout variables

var streamLayout = {};

streamLayout.getWebcamSize = function () {
  var width = $(".webcam-estate").width();
  var height = width / 16 * 9;
  console.log(width);

  streamLayout.setWebcamSize(height);
};

streamLayout.setWebcamSize = function (height) {
  $(".webcam-estate").css("height", height);
};

streamLayout.getHDCaptureSize = function () {
  var width = $(".game-capture-estate-hd").width();
  var height = width / 16 * 9;

  streamLayout.setHDCaptureSize(height);
};

streamLayout.getFollower = function () {
  setInterval(function () {
    $.ajax({
      url: "variables/most_recent_follower.txt",
      method: "GET"
    }).then(function (res) {
      streamLayout.setFollow(res);
    });
  }, 10000);
};

streamLayout.setFollow = function (follow) {
  $(".last-follow span").html(follow);
};

streamLayout.getSub = function () {
  setInterval(function () {
    $.ajax({
      url: "variables/most_recent_subscriber.txt",
      method: "GET"
    }).then(function (res) {
      streamLayout.setSub(res);
    });
  }, 10000);
};

streamLayout.showSlides = function () {
  var slides = $(".title-slides");
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 5000);
};

streamLayout.setSub = function (sub) {
  $(".last-sub span").html(sub);
};

streamLayout.getLastDonor = function () {
  setInterval(function () {
    $.ajax({
      url: "variables/most_recent_donator.txt",
      method: "GET"
    }).then(function (res) {
      streamLayout.setLastDonor(res);
    });
  }, 10000);
};

streamLayout.setLastDonor = function (donor) {
  $(".last-donor span").html(donor);
};

streamLayout.getBiggestDonor = function () {
  setInterval(function () {
    $.ajax({
      url: "variables/all_time_top_donator.txt",
      method: "GET"
    }).then(function (res) {
      streamLayout.setBiggestDonor(res);
    });
  }, 10000);
};

streamLayout.setBiggestDonor = function (donor) {
  $(".top-donor span").html(donor);
};

streamLayout.setHDCaptureSize = function (height) {
  $(".game-capture-estate-hd").css("height", height);
};

streamGenerator.getIframeYSize = function () {
  var width = $iframe.width();

  var height = width / 16 * 9;

  streamGenerator.setIframeYSize(height);
};

streamGenerator.setIframeYSize = function (height) {
  $iframe.css("height", height);
};

streamGenerator.getIframeFilename = function () {
  var fileName = $dropDownStream.val();

  streamGenerator.setIframeFilename(fileName);
};

streamGenerator.setIframeFilename = function (fileName) {
  $iframe.prop("src", fileName + ".html");
};

// Change iframe size on document load

$(function () {
  streamGenerator.getIframeYSize();
  streamLayout.getHDCaptureSize();
  streamLayout.getFollower();
  streamLayout.getSub();
  streamLayout.getLastDonor();
  streamLayout.getBiggestDonor();
  streamLayout.getWebcamSize();
  setInterval(streamLayout.showSlides, 5000);
});

$window.resize(function () {
  streamGenerator.getIframeYSize();
});

// Change the iframe when the drop down changes

$dropDownStream.change(function () {
  streamGenerator.getIframeFilename();
});