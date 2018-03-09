// Create functions object for generator.

const streamGenerator = {};

const $iframe = $(`iframe`);

const $window = $(window);

const $dropDownStream = $(`select.stream-type`);

streamGenerator.getIframeYSize = () => {
  let width = $iframe.width();

  let height = width / 16 * 9;

  streamGenerator.setIframeYSize(height);
}

streamGenerator.setIframeYSize = (height) => {
  $iframe.css(`height`, height);
}

streamGenerator.getIframeFilename = () => {
  let fileName = $dropDownStream.val();

  streamGenerator.setIframeFilename(fileName);
}

streamGenerator.setIframeFilename = (fileName) => {
  console.log(`${fileName}.html`);
  $iframe.prop(`src`, `${fileName}.html`);
}

// Change iframe size on document load

$(document).ready(function() {
  streamGenerator.getIframeYSize();
});

$window.resize(function() {
  streamGenerator.getIframeYSize();
});

// Change the iframe when the drop down changes

$dropDownStream.change(function() {
  streamGenerator.getIframeFilename();
});
