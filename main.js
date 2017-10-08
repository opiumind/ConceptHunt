$( document ).ready(function() {
  var isIdeaUnique = true;

  $('._search-input').blur(function() {
    var description = $('._search-input').val();
    $('._result').hide();
    $('._congratulation').hide();
    isIdeaUnique = true;
    if ($.trim(description) == "clothes truck" || $.trim(description) == "orange eating simulator" ) {
      $('._result').hide();
      $('._congratulation').show();
    } else {
      $('._result').show();
      search($.trim(description));
    }

    // if (!isIdeaUnique) {
    //   $('._result').css('opacity', '1');
    // } else {
    //   $('._congratulation').css('opacity', '1');
    // }
  }).keypress(function (e) {
    var key = e.which;
    if(key == 13)
    {
      this.blur();
      return false;
    }
  });

  $('._search-btn').click(function() {
    $('._search-input').blur();
  });


});

function search(description) {
  androidSearch(description);
  iosSearch(description);
  websiteSearch(description);
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
  $.ajax( "https://www.googleapis.com/customsearch/v1?key=AIzaSyD136rH1k0I3-iIZ_zzXC59IlYpRHppnng&cx=017543033878870048217:odnl6t9lnmy&q=" + description )

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
  $.ajax( "https://www.googleapis.com/customsearch/v1?key=AIzaSyD136rH1k0I3-iIZ_zzXC59IlYpRHppnng&cx=017543033878870048217:rmyrrsiadtw&q=" + description )
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
  if (!dataArray || dataArray.length == 0) {
    return false;
  }
  isIdeaUnique = false;
  var resultString = '';
  for (var i = 0; i < dataArray.length; i++) {
    var item = dataArray[i];
    resultString += '<li class="column-text-item">' +
      '<a class="column-text-item-link" href="' + item.link + '">' + item.title + '</a>' +
      '<p class="column-text-item-description">'+ item.snippet + '</p>' +
      '</li>';
    $('.' + elementClass).html(resultString);
  }
}
function websiteSearch(input) {
    var searches = [input + "+web+app+-site%3Aplay.google.com", input + "+website+-site%3Aplay.google.com", input + "+service+ -site%3Aplay.google.com"];
    var finalResult = [];
    var isRequestsCompleted = false;
    var counter = 0;
    for (var i = 0; i < searches.length; i++) {
        $.ajax("https://www.googleapis.com/customsearch/v1?key=AIzaSyD136rH1k0I3-iIZ_zzXC59IlYpRHppnng&cx=017543033878870048217:1nl7ozrx5ra&q=" + searches[i])
            .done(function(response) {
                console.log(333, response.items);
                finalResult.push(response.items);
                console.log(444, finalResult);
                if (counter == 2) {
                    analyzeWebResults(finalResult);
                    console.log(555,5);
                }
                counter++;
            })
            .fail(function() {
                console.log( "error" );
            })
            .always(function() {
                console.log( "website search is complete" );
            });
    }
}

function analyzeWebResults (results) {
    console.log("one",results);
    var myDataArray = [];
    for (var i = 0; i < 3; i++) {
        for (var k = 0; k < 4; k++) {
            var item = results[i][k];
            myDataArray.push(item);
        }
    }
    console.log("easypeasy", myDataArray);
    makeList(myDataArray, '_web-result');
}
