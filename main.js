function search() {
  androidSearch();
  iosSearch();
}

function androidSearch() {
  $.ajax( " https://www.googleapis.com/customsearch/v1?key=AIzaSyCbrYKy4s2UmPuhmIsDOq2soKFNpuNhW1Y&cx=017543033878870048217:odnl6t9lnmy&q=free+parking" )
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
// function androidHndlr(response) {
//   for (var i = 0; i < response.items.length; i++) {
//     var item = response.items[i];
//     // in production code, item.htmlTitle should have the HTML entities escaped.
//     document.getElementById("content").innerHTML += "<br>" + item.htmlTitle;
//   }
// }

function iosSearch() {
  $.ajax( "https://www.googleapis.com/customsearch/v1?key=AIzaSyCbrYKy4s2UmPuhmIsDOq2soKFNpuNhW1Y&cx=017543033878870048217:rmyrrsiadtw&q=free+parking" )
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

// function iosHndlr(response) {
//   for (var i = 0; i < response.items.length; i++) {
//     var item = response.items[i];
//     // in production code, item.htmlTitle should have the HTML entities escaped.
//     console.log("!",response);
//     document.getElementById("content2").innerHTML += "<br>" + item.htmlTitle;
//   }
// }

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

search();