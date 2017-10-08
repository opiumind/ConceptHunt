$( document ).ready(function() {
  $('._search-input').blur(function() {
    var description = $('._search-input').val();
    console.log(22,description);
    search($.trim(description));
  }).keypress(function (e) {
    var key = e.which;
    if(key == 13)
    {
      this.blur();
      return false;
    }
  });

  $(._search-btn).click(function() {
    $('._search-input').blur();
  })
});

function search(description) {
  androidSearch(description);
  iosSearch(description);
}

function androidSearch(description) {
  var searchWords = description.split(/[^a-zA-Z0-9]+/);
  console.log("words ", searchWords);
  var searchPhrase = '';
  for(let i = 0; i < searchWords.length; i++) {
    searchPhrase += searchWords[i];
    if (i != searchWords.length-1) {
      searchPhrase += '+';
    }
  }
  console.log("phra: ", searchPhrase);
  $.ajax( "https://www.googleapis.com/customsearch/v1?key=AIzaSyCbrYKy4s2UmPuhmIsDOq2soKFNpuNhW1Y&cx=017543033878870048217:rmyrrsiadtw&q=" + description )
    .done(function(response) {
      console.log(333, response.items);
      makeList(response.items, "_android-result");
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      console.log( "android search is complete" );
    });
}

function iosSearch(description) {
  $.ajax( "https://www.googleapis.com/customsearch/v1?key=AIzaSyCbrYKy4s2UmPuhmIsDOq2soKFNpuNhW1Y&cx=017543033878870048217:odnl6t9lnmy&q=" + description )
    .done(function(response) {
      makeList(response.items, "_ios-result");
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      console.log( "ios search is complete" );
    });
}

function makeList(dataArray, elementClass) {
  console.log(dataArray);
  var resultString = '';
  for (var i = 0; i < dataArray.length; i++) {
    var item = dataArray[i];
    // in production code, item.htmlTitle should have the HTML entities escaped.
    resultString += '<li class="column-text-item">' +
      '<a class="column-text-item-link" href="' + item.link + '">' + item.title + '</a>' +
      '<p class="column-text-item-description">'+ item.snippet + '</p>' +
      '</li>';
    $('.' + elementClass).html(resultString);
  }
}
