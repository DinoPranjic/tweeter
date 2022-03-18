$(document).ready(function() {
  console.log('READY');
  $("#tweet-text").on('keyup', function() {
    let remaining = 140;
    const currentCount = $(this).val().length;
    // tracks character count
    remaining = remaining - currentCount;

    // find counter
    const counter = $(this).siblings(".formButtonContainer").children("output")[0];

    // update counter in real time
    counter.innerText = remaining.toString();

    // change class to allow for red colour
    if (remaining < 0) {
      $(counter).addClass("negativeCounter");
    } else if (remaining > 0) {
      $(counter).removeClass("negativeCounter");
    }

  })
});