/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const createTweetElement = (data) => {
  const $header = $('<header>');
  const $name = $('<span>').text(data.user.name);
  const $handle = $('<span>').text(data.user.handle);
  const $avatar = $(`<img src=${data.user.avatars}></img>`);
  const $content = $('<p>').text(data.content.text);
  const $time = $('<footer><div>').text(`${timeago.format(data["created_at"])}`);
  const $icons = $('<div>').append('<i class="fa-solid fa-flag"></i>', '<i class="fa-solid fa-retweet"></i>', '<i class="fa-solid fa-heart"></i>');

  //puts avatar, handle and name into same footer
  $name.prepend($avatar);
  $header.append($name, $handle);

  //Puts $icons in same footer as $time
  $time.append($icons);

  // create "tweet" article
  const $tweet = $('<article class="tweet">');

  $tweet.append($header, $content, $time);

  return $tweet;

}

const renderTweets = (data) => {
  const $tweetComponent = $('#tweets-container');
  $tweetComponent.empty();

  for(const user of data) {
    const $tweet = createTweetElement(user);
    $tweetComponent.prepend($tweet);
  }
}




$(document).ready(function() {
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        renderTweets(tweets);

      },
      error: (err) => {
        console.log("error:", err);
      }
    });
  };

  loadTweets();

  $("#submitTweet").submit(function(e){
    // prevents page from refreshing
    e.preventDefault();

    const serializedTweet = $(e.target).serialize();

    //slice gets rid of "text="
    if (serializedTweet.slice(5) === "") {
      const errMsg = "Can't post an empty tweet!"
      return $(".error").text(errMsg).show().delay(2000).fadeOut();
    }

    if (serializedTweet.slice(5).length > 140) {
      const errMsg = "Your tweet is too long!"
      return $(".error").text(errMsg).show().delay(2000).fadeOut();
    }

    $.post('/tweets', serializedTweet, response => {
      //clears form after post is succesful
      $("#submitTweet").trigger("reset");
      //resets counter to 140 after form is cleared
      $(".counter").text('140');
      //loads tweets without refreshing
      loadTweets();
    })
  });
  renderTweets(tweetData);
});

