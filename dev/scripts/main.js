// Create functions object for generator.

let slideIndex = 0;

const streamGenerator = {};

const $iframe = $(`iframe`);

const $window = $(window);

const $dropDownStream = $(`select.stream-type`);

// Create Stream Layout variables

const streamLayout = {};

streamLayout.getWebcamSize = () => {
  let width = $(`.webcam-estate`).width();
  let height = width / 16 * 9;
  console.log(width)

  streamLayout.setWebcamSize(height);
}

streamLayout.setWebcamSize = (height) => {
  $(`.webcam-estate`).css(`height`, height);
}

streamLayout.getHDCaptureSize = () => {
  let width = $(`.game-capture-estate-hd`).width();
  let height = width / 16 * 9;

  streamLayout.setHDCaptureSize(height);
}

streamLayout.getFollower = () => {
  setInterval(function() {
    $.ajax({
      url: `variables/most_recent_follower.txt`,
      method: `GET`
    }).then(function(res) {
      streamLayout.setFollow(res);
    });
  }, 10000);
}

streamLayout.setFollow = (follow) => {
  $(`.last-follow span`).html(follow);
}

streamLayout.getSub = () => {
  setInterval(function() {
    $.ajax({
      url: `variables/most_recent_subscriber.txt`,
      method: `GET`
    }).then(function(res) {
      streamLayout.setSub(res);
    });
  }, 10000);
}

streamLayout.showSlides = () => {
  let slides = $(`.title-slides`);
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = `none`;
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1
  }
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 5000);
}

streamLayout.setSub = (sub) => {
  $(`.last-sub span`).html(sub);
}

streamLayout.getLastDonor = () => {
  setInterval(function() {
    $.ajax({
      url: `variables/most_recent_donator.txt`,
      method: `GET`
    }).then(function(res) {
      streamLayout.setLastDonor(res);
    });
  }, 10000);
}

streamLayout.setLastDonor = (donor) => {
  $(`.last-donor span`).html(donor);
}

streamLayout.getBiggestDonor = () => {
  setInterval(function() {
    $.ajax({
      url: `variables/all_time_top_donator.txt`,
      method: `GET`
    }).then(function(res) {
      streamLayout.setBiggestDonor(res);
    });
  }, 10000);
}

streamLayout.setBiggestDonor = (donor) => {
  $(`.top-donor span`).html(donor);
}

streamLayout.setHDCaptureSize = (height) => {
  $(`.game-capture-estate-hd`).css(`height`, height);
}

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
  $iframe.prop(`src`, `${fileName}.html`);
}

// Change iframe size on document load

$(function() {
  streamGenerator.getIframeYSize();
  streamLayout.getHDCaptureSize();
  streamLayout.getFollower();
  streamLayout.getSub();
  streamLayout.getLastDonor();
  streamLayout.getBiggestDonor();
  streamLayout.getWebcamSize();
  setInterval(streamLayout.showSlides, 5000);
});

$window.resize(function() {
  streamGenerator.getIframeYSize();
});

// Change the iframe when the drop down changes

$dropDownStream.change(function() {
  streamGenerator.getIframeFilename();
});
