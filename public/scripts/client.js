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
  const $name = $('<header><span>').text(data.user.name);
  const $handle = $('<span>').text(data.user.handle);
  const $content = $('<p>').text(data.content.text);
  const $time = $('<footer><div>').text(`${timeago.format(data["created_at"])}`);
  const $icons = $('<div>').append('<i class="fa-solid fa-flag"></i>', '<i class="fa-solid fa-retweet"></i>', '<i class="fa-solid fa-heart"></i>');

  // Puts $handle in same header as $name
  $name.append($handle);
  //Puts $icons in same footer as $time
  $time.append($icons);

  const $tweet = $('<article class="tweet">');

  $tweet.append($name, $content, $time);

  return $tweet;

}

const renderTweets = (data) => {
  const $tweetComponent = $('#tweets-container');
  console.log('tweet:', $tweetComponent);
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
        console.log("tweets:", tweets);
        renderTweets(tweets);

      },
      error: (err) => {
        console.log("error:", err);
      }
    });
  };

  loadTweets();

  $("#submitTweet").submit(function(e){
    e.preventDefault();

    // slice gets rid of "text="
    const serializedTweet = $(e.target).serialize();

    if (serializedTweet.slice(5) === "") {
      return window.alert("Can't post an empty tweet!");
    }

    if (serializedTweet.slice(5).length > 140) {
      return window.alert("Your tweet is too long!")
    }

    $.post('/tweets', serializedTweet, response => {
    })
  });
  renderTweets(tweetData);
});

