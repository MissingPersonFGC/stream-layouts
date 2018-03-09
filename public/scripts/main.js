"use strict";

// Create functions object for generator.

var streamGenerator = {};

var $iframe = $("iframe");

var $window = $(window);

var $dropDownStream = $("select.stream-type");

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
  console.log(fileName + ".html");
  $iframe.prop("src", fileName + ".html");
};

// Change iframe size on document load

$(document).ready(function () {
  streamGenerator.getIframeYSize();
});

$window.resize(function () {
  streamGenerator.getIframeYSize();
});

// Change the iframe when the drop down changes

$dropDownStream.change(function () {
  streamGenerator.getIframeFilename();
});